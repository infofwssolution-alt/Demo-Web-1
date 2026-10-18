// Adds extra real answers (recommendation, integration, trial) to src/conversation-extra.json
import fs from 'fs';

const sessionId = 'promo-extra-' + Date.now();
const questions = [
  { key: 'recommend', q: 'Which sensor would you recommend for -80°C vaccine freezers?' },
  { key: 'integration', q: 'Can it integrate with SAP or our existing WMS?' },
  { key: 'trial', q: 'Is there a free trial?' },
];

const out = [];
for (const item of questions) {
  const res = await fetch('http://localhost:3000/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: 'http://localhost:5173' },
    body: JSON.stringify({ message: item.q, session_id: sessionId }),
  });
  const raw = await res.text();
  let text = '';
  for (const line of raw.split('\n')) {
    const t = line.trim();
    if (!t.startsWith('data:')) continue;
    const p = t.slice(5).trim();
    if (p === '[DONE]') continue;
    try { const j = JSON.parse(p); if (j.text) text += j.text; } catch (_) {}
  }
  console.log(item.key, res.status, text.length);
  out.push({ ...item, status: res.status, text: text.replace(/\[\[ACTION:.*?\]\]/g, '').trim() });
}
fs.writeFileSync('src/conversation-extra.json', JSON.stringify(out, null, 2));
