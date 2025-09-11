// scripts/generate-critical.js
import http from 'http';
import sirv from 'sirv';
import penthouse from 'penthouse';
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const PORT = 5050;

async function run() {
  const serve = sirv('dist', { single: true });
  const server = http.createServer((req, res) => serve(req, res));
  await new Promise(resolve => server.listen(PORT, resolve));
  console.log(`Сервер запущен на http://localhost:${PORT}`);

  const assetsDir = join('dist', 'assets');
  const cssFiles = readdirSync(assetsDir).filter(f => f.endsWith('.css'));
  if (cssFiles.length === 0) {
    throw new Error('Не найден CSS-файл в dist/assets');
  }
  const cssPath = join(assetsDir, cssFiles[0]); 
  console.log(`CSS: ${cssPath}`);

  const routes = [
    { uri: '/', file: 'index.html' },
    { uri: '/faq', file: 'index.html' },
    { uri: '/catalog', file: 'index.html' }
  ];

  for (const route of routes) {
    const criticalCss = await penthouse({
      url: `https://my-app-test.online${route.uri}`,
      css: cssPath,
      width: 375, 
      height: 667,
      timeout: 60000
    });

    const htmlPath = join('dist', route.file);
    let html = readFileSync(htmlPath, 'utf8');
    html = html.replace(
      '</head>',
      `<style id="critical-css">${criticalCss}</style>\n</head>`
    );
    writeFileSync(htmlPath, html);
    console.log(`Критический CSS в файле: ${route.file}`);
  }

  server.close();
  console.log('успешно');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
