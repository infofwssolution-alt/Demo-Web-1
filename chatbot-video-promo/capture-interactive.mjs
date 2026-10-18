import puppeteer from 'puppeteer';
import path from 'path';

async function captureInteractiveScreenshots() {
  console.log('Launching Puppeteer at 1920x1080 (deviceScaleFactor: 2)...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });

  console.log('Navigating to http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  // 1. Full Landing Page (Clean state)
  const heroPath = path.resolve('public/screen-01-hero.png');
  await page.screenshot({ path: heroPath });
  console.log('Saved:', heroPath);

  // 2. Open Chatbot Widget
  console.log('Clicking chat launcher...');
  await page.evaluate(() => {
    const host = document.querySelector('#ai-chatbot-widget-host');
    const launcher = host.shadowRoot.querySelector('#chatLauncher');
    if (launcher) launcher.click();
  });
  await new Promise(r => setTimeout(r, 1200));

  const openPath = path.resolve('public/screen-02-open.png');
  await page.screenshot({ path: openPath });
  console.log('Saved:', openPath);

  // 3. Type user question
  const question1 = "Are your sensors FDA 21 CFR Part 11 compliant and NIST calibrated?";
  console.log('Typing question 1...');
  await page.evaluate((text) => {
    const host = document.querySelector('#ai-chatbot-widget-host');
    const input = host.shadowRoot.querySelector('#chatInput');
    if (input) {
      input.value = text;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }, question1);
  await new Promise(r => setTimeout(r, 800));

  const typedPath = path.resolve('public/screen-03-typed.png');
  await page.screenshot({ path: typedPath });
  console.log('Saved:', typedPath);

  // 4. Send question and wait for AI response
  console.log('Sending question 1...');
  await page.evaluate(() => {
    const host = document.querySelector('#ai-chatbot-widget-host');
    const sendBtn = host.shadowRoot.querySelector('#sendBtn');
    if (sendBtn) sendBtn.click();
  });

  // Wait for response to stream and complete (up to 8 seconds)
  console.log('Waiting for AI response...');
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 500));
    const isDone = await page.evaluate(() => {
      const host = document.querySelector('#ai-chatbot-widget-host');
      const sr = host.shadowRoot;
      const sendBtn = sr.querySelector('#sendBtn');
      const messages = sr.querySelectorAll('.message-bubble');
      return !sendBtn.disabled && messages.length >= 2;
    });
    if (isDone) {
      console.log('Response finished streaming after', (i + 1) * 0.5, 's');
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1000));

  const respondedPath = path.resolve('public/screen-04-response.png');
  await page.screenshot({ path: respondedPath });
  console.log('Saved:', respondedPath);

  // 5. Ask for 30-day pilot deployment
  const question2 = "How do I request a 30-day pilot kit with 10 sensors?";
  console.log('Typing question 2...');
  await page.evaluate((text) => {
    const host = document.querySelector('#ai-chatbot-widget-host');
    const input = host.shadowRoot.querySelector('#chatInput');
    if (input) {
      input.value = text;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }, question2);
  await new Promise(r => setTimeout(r, 800));

  console.log('Sending question 2...');
  await page.evaluate(() => {
    const host = document.querySelector('#ai-chatbot-widget-host');
    const sendBtn = host.shadowRoot.querySelector('#sendBtn');
    if (sendBtn) sendBtn.click();
  });

  console.log('Waiting for AI pilot response...');
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 500));
    const isDone = await page.evaluate(() => {
      const host = document.querySelector('#ai-chatbot-widget-host');
      const sr = host.shadowRoot;
      const sendBtn = sr.querySelector('#sendBtn');
      const messages = sr.querySelectorAll('.message-bubble');
      return !sendBtn.disabled && messages.length >= 4;
    });
    if (isDone) {
      console.log('Pilot response finished after', (i + 1) * 0.5, 's');
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1200));

  const pilotPath = path.resolve('public/screen-05-pilot.png');
  await page.screenshot({ path: pilotPath });
  console.log('Saved:', pilotPath);

  await browser.close();
  console.log('Interactive screenshot capture complete!');
}

captureInteractiveScreenshots().catch(console.error);
