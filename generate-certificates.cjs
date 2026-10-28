const fs = require('fs');
const path = require('path');

const certs = [
  {
    id: 'cert-1',
    title: 'Web Development Fundamentals',
    issuer: 'Dicoding Indonesia',
    recipient: 'Rifqi Maulana',
    date: 'March 18, 2024',
    certId: 'ERJK23Y23OPQ',
    category: 'Full Stack Web Track',
    primaryColor: '#0066ff',
    secondaryColor: '#00ccff',
    accentColor: '#ff007f',
    sealText: 'DICODING ACCREDITED'
  },
  {
    id: 'cert-2',
    title: 'JavaScript Intermediate & Modern ES6+',
    issuer: 'Dicoding Indonesia',
    recipient: 'Rifqi Maulana',
    date: 'January 25, 2024',
    certId: 'KERJK4PQR7N',
    category: 'Software Engineering',
    primaryColor: '#d48806',
    secondaryColor: '#fadb14',
    accentColor: '#0052d9',
    sealText: 'JAVASCRIPT EXPERT'
  },
  {
    id: 'cert-3',
    title: 'Backend Developer with PHP & Laravel',
    issuer: 'Dicoding Indonesia',
    recipient: 'Rifqi Maulana',
    date: 'November 14, 2023',
    certId: 'WMZO1YV4DPXO',
    category: 'Backend Architecture',
    primaryColor: '#008060',
    secondaryColor: '#36cfc9',
    accentColor: '#722ed1',
    sealText: 'PHP ARCHITECT'
  },
  {
    id: 'cert-4',
    title: 'UI/UX Design Fundamentals & Prototyping',
    issuer: 'Google & Coursera',
    recipient: 'Rifqi Maulana',
    date: 'August 22, 2023',
    certId: 'GUX2023-RM7',
    category: 'Design Specialization',
    primaryColor: '#4285f4',
    secondaryColor: '#ea4335',
    accentColor: '#34a853',
    sealText: 'GOOGLE CERTIFIED'
  },
  {
    id: 'cert-5',
    title: 'React Developer Certification',
    issuer: 'Belajar.id Professional',
    recipient: 'Rifqi Maulana',
    date: 'May 10, 2024',
    certId: 'RCTDEV-2024-R',
    category: 'Frontend Engineering',
    primaryColor: '#0092ff',
    secondaryColor: '#13c2c2',
    accentColor: '#eb2f96',
    sealText: 'REACT VERIFIED'
  },
  {
    id: 'cert-6',
    title: 'Database Management Systems & SQL',
    issuer: 'Oracle Academy',
    recipient: 'Rifqi Maulana',
    date: 'June 30, 2023',
    certId: 'ORA-DBMS-2023',
    category: 'Data Engineering',
    primaryColor: '#cf1322',
    secondaryColor: '#fa541c',
    accentColor: '#096dd9',
    sealText: 'ORACLE ACADEMY'
  },
  {
    id: 'cert-7',
    title: 'Machine Learning Basics & Neural Networks',
    issuer: 'TensorFlow Developer Community',
    recipient: 'Rifqi Maulana',
    date: 'February 12, 2024',
    certId: 'TF-ML-2024-RM',
    category: 'AI & Data Science',
    primaryColor: '#fa8c16',
    secondaryColor: '#ffc069',
    accentColor: '#722ed1',
    sealText: 'TENSORFLOW AI'
  },
  {
    id: 'cert-8',
    title: 'AWS Cloud Practitioner Essentials',
    issuer: 'Amazon Web Services Training',
    recipient: 'Rifqi Maulana',
    date: 'September 05, 2023',
    certId: 'AWS-CP-RM2023',
    category: 'Cloud Infrastructure',
    primaryColor: '#ff9900',
    secondaryColor: '#146eb4',
    accentColor: '#232f3e',
    sealText: 'AWS VALIDATED'
  }
];

function generateSvg(cert) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="1000" height="700">
  <defs>
    <!-- Background Gradients -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#f5f8ff"/>
      <stop offset="100%" stop-color="#eef3fd"/>
    </linearGradient>

    <!-- Metallic Border Gradient -->
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${cert.primaryColor}"/>
      <stop offset="25%" stop-color="${cert.secondaryColor}"/>
      <stop offset="50%" stop-color="#ffffff"/>
      <stop offset="75%" stop-color="${cert.primaryColor}"/>
      <stop offset="100%" stop-color="${cert.accentColor}"/>
    </linearGradient>

    <!-- Gold / Holographic Seal Gradient -->
    <radialGradient id="sealGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fff8db"/>
      <stop offset="45%" stop-color="#ffd666"/>
      <stop offset="80%" stop-color="#d48806"/>
      <stop offset="100%" stop-color="#874d00"/>
    </radialGradient>

    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#002266" flood-opacity="0.12"/>
    </filter>

    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="1000" height="700" rx="16" fill="url(#bgGrad)" />

  <!-- Subtle Cyber Tech Grid Pattern -->
  <g opacity="0.04" stroke="#0044ee" stroke-width="1">
    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M 30 0 L 0 0 0 30"/>
    </pattern>
    <rect width="1000" height="700" fill="url(#grid)" />
  </g>

  <!-- Outer Double Ornamental Borders -->
  <rect x="24" y="24" width="952" height="652" rx="12" fill="none" stroke="url(#borderGrad)" stroke-width="3.5" filter="url(#shadow)"/>
  <rect x="34" y="34" width="932" height="632" rx="8" fill="none" stroke="#d0dff5" stroke-width="1.2" stroke-dasharray="8 4"/>
  <rect x="42" y="42" width="916" height="616" rx="6" fill="none" stroke="${cert.primaryColor}" stroke-opacity="0.25" stroke-width="1"/>

  <!-- Ornate Corner Elements -->
  <!-- Top Left -->
  <g transform="translate(30, 30)">
    <path d="M 0 30 L 0 0 L 30 0" fill="none" stroke="${cert.primaryColor}" stroke-width="4"/>
    <circle cx="6" cy="6" r="3" fill="${cert.accentColor}"/>
    <line x1="0" y1="14" x2="14" y2="0" stroke="${cert.secondaryColor}" stroke-width="2"/>
  </g>
  <!-- Top Right -->
  <g transform="translate(970, 30)">
    <path d="M 0 30 L 0 0 L -30 0" fill="none" stroke="${cert.primaryColor}" stroke-width="4"/>
    <circle cx="-6" cy="6" r="3" fill="${cert.accentColor}"/>
    <line x1="0" y1="14" x2="-14" y2="0" stroke="${cert.secondaryColor}" stroke-width="2"/>
  </g>
  <!-- Bottom Left -->
  <g transform="translate(30, 670)">
    <path d="M 0 -30 L 0 0 L 30 0" fill="none" stroke="${cert.primaryColor}" stroke-width="4"/>
    <circle cx="6" cy="-6" r="3" fill="${cert.accentColor}"/>
    <line x1="0" y1="-14" x2="14" y2="0" stroke="${cert.secondaryColor}" stroke-width="2"/>
  </g>
  <!-- Bottom Right -->
  <g transform="translate(970, 670)">
    <path d="M 0 -30 L 0 0 L -30 0" fill="none" stroke="${cert.primaryColor}" stroke-width="4"/>
    <circle cx="-6" cy="-6" r="3" fill="${cert.accentColor}"/>
    <line x1="0" y1="-14" x2="-14" y2="0" stroke="${cert.secondaryColor}" stroke-width="2"/>
  </g>

  <!-- Top Ribbon / Emblem -->
  <g transform="translate(500, 75)">
    <!-- Star Emblem -->
    <circle cx="0" cy="0" r="28" fill="${cert.primaryColor}" opacity="0.1"/>
    <circle cx="0" cy="0" r="22" fill="${cert.primaryColor}"/>
    <path d="M 0 -12 L 3 -3 L 12 -3 L 5 3 L 8 12 L 0 6 L -8 12 L -5 3 L -12 -3 L -3 -3 Z" fill="#ffffff"/>
  </g>

  <!-- Top Header Titles -->
  <text x="500" y="130" text-anchor="middle" font-family="'Segoe UI', Roboto, Helvetica, sans-serif" font-size="12" font-weight="700" letter-spacing="4" fill="${cert.primaryColor}" text-transform="uppercase">
    ${cert.issuer.toUpperCase()} • OFFICIAL ACCREDITATION
  </text>
  <text x="500" y="165" text-anchor="middle" font-family="'Times New Roman', Georgia, serif" font-size="34" font-weight="bold" letter-spacing="2" fill="#0f172a">
    CERTIFICATE OF ACHIEVEMENT
  </text>
  <line x1="400" y1="180" x2="600" y2="180" stroke="url(#borderGrad)" stroke-width="2"/>
  <circle cx="500" cy="180" r="3" fill="${cert.accentColor}"/>

  <!-- Presentation line -->
  <text x="500" y="215" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="14" font-style="italic" fill="#64748b">
    This document is proudly presented to
  </text>

  <!-- Recipient Name -->
  <g transform="translate(500, 275)">
    <text x="0" y="0" text-anchor="middle" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="42" font-weight="900" letter-spacing="1.5" fill="#0b132b">
      ${cert.recipient}
    </text>
    <path d="M -220 18 Q 0 28 220 18" fill="none" stroke="${cert.primaryColor}" stroke-width="2.5" opacity="0.8"/>
  </g>

  <!-- Recognition Body Text -->
  <text x="500" y="330" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="14" fill="#475569">
    for successfully completing all curriculum standards, practical examinations, and project requirements for
  </text>

  <!-- Certificate Course Title -->
  <g transform="translate(500, 385)">
    <rect x="-340" y="-32" width="680" height="52" rx="8" fill="#ffffff" stroke="${cert.primaryColor}" stroke-opacity="0.3" stroke-width="1.5" filter="url(#shadow)"/>
    <text x="0" y="3" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="22" font-weight="800" fill="${cert.primaryColor}">
      ${cert.title}
    </text>
  </g>

  <!-- Category & Level -->
  <text x="500" y="435" text-anchor="middle" font-family="'Segoe UI', monospace" font-size="12" font-weight="600" letter-spacing="2" fill="#64748b">
    SPECIALIZATION: ${cert.category.toUpperCase()} • VERIFIED HONORS
  </text>

  <!-- Bottom Section: 3 Columns -->

  <!-- Left Column: Verification & Credential ID -->
  <g transform="translate(100, 500)">
    <!-- Simulated Mini QR Code -->
    <rect x="0" y="0" width="70" height="70" rx="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <rect x="6" y="6" width="20" height="20" fill="#0f172a"/>
    <rect x="10" y="10" width="12" height="12" fill="#ffffff"/>
    <rect x="44" y="6" width="20" height="20" fill="#0f172a"/>
    <rect x="48" y="10" width="12" height="12" fill="#ffffff"/>
    <rect x="6" y="44" width="20" height="20" fill="#0f172a"/>
    <rect x="10" y="48" width="12" height="12" fill="#ffffff"/>
    <rect x="32" y="32" width="8" height="8" fill="${cert.primaryColor}"/>
    <rect x="44" y="44" width="16" height="6" fill="#0f172a"/>
    <rect x="32" y="16" width="6" height="12" fill="#0f172a"/>

    <text x="85" y="20" font-family="'Segoe UI', monospace" font-size="11" font-weight="700" fill="#0f172a">CREDENTIAL ID</text>
    <text x="85" y="36" font-family="'Courier New', monospace" font-size="12" font-weight="bold" fill="${cert.primaryColor}">${cert.certId}</text>
    
    <text x="85" y="54" font-family="'Segoe UI', sans-serif" font-size="11" fill="#64748b">Issue Date: <tspan font-weight="600" fill="#334155">${cert.date}</tspan></text>
    <text x="85" y="70" font-family="'Segoe UI', sans-serif" font-size="10" fill="#10b981" font-weight="bold">● Status: Active &amp; Verified</text>
  </g>

  <!-- Center Column: Holographic Gold Seal -->
  <g transform="translate(500, 545)">
    <!-- Outer Starburst Rays -->
    <circle cx="0" cy="0" r="48" fill="url(#sealGrad)" filter="url(#shadow)"/>
    <circle cx="0" cy="0" r="42" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 2"/>
    <circle cx="0" cy="0" r="38" fill="url(#sealGrad)"/>
    
    <!-- Seal Text Curved or Centered -->
    <text x="0" y="-12" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="8" font-weight="900" letter-spacing="1.5" fill="#583101">
      ★ OFFICIAL ★
    </text>
    <text x="0" y="4" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="9" font-weight="900" letter-spacing="1" fill="#3b2000">
      ${cert.sealText}
    </text>
    <text x="0" y="18" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="8" font-weight="bold" fill="#784400">
      GENUINE SEAL
    </text>
    
    <!-- Ribbons Dropping from Seal -->
    <path d="M -16 42 L -24 95 L -10 82 L 0 95 L 0 45 Z" fill="${cert.primaryColor}" opacity="0.9"/>
    <path d="M 0 45 L 0 95 L 10 82 L 24 95 L 16 42 Z" fill="${cert.accentColor}" opacity="0.9"/>
  </g>

  <!-- Right Column: Signatures & Authority -->
  <g transform="translate(740, 520)">
    <!-- Signature Graphic Stroke -->
    <path d="M 10 25 Q 35 -5 60 22 T 110 15 T 150 28" fill="none" stroke="#1e293b" stroke-width="2.2" stroke-linecap="round"/>
    <line x1="0" y1="40" x2="170" y2="40" stroke="#94a3b8" stroke-width="1.5"/>
    <text x="85" y="56" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="12" font-weight="700" fill="#0f172a">Academic Director</text>
    <text x="85" y="72" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="11" fill="#64748b">${cert.issuer}</text>
  </g>

  <!-- Footer Microcode -->
  <text x="500" y="660" text-anchor="middle" font-family="'Segoe UI', monospace" font-size="9" fill="#94a3b8" letter-spacing="2">
    SECURE VERIFICATION HASH: SHA256-${cert.certId.split('').map(c => c.charCodeAt(0).toString(16)).join('')} • RECORD ID #${cert.certId}
  </text>
</svg>`;
}

const outDir = path.join(__dirname, 'public', 'certificates');
certs.forEach(cert => {
  const filePath = path.join(outDir, `${cert.id}.svg`);
  fs.writeFileSync(filePath, generateSvg(cert), 'utf8');
  console.log(`Generated ${cert.id}.svg`);
});
console.log('All certificates generated successfully!');
