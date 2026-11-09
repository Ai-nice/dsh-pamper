/**
 * 本地静态服务器（预览页/文档用，零依赖）：
 *   node scripts/serve.mjs [--port=8899] [--root=.]
 * 默认以项目根为站点根，打开 http://127.0.0.1:8899/preview/ 看预览页。
 */
import { createReadStream } from 'node:fs';
import { readdir, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isMain } from './lib/paths.mjs';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jsonc': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webm': 'video/webm',
  '.mp4': 'video/mp4',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

export function parseServeArgs(argv = process.argv.slice(2)) {
  const has = (name) => argv.includes(name);
  const opt = (name, fallback) => {
    const hit = argv.find((arg) => arg.startsWith(`--${name}=`));
    return hit ? hit.slice(name.length + 3) : fallback;
  };
  const port = Number(opt('port', '8899'));
  return {
    port: Number.isFinite(port) && port > 0 ? port : 8899,
    root: resolve(opt('root', fileURLToPath(new URL('..', import.meta.url))))
  };
}

async function directoryPage(dirPath, urlPath) {
  const items = await readdir(dirPath, { withFileTypes: true });
  const rows = items
    .sort((a, b) => Number(b.isDirectory()) - Number(a.isDirectory()) || a.name.localeCompare(b.name, 'zh'))
    .map((item) => {
      const name = item.name + (item.isDirectory() ? '/' : '');
      const href = encodeURI(urlPath.endsWith('/') ? urlPath + name : `${urlPath}/${name}`);
      return `<li><a href="${href}">${name}</a></li>`;
    })
    .join('\n');
  return `<!doctype html><html lang="zh-CN"><meta charset="utf-8"><title>pamper · ${urlPath}</title>
<style>body{font-family:system-ui,"Microsoft YaHei",sans-serif;max-width:780px;margin:40px auto;padding:0 20px;color:#222;background:#fafafa}
h1{font-size:18px}a{color:#0b62d6;text-decoration:none}a:hover{text-decoration:underline}ul{line-height:2;list-style:none;padding:0}
.hint{background:#fff8e6;border:1px solid #f0d894;border-radius:8px;padding:12px 14px;font-size:13px;color:#6b4f00}</style>
<h1>pamper · ${urlPath}</h1>
<div class="hint">预览页入口：<a href="/preview/">/preview/</a></div>
<ul>${rows}</ul></html>`;
}

export function createStaticServer({ root, port = 8899 } = {}) {
  const server = createServer(async (request, response) => {
    try {
      const url = new URL(request.url ?? '/', 'http://localhost');
      let urlPath = decodeURIComponent(url.pathname);
      if (urlPath.endsWith('/') === false && !extname(urlPath)) urlPath += '/';
      const safePath = normalize(urlPath).replace(/^([/\\])+/, '');
      let filePath = join(root, safePath);
      if (filePath !== root && !filePath.startsWith(root + sep)) {
        response.writeHead(403).end('403 Forbidden');
        return;
      }
      let info;
      try {
        info = await stat(filePath);
      } catch {
        response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end(`404 Not Found: ${urlPath}`);
        return;
      }
      if (info.isDirectory()) {
        if (!url.pathname.endsWith('/')) {
          response.writeHead(301, { location: `${url.pathname}/` }).end();
          return;
        }
        const indexPath = join(filePath, 'index.html');
        try {
          info = await stat(indexPath);
          filePath = indexPath;
        } catch {
          response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }).end(await directoryPage(filePath, url.pathname));
          return;
        }
      }
      response.writeHead(200, {
        'content-type': MIME[extname(filePath).toLowerCase()] ?? 'application/octet-stream',
        'content-length': info.size,
        'cache-control': 'no-cache'
      });
      createReadStream(filePath).pipe(response);
    } catch (error) {
      response.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' }).end(`500 ${error.message}`);
    }
  });
  return server;
}

if (isMain(import.meta.url)) {
  const argv = process.argv.slice(2);
  if (argv.includes('--help')) {
    console.log(`用法：node scripts/serve.mjs [--port=8899] [--root=.]

  启动本地静态服务器（零依赖），默认以项目根为站点根。
  · 预览页：http://127.0.0.1:8899/preview/
  · 构建清单：http://127.0.0.1:8899/dist/manifest.json`);
    process.exit(0);
  }
  const options = parseServeArgs();
  const server = createStaticServer({ root: options.root, port: options.port });
  server.listen(options.port, '127.0.0.1', () => {
    console.log(`pamper 静态服务器已启动：`);
    console.log(`  预览页   http://127.0.0.1:${options.port}/preview/`);
    console.log(`  项目根   http://127.0.0.1:${options.port}/`);
    console.log(`  站点目录 ${options.root}`);
    console.log('按 Ctrl+C 退出');
  });
  server.on('error', (error) => {
    console.error(`启动失败：${error.message}`);
    process.exitCode = 1;
  });
}
