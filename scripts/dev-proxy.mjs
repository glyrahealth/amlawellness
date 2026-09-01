#!/usr/bin/env node
// HTTPS dev proxy: https://local.amlawellness.com -> http://127.0.0.1:4000
//
// Exists so Intercom (and anything else that validates the page origin) sees a
// real https origin on our domain instead of http://localhost:4000.
//
// Setup, once:
//   brew install mkcert && mkcert -install
//   mkcert local.amlawellness.com
//   sudo sh -c 'echo "127.0.0.1 local.amlawellness.com" >> /etc/hosts'
// Run (443 needs sudo; or set PORT=8443 and visit that port):
//   sudo node dev-proxy.mjs
//
// Jekyll still runs separately: jekyll serve --livereload

import { createServer } from 'node:https';
import { request } from 'node:http';
import { readFileSync } from 'node:fs';

const HOST = process.env.HOST || 'local.amlawellness.com';
const PORT = Number(process.env.PORT || 443);
const TARGET = { host: '127.0.0.1', port: Number(process.env.TARGET_PORT || 4000) };

const key = readFileSync(process.env.KEY || new URL(`./certs/${HOST}-key.pem`, import.meta.url));
const cert = readFileSync(process.env.CERT || new URL(`./certs/${HOST}.pem`, import.meta.url));

const server = createServer({ key, cert }, (req, res) => {
  const upstream = request(
    { ...TARGET, method: req.method, path: req.url, headers: { ...req.headers, host: `${TARGET.host}:${TARGET.port}` } },
    (up) => {
      res.writeHead(up.statusCode, up.headers);
      up.pipe(res);
    }
  );
  upstream.on('error', (err) => {
    res.writeHead(502, { 'content-type': 'text/plain' });
    res.end(`dev-proxy: upstream unreachable (${err.code}). Is jekyll serve running on ${TARGET.port}?\n`);
  });
  req.pipe(upstream);
});

// Jekyll --livereload upgrades to a websocket; pass those through untouched.
server.on('upgrade', (req, socket, head) => {
  const upstream = request({ ...TARGET, method: req.method, path: req.url, headers: req.headers });
  upstream.on('upgrade', (upRes, upSocket, upHead) => {
    socket.write(
      `HTTP/1.1 101 Switching Protocols\r\n` +
        Object.entries(upRes.headers).map(([k, v]) => `${k}: ${v}\r\n`).join('') +
        `\r\n`
    );
    if (upHead?.length) socket.unshift(upHead);
    upSocket.pipe(socket).pipe(upSocket);
  });
  upstream.on('error', () => socket.destroy());
  if (head?.length) upstream.write(head);
  upstream.end();
});

server.listen(PORT, () => console.log(`https://${HOST}${PORT === 443 ? '' : ':' + PORT} -> http://${TARGET.host}:${TARGET.port}`));
