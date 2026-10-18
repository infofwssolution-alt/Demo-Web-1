import puppeteer from 'puppeteer';
import path from 'path';

async function capture() {
  console.log('Launching headless browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  
  console.log('Navigating to http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  const bgPath = path.resolve('public/website-full.png');
  await page.screenshot({ path: bgPath });
  console.log('Saved real site screenshot to:', bgPath);

  // Now click the chat launcher if present
  try {
    const host = await page.$('#ai-chatbot-widget-host');
    if (host) {
      const launcher = await page.evaluateHandle(el => el.shadowRoot.querySelector('#chatLauncher'), host);
      if (launcher) {
        await launcher.click();
        await new Promise(r => setTimeout(r, 1000));
        const chatOpenPath = path.resolve('public/website-chat-open.png');
        await page.screenshot({ path: chatOpenPath });
        console.log('Saved chat open screenshot to:', chatOpenPath);
      }
    }
  } catch (err) {
    console.log('Widget click note:', err.message);
  }

  await browser.close();
}
capture();
