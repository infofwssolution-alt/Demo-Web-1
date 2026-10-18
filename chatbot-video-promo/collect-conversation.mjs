// Runs a full scripted conversation against the live bot (single session for context memory)
// and saves the real streamed answers + detected action tags to src/conversation.json
import fs from 'fs';

const API = 'http://localhost:3000/chat';
const sessionId = 'promo-' + Date.now();

const questions = [
  { key: 'greeting', q: 'Hi there, good afternoon!' },
  { key: 'general', q: 'What does Kelvyn actually do?' },
  { key: 'specs', q: 'What is the temperature range and battery life of the Probe sensor?' },
  { key: 'compliance', q: 'Is the system FDA 21 CFR Part 11 compliant?' },
  { key: 'memory', q: 'Does that also apply to the Reefer model?' },
  { key: 'pricing', q: 'Roughly how much would it cost for about 50 sensors?' },
  { key: 'navigate', q: 'Can you take me to the hardware specs page?' },
  { key: 'booking', q: 'I would like to book a consultation with your engineering team.' },
  { key: 'order', q: 'I want to place an order for a 10-sensor pilot kit.' },
  { key: 'contact', q: 'What is your phone number and email?' },
  { key: 'offtopic', q: 'Can you recommend a good pizza place nearby?' },
  { key: 'thanks', q: 'Thanks, that was really helpful!' },
];

async function ask(message) {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: 'http://localhost:5173' },
    body: JSON.stringify({ message, session_id: sessionId }),
  });
  if (!res.ok) return { status: res.status, text: await res.text() };
  const raw = await res.text();
  let text = '';
  for (const line of raw.split('\n')) {
    const t = line.trim();
    if (!t.startsWith('data:')) continue;
    const payload = t.slice(5).trim();
    if (payload === '[DONE]') continue;
    try {
      const p = JSON.parse(payload);
      if (p.text) text += p.text;
    } catch (_) {}
  }
  const actions = [...text.matchAll(/\[\[ACTION:(.*?)\]\]/g)].map((m) => m[1]);
  const clean = text.replace(/\[\[ACTION:.*?\]\]/g, '').trim();
  return { status: res.status, text: clean, actions };
}

const out = [];
for (const item of questions) {
  process.stdout.write(`Asking [${item.key}]... `);
  const r = await ask(item.q);
  console.log(r.status, r.actions?.length ? 'ACTIONS: ' + r.actions.join(', ') : '');
  out.push({ ...item, ...r });
}
fs.writeFileSync('src/conversation.json', JSON.stringify(out, null, 2));
console.log('Saved src/conversation.json');
