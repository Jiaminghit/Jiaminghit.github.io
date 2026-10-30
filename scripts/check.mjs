import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pages = new Map();
for (const file of ['index.html', 'en/index.html']) pages.set(file, await readFile(path.join(root, file), 'utf8'));
let links = 0;
for (const [file, html] of pages) {
  assert.match(html, file.startsWith('en/') ? /<html lang="en">/ : /<html lang="zh-CN">/);
  for (const metric of ['5,419', '0.286%', '0.197°', '99.86%', '75.0%', '84.5%']) assert.ok(html.includes(metric), `${file}: missing ${metric}`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(ids.length, new Set(ids).size, `${file}: duplicate IDs`);
  assert.ok(!/SCAP|yaoyao-liu|Continual Learning for Abdominal|YOLO 26/.test(html), `${file}: stale template content`);
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const href = match[1];
    if (/^(https?:|mailto:|data:)/.test(href)) continue;
    const url = new URL(href, `https://local.test/${file}`);
    let target = decodeURIComponent(url.pathname).slice(1);
    if (!target || target.endsWith('/')) target += 'index.html';
    await access(path.join(root, target));
    if (url.hash && pages.has(target)) assert.ok(pages.get(target).includes(`id="${url.hash.slice(1)}"`), `${href}: missing anchor`);
    links++;
  }
}
for (const name of ['resume-zh.pdf', 'resume-en.pdf', 'curriculum_vitae.pdf']) {
  const pdf = await readFile(path.join(root, 'assets/files', name));
  assert.equal(pdf.subarray(0, 4).toString(), '%PDF');
  assert.ok(pdf.length > 20000, `${name}: suspiciously small PDF`);
}
console.log(`PASS: both languages, metric qualifications, unique IDs, ${links} local links, three résumé PDFs.`);
