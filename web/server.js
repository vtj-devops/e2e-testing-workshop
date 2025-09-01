const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 5173;
const root = __dirname;

const mime = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.jsx': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain'
};

const server = http.createServer((req, res) => {
  try {
    let reqPath = decodeURIComponent(req.url.split('?')[0]);
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
    const filePath = path.join(root, reqPath);
    if (!filePath.startsWith(root)) {
      res.statusCode = 403;
      res.end('Forbidden');
      return;
    }
    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        res.statusCode = 404;
        res.end('Not Found');
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      const ct = mime[ext] || 'application/octet-stream';
      const charset = (ct.startsWith('text/') || ct.includes('javascript')) ? '; charset=utf-8' : '';
      res.setHeader('Content-Type', ct + charset);
      const stream = fs.createReadStream(filePath);
      stream.pipe(res);
      stream.on('error', () => { res.statusCode = 500; res.end('Server Error'); });
    });
  } catch (e) {
    res.statusCode = 500;
    res.end('Server Error');
  }
});

server.listen(port, () => console.log(`Server running at http://localhost:${port}`));
