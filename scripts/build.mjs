import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const resume = JSON.parse(await readFile(path.join(root, 'data/resume.json'), 'utf8'));
const escape = (value) => String(value).replace(/[&<>"']/g, (s) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]));
const arrow = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
const download = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5"/></svg>';
const github = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-4 1-4-2-6-2m12 5v-4a3.5 3.5 0 0 0-1-2.7c3.3-.4 6.8-1.6 6.8-7.3a5.7 5.7 0 0 0-1.5-4 5.2 5.2 0 0 0-.1-4s-1.3-.4-4.2 1.5a14.5 14.5 0 0 0-7.6 0C4.5-.4 3.2 0 3.2 0a5.2 5.2 0 0 0-.1 4 5.7 5.7 0 0 0-1.5 4c0 5.7 3.5 6.9 6.8 7.3A3.5 3.5 0 0 0 7.5 18v4" transform="translate(1 1) scale(.9)"/></svg>';
const label = (text) => escape(text.replace(/^[^：:]{1,80}[：:]\s*/, ''));
const ui = {
  zh: {
    lang: 'zh-CN', name: '杨佳明', otherName: 'Jiaming Yang', title: '杨佳明 · 三维视觉与数据工程',
    description: '杨佳明，哈尔滨工业大学控制科学与工程硕士研究生。研究空地跨视角几何对齐与三维高斯重建，曾参与赛力斯智驾数据云平台建设。',
    nav: ['研究', '工程实践', '教育与教学', '技术栈'], skip: '跳转至正文', menu: '展开导航',
    download: '中文简历', bilingual: '中英双语简历', language: 'English', languageLabel: 'View this page in English',
    eyebrow: '哈尔滨工业大学 · 控制科学与工程', hero: '三维视觉研究，<br>与数据工程实践。',
    intro: '我是杨佳明，哈尔滨工业大学在读硕士，预计于 2028 年毕业。目前研究空地异构视角下的几何关联与坐标系对齐，也在实际数据生产链路中积累算法集成、质量评估与云端交付经验。',
    contact: '联系我', portrait: '杨佳明的个人照片', portraitNote: '硕士研究生 / 2025—2028',
    domains: ['跨视角几何', '3D Gaussian Splatting', '智驾数据生产'], research: '研究工作', researchNote: '从跨视角关联到一致的三维几何',
    current: '当前研究', researchTitle: '面向空地异构视角的<br>几何一致三维重建', pipeline: ['检索', '匹配', '关联', '对齐', '评测'],
    pipelineCaption: '跨视角对齐流程示意', aerial: '航拍视角', street: '街拍视角', unified: '统一坐标系',
    metricLabels: ['地面图像对应的相机位姿', '归一化位置 RMSE', '旋转 RMSE'], metricNote: 'Horizon-GS · Park 场景参考评测；0.286% 为相对于参考尺度的归一化位置误差。',
    readResearch: '研究方法与当前进展', undergraduate: '本科毕业设计 · 目标检测', publication: '研究成果', conference: '第 44 届中国控制会议（CCC）',
    engineering: '工程实践', engineeringNote: '算法、质检与云端生产的完整链路', company: '赛力斯 · 智驾数据平台',
    workLabels: ['动态标注 2D 质检', '标注后处理链路', '云端生产接入'], workNotes: ['Precision / Recall 代理指标', '候选 Feature 处理覆盖率', '已接入生产的 CLIPs'],
    journey: '教育与教学', journeyNote: '技术学习，也关注知识的分享', education: '教育经历', teaching: '教学经历',
    skills: '技术栈', skillsNote: '日常研究与开发使用的工具', skillGroups: ['编程与开发', '图表工具', '英语能力'],
    footerTitle: '欢迎交流研究与工程实践。', footerText: '关于三维视觉、数据工程或合作机会，欢迎通过邮件与我联系。',
    copy: '复制邮箱', copied: '邮箱已复制', copyFail: '请使用邮件链接联系我', updated: '更新于 2026 年 10 月', top: '返回顶部', expand: '展开详情',
  },
  en: {
    lang: 'en', name: 'Jiaming Yang', otherName: '杨佳明', title: 'Jiaming Yang · 3D Vision & Data Engineering',
    description: 'Jiaming Yang is a master’s student in Control Science and Engineering at Harbin Institute of Technology, working on aerial–ground geometry alignment, 3D Gaussian reconstruction and data engineering.',
    nav: ['Research', 'Engineering', 'Background', 'Skills'], skip: 'Skip to content', menu: 'Toggle navigation',
    download: 'English CV', bilingual: 'Bilingual CV', language: '中文', languageLabel: '查看中文版',
    eyebrow: 'Harbin Institute of Technology · Master’s student', hero: '3D vision research.<br>Data engineering practice.',
    intro: 'I’m Jiaming, a master’s student in Control Science and Engineering at HIT, graduating in 2028. I work on geometric association and coordinate alignment across aerial and ground views, with experience in algorithm integration, quality evaluation and cloud data production.',
    contact: 'Get in touch', portrait: 'Portrait of Jiaming Yang', portraitNote: 'Master’s student / 2025–2028',
    domains: ['Cross-view geometry', '3D Gaussian Splatting', 'Driving-data production'], research: 'Research', researchNote: 'Connecting views through consistent geometry',
    current: 'Current research', researchTitle: 'Geometrically consistent<br>aerial–ground reconstruction', pipeline: ['Retrieve', 'Match', 'Associate', 'Align', 'Evaluate'],
    pipelineCaption: 'Cross-view alignment · workflow schematic', aerial: 'Aerial views', street: 'Street views', unified: 'Shared coordinates',
    metricLabels: ['ground-view camera poses', 'normalized position RMSE', 'rotation RMSE'], metricNote: 'Reference evaluation on the Horizon-GS Park scene. The 0.286% positional RMSE is normalized by the reference scale.',
    readResearch: 'Method and current progress', undergraduate: 'Undergraduate thesis · Object detection', publication: 'Publication', conference: '44th Chinese Control Conference (CCC)',
    engineering: 'Engineering', engineeringNote: 'From algorithms to cloud data production', company: 'SERES · Driving-data platform',
    workLabels: ['2D annotation quality inspection', 'Annotation post-processing', 'Cloud production integration'], workNotes: ['Precision / Recall proxy metrics', 'candidate Feature processing coverage', 'CLIPs in the production workflow'],
    journey: 'Education & teaching', journeyNote: 'Learning, building and sharing knowledge', education: 'Education', teaching: 'Teaching',
    skills: 'Technical stack', skillsNote: 'Tools I use in research and development', skillGroups: ['Programming & development', 'Diagramming tools', 'English'],
    footerTitle: 'Let’s exchange ideas.', footerText: 'For conversations about 3D vision, data engineering or collaboration, feel free to get in touch.',
    copy: 'Copy email', copied: 'Email copied', copyFail: 'Please use the email link to get in touch', updated: 'Updated October 2026', top: 'Back to top', expand: 'Expand details',
  },
};

function geometry(u) {
  const dots = Array.from({ length: 72 }, (_, i) => {
    const row = Math.floor(i / 12), col = i % 12;
    const x = 48 + col * 23 + row * 8;
    const y = 125 + row * 17 - Math.sin(col / 2) * 30;
    return `<circle cx="${x}" cy="${y}" r="${i % 3 ? 2.2 : 3.1}" fill="${i % 3 ? '#6d9e98' : '#b65a43'}" opacity="${.35 + (i % 5) / 10}"/>`;
  }).join('');
  return `<svg class="geometry" viewBox="0 0 400 280" role="img" aria-label="${escape(u.pipelineCaption)}"><defs><pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0v24" fill="none" stroke="#dce5df" stroke-width=".5"/></pattern></defs><rect width="400" height="280" rx="4" fill="url(#grid)"/><g fill="none" stroke="#93a9a2" stroke-width="1"><path d="M32 218l173 40 166-85-168-39zM205 258V98M32 218V60M371 173V35" stroke-dasharray="4 5"/><path d="M116 55l38 7-17 28-38-8zM116 55l7-17 14 52M99 82l24-44 31 24" stroke="#b65a43"/><path d="M315 124l24 6-3 25-24-6zM315 124l-17 12 38 19M312 149l-14-13 41-6" stroke="#2d6b60"/><path d="M128 87l74 71M306 140l-91 25" stroke-dasharray="4 5"/></g>${dots}<g font-family="Arial,sans-serif" font-size="11" fill="#53685f"><text x="55" y="29">${escape(u.aerial)}</text><text x="280" y="104">${escape(u.street)}</text><text x="216" y="244">${escape(u.unified)}</text></g></svg>`;
}

function page(lang) {
  const u = ui[lang], c = resume.locales[lang], en = lang === 'en';
  const base = en ? '../' : './';
  const asset = (p) => base + p;
  const home = en ? '/en/' : '/';
  const other = en ? '/' : '/en/';
  const cv = asset(`assets/files/resume-${lang}.pdf`);
  const ids = ['research', 'engineering', 'background', 'skills'];
  const navigation = ids.map((id, i) => `<a href="#${id}">${u.nav[i]}</a>`).join('');
  const master = c.research[0], thesis = c.research[1];
  const publicationTitle = 'Toward Optical Military Targets: Benchmark Dataset and Lightweight Detection Model';
  const tagList = (items) => `<ul class="tags">${items.map((x) => `<li>${escape(x)}</li>`).join('')}</ul>`;
  return `<!doctype html>
<html lang="${u.lang}">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escape(u.title)}</title><meta name="description" content="${escape(u.description)}"><meta name="theme-color" content="#f6f5f0">
  <link rel="canonical" href="https://jiaminghit.github.io${home}">
  <link rel="alternate" hreflang="zh-CN" href="https://jiaminghit.github.io/"><link rel="alternate" hreflang="en" href="https://jiaminghit.github.io/en/"><link rel="alternate" hreflang="x-default" href="https://jiaminghit.github.io/">
  <meta property="og:type" content="profile"><meta property="og:title" content="${escape(u.title)}"><meta property="og:description" content="${escape(u.description)}"><meta property="og:url" content="https://jiaminghit.github.io${home}"><meta property="og:image" content="https://jiaminghit.github.io/assets/img/profile.webp">
  <link rel="icon" href="${asset('assets/img/monogram.svg')}" type="image/svg+xml"><link rel="stylesheet" href="${asset('assets/css/home.css')}">
  <script src="${asset('assets/js/home.js')}" defer></script>
  <script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: 'Jiaming Yang', alternateName: '杨佳明', url: 'https://jiaminghit.github.io/', sameAs: [resume.github], email: `mailto:${resume.email}`, affiliation: { '@type': 'CollegeOrUniversity', name: 'Harbin Institute of Technology' }, knowsAbout: ['3D computer vision', 'SfM', '3D Gaussian Splatting', 'Data engineering'] })}</script>
</head>
<body id="top" data-copied="${escape(u.copied)}" data-copy-fail="${escape(u.copyFail)}">
<a class="skip-link" href="#main">${u.skip}</a>
<header class="site-header"><div class="header-inner"><a class="brand" href="${home}" aria-label="${escape(u.name)}"><span class="monogram">jy<span>.</span></span><span>Jiaming Yang</span></a><nav id="site-nav" aria-label="${en ? 'Main navigation' : '主导航'}">${navigation}</nav><div class="header-actions"><a class="language-link" href="${other}" lang="${en ? 'zh-CN' : 'en'}" aria-label="${u.languageLabel}">${u.language}</a><a class="button button-small header-cv" href="${cv}" target="_blank" rel="noopener">${u.download}${download}</a><button class="menu-toggle" type="button" aria-label="${u.menu}" aria-controls="site-nav" aria-expanded="false"><span></span><span></span></button></div></div></header>
<main id="main">
<section class="hero wrap" aria-labelledby="name"><div class="hero-copy"><p class="eyebrow"><span class="status-dot"></span>${u.eyebrow}</p><div class="name-line"><h1 id="name">${u.name}</h1><span class="other-name" lang="${en ? 'zh-CN' : 'en'}">${u.otherName}</span></div><h2 class="hero-title">${u.hero}</h2><p class="intro">${u.intro}</p><div class="hero-actions"><a class="button" href="${cv}" target="_blank" rel="noopener">${u.download}${download}</a><a class="text-link" href="mailto:${resume.email}">${u.contact}${arrow}</a></div>${tagList(u.domains)}</div><figure class="portrait"><div class="photo-frame"><img src="${asset('assets/img/profile.webp')}" alt="${u.portrait}" width="640" height="853" fetchpriority="high"><span class="photo-index" aria-hidden="true">JY / 01</span></div><figcaption><span>${u.portraitNote}</span><span>HIT ↗</span></figcaption></figure></section>

<section id="research" class="section wrap" aria-labelledby="research-heading"><div class="section-heading"><div><span class="section-index">01 / RESEARCH</span><h2 id="research-heading">${u.research}</h2></div><p>${u.researchNote}</p></div>
<article class="research-feature"><div class="research-overview"><div><p class="eyebrow accent">${u.current} <span class="date-inline">${escape(master.date)}</span></p><h3>${u.researchTitle}</h3><p class="project-description">${label(master.background)}</p>${tagList(['MASt3R', 'SfM', 'RANSAC', 'Sim(3)', '3DGS'])}</div><figure class="geometry-figure">${geometry(u)}<figcaption>${u.pipelineCaption}</figcaption></figure></div>
<ol class="pipeline">${u.pipeline.map((x, i) => `<li><span>0${i + 1}</span>${x}${i < 4 ? '<b aria-hidden="true">→</b>' : ''}</li>`).join('')}</ol>
<div class="metrics">${['5,419', '0.286%', '0.197°'].map((value, i) => `<div><strong>${value}</strong><span>${u.metricLabels[i]}</span></div>`).join('')}</div><p class="metric-note">${u.metricNote}</p>
<details class="research-detail"><summary>${u.readResearch}<span aria-hidden="true">+</span></summary><div class="detail-body"><p class="full-project-title">${escape(master.title)}</p>${master.bullets.map((x) => `<p>${escape(x)}</p>`).join('')}</div></details></article>
<article class="thesis"><div class="entry-meta"><span class="eyebrow">${u.undergraduate}</span><span class="date">${escape(thesis.date)}</span></div><div><h3>${escape(thesis.title.replace(/[《》]/g, ''))}</h3><p>${label(thesis.background)}</p><ul class="clean-bullets">${thesis.bullets.slice(0, 2).map((x) => `<li>${escape(x)}</li>`).join('')}</ul><div class="publication"><span class="publication-label">${u.publication} / CCC</span><h4>${publicationTitle}</h4><p>${u.conference}</p><details><summary>${en ? 'Publication and thesis result' : '论文与毕业设计结果'} <span aria-hidden="true">↗</span></summary><p>${escape(thesis.bullets[2])}</p></details></div></div></article></section>

<section id="engineering" class="engineering-band"><div class="wrap section"><div class="section-heading"><div><span class="section-index">02 / ENGINEERING</span><h2 id="engineering-heading">${u.engineering}</h2></div><p>${u.engineeringNote}</p></div><div class="experience-layout"><aside><span class="date">${escape(c.internship.date)}</span><h3>${u.company}</h3><p class="role">${escape(c.internship.role)}</p><p class="company-full">${escape(c.internship.company)}</p>${tagList(['Python', 'S3', 'Kafka', 'Docker', 'Argo'])}</aside><div><p class="experience-intro">${label(c.internship.background)}</p><div class="work-list">${c.internship.bullets.map((x, i) => `<details class="work-item"${i === 0 ? ' open' : ''}><summary><span class="work-number">0${i + 1}</span><span class="work-summary"><strong>${u.workLabels[i]}</strong><span>${['75.0% / 84.5%', '99.86%', '≈59,000'][i]} <small>${u.workNotes[i]}</small></span></span><span class="expand-sign" aria-hidden="true">+</span></summary><div class="detail-body"><p>${label(x)}</p></div></details>`).join('')}</div></div></div></div></section>

<section id="background" class="section wrap"><div class="section-heading"><div><span class="section-index">03 / BACKGROUND</span><h2>${u.journey}</h2></div><p>${u.journeyNote}</p></div><div class="background-grid"><div><h3 class="column-label">${u.education}</h3>${c.education.map((x) => `<article class="timeline-item"><span class="date">${escape(x.date)}</span><h4>${escape(x.school)}</h4><p>${escape(x.degree)}</p></article>`).join('')}</div><div><h3 class="column-label">${u.teaching}</h3>${c.teaching.map((x) => `<article class="timeline-item"><span class="date">${escape(x.date)}</span><h4>${escape(x.role)}</h4><p>${escape(x.school)}</p>${x.body ? `<p class="teaching-note">${escape(x.body)}</p>` : ''}</article>`).join('')}</div></div></section>

<section id="skills" class="section wrap skills-section"><div class="section-heading"><div><span class="section-index">04 / TOOLKIT</span><h2>${u.skills}</h2></div><p>${u.skillsNote}</p></div><dl class="skill-list">${c.skills.map((x, i) => `<div><dt>${u.skillGroups[i]}</dt><dd>${escape(x.text)}</dd></div>`).join('')}</dl></section>

<section class="contact-section" id="contact"><div class="wrap contact-inner"><div><span class="section-index">LET’S CONNECT</span><h2>${u.footerTitle}</h2><p>${u.footerText}</p></div><div class="contact-actions"><a class="email-link" href="mailto:${resume.email}">${resume.email}${arrow}</a><div class="contact-links"><button class="copy-email" type="button" data-email="${resume.email}">${u.copy}</button><a href="${resume.github}" target="_blank" rel="noopener">${github}GitHub</a><a href="${asset('assets/files/curriculum_vitae.pdf')}" target="_blank" rel="noopener">${u.bilingual} ↗</a></div><span class="copy-status" role="status" aria-live="polite"></span></div></div></section>
</main><footer class="wrap site-footer"><span>© 2026 Jiaming Yang</span><span>${u.updated}</span><a href="#top">${u.top} ↑</a></footer>
</body></html>`;
}

await mkdir(path.join(root, 'en'), { recursive: true });
await writeFile(path.join(root, 'index.html'), page('zh'));
await writeFile(path.join(root, 'en/index.html'), page('en'));
await writeFile(path.join(root, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://jiaminghit.github.io/</loc><lastmod>2026-10-30</lastmod></url><url><loc>https://jiaminghit.github.io/en/</loc><lastmod>2026-10-30</lastmod></url></urlset>\n');
console.log('Built Chinese and English pages from data/resume.json.');
