process.on('uncaughtException', function(err) {
  console.error('uncaughtException');
  console.error(err.stack || err);

  process.exit(1);
});

const express = require('express');
const puppeteer = require('puppeteer');

/**
 * Server Side Rendering
 *
 * @param {string} url
 * @return {string}
 */
async function ssr(url) {
  // NOTE: need improve, e.g. launch before http server
  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();

  try {
    await page.goto(url, {
      waitUntil: 'networkidle0'
    });
  } catch(e) {
    console.error(e);
    throw new Error('timed out');
  }

  // NOTE: need cache
  const html = await page.content();

  await browser.close();

  return html;
}

const app = express();

app.disable('x-powered-by');

app.get('/api/data', function(req, res) {
  res.json({
    hello: 'Hello, World!',
  });
});

if (process.env.SSR) {
  app.get('/', async function(req, res) {
    const html = await ssr(`${req.protocol}://${req.get('host')}/index.html`);

    res.status(200);
    res.end(html);
  });
}

app.use(express.static('public'));

app.listen(3000, function() {
  console.log('server stating at http://127.0.0.1:3000');
});
