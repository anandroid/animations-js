import assert from 'assert';
import http from 'http';
import { createServer } from './server.js';

const server = createServer();
server.listen(0, () => {
  const { port } = server.address();
  http.get(`http://localhost:${port}/`, res => {
    assert.strictEqual(res.statusCode, 200);
    let data = '';
    res.on('data', chunk => (data += chunk));
    res.on('end', () => {
      assert(data.includes('<title>Bouncing Ball with Three.js</title>'));
      server.close(() => {
        console.log('ok');
      });
    });
  }).on('error', err => {
    console.error(err);
    server.close(() => process.exit(1));
  });
});
