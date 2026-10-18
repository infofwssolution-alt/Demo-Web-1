import puppeteer from 'puppeteer';
import path from 'path';

async function captureExtendedSuite() {
  console.log('Launching Puppeteer at 1920x1080 (deviceScaleFactor: 2)...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });

  // 1. Home Page Hero
  console.log('1. Capturing Home page...');
  await page.goto('http://localhost:5173/#/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.resolve('public/ext-01-home.png') });

  // 2. Hardware Specs Page
  console.log('2. Capturing Hardware page...');
  await page.goto('http://localhost:5173/#/hardware', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.resolve('public/ext-02-hardware.png') });

  // 3. Pricing Page
  console.log('3. Capturing Pricing page...');
  await page.goto('http://localhost:5173/#/pricing', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.resolve('public/ext-03-pricing.png') });

  // 4. Contact Page (Empty form & Office desks)
  console.log('4. Capturing Contact page (empty form)...');
  await page.goto('http://localhost:5173/#/contact', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.resolve('public/ext-04-contact-form.png') });

  // 5. Fill out the Pilot Application form
  console.log('5. Filling Contact form...');
  await page.type('input[placeholder="Dr. Evelyn Scott"]', 'Dr. Evelyn Scott');
  await page.type('input[placeholder="escott@biologics.com"]', 'e.scott@apexlogistics.com');
  await page.type('input[placeholder="Apex Logistics Inc."]', 'Apex Biologics Distribution');
  await page.type('textarea', 'Monitoring 6 cold storage depots at -20°C and 18 reefer trailers with automated FDA 21 CFR compliance.');
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.resolve('public/ext-05-contact-filled.png') });

  // 6. Submit the form
  console.log('6. Submitting Contact form...');
  await page.evaluate(() => {
    const btn = document.querySelector('button[type="submit"].gap-2') || document.querySelector('form button[type="submit"]');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.resolve('public/ext-06-contact-success.png') });

  // 7. Return to Home Page for Chatbot Interactive Showcase
  console.log('7. Returning to Home page for Chatbot sequence...');
  await page.goto('http://localhost:5173/#/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  // Open Chatbot Launcher
  console.log('Opening chat launcher...');
  await page.evaluate(() => {
    const host = document.querySelector('#ai-chatbot-widget-host');
    const launcher = host.shadowRoot.querySelector('#chatLauncher');
    if (launcher) launcher.click();
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.resolve('public/ext-07-chat-greet.png') });

  // Question 1: General & Technical Specs (Polite inquiry)
  const q1 = "Hello! Could you explain your sensor temperature range and battery life?";
  console.log('Typing & sending Q1 (specs)...');
  await page.evaluate((text) => {
    const host = document.querySelector('#ai-chatbot-widget-host');
    const input = host.shadowRoot.querySelector('#chatInput');
    input.value = text;
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }, q1);
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.resolve('public/ext-08-chat-typed-q1.png') });

  await page.evaluate(() => {
    const host = document.querySelector('#ai-chatbot-widget-host');
    const sendBtn = host.shadowRoot.querySelector('#sendBtn');
    if (sendBtn) sendBtn.click();
  });

  // Wait for reply 1
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 500));
    const isDone = await page.evaluate(() => {
      const host = document.querySelector('#ai-chatbot-widget-host');
      const sr = host.shadowRoot;
      const sendBtn = sr.querySelector('#sendBtn');
      const messages = sr.querySelectorAll('.message-bubble');
      return !sendBtn.disabled && messages.length >= 2;
    });
    if (isDone) break;
  }
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.resolve('public/ext-09-chat-specs-reply.png') });

  // Question 2: Website Navigation Guidance
  const q2 = "Where can I find commercial pricing tiers and volume discounts?";
  console.log('Typing & sending Q2 (navigation)...');
  await page.evaluate((text) => {
    const host = document.querySelector('#ai-chatbot-widget-host');
    const input = host.shadowRoot.querySelector('#chatInput');
    input.value = text;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    const sendBtn = host.shadowRoot.querySelector('#sendBtn');
    if (sendBtn) sendBtn.click();
  }, q2);

  // Wait for reply 2
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 500));
    const isDone = await page.evaluate(() => {
      const host = document.querySelector('#ai-chatbot-widget-host');
      const sr = host.shadowRoot;
      const sendBtn = sr.querySelector('#sendBtn');
      const messages = sr.querySelectorAll('.message-bubble');
      return !sendBtn.disabled && messages.length >= 4;
    });
    if (isDone) break;
  }
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.resolve('public/ext-10-chat-pricing-reply.png') });

  // Question 3: Contact Info & Support Desk
  const q3 = "What are your direct phone numbers and Zurich headquarters contact?";
  console.log('Typing & sending Q3 (contact info)...');
  await page.evaluate((text) => {
    const host = document.querySelector('#ai-chatbot-widget-host');
    const input = host.shadowRoot.querySelector('#chatInput');
    input.value = text;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    const sendBtn = host.shadowRoot.querySelector('#sendBtn');
    if (sendBtn) sendBtn.click();
  }, q3);

  // Wait for reply 3
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 500));
    const isDone = await page.evaluate(() => {
      const host = document.querySelector('#ai-chatbot-widget-host');
      const sr = host.shadowRoot;
      const sendBtn = sr.querySelector('#sendBtn');
      const messages = sr.querySelectorAll('.message-bubble');
      return !sendBtn.disabled && messages.length >= 6;
    });
    if (isDone) break;
  }
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.resolve('public/ext-11-chat-contact-reply.png') });

  await browser.close();
  console.log('All extended screenshots captured successfully!');
}

captureExtendedSuite().catch(console.error);
