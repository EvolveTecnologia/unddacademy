import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

async function syncAssets() {
  console.log('🔄 Sincronizando imagens oficiais Amanitech Academy...');

  const iconPath = path.join(PUBLIC_DIR, 'assets/aistudio/icon_eb76fa32.png');
  const logoPath = path.join(PUBLIC_DIR, 'assets/aistudio/logo_ebb118af.png');

  // 1. Gerar PWA e Favicons
  if (fs.existsSync(iconPath)) {
    await sharp(iconPath)
      .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 98 })
      .toFile(path.join(PUBLIC_DIR, 'pwa-192x192.png'));

    await sharp(iconPath)
      .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 98 })
      .toFile(path.join(PUBLIC_DIR, 'pwa-512x512.png'));

    await sharp(iconPath)
      .resize(512, 512, { fit: 'contain', background: { r: 18, g: 24, b: 26, alpha: 1 } })
      .png({ quality: 98 })
      .toFile(path.join(PUBLIC_DIR, 'pwa-maskable-512x512.png'));

    await sharp(iconPath)
      .resize(32, 32)
      .png({ quality: 98 })
      .toFile(path.join(PUBLIC_DIR, 'favicon-32x32.png'));

    await sharp(iconPath)
      .resize(180, 180, { fit: 'contain', background: { r: 18, g: 24, b: 26, alpha: 1 } })
      .png({ quality: 98 })
      .toFile(path.join(PUBLIC_DIR, 'apple-touch-icon.png'));

    // 2. Square OG
    await sharp(iconPath)
      .resize(560, 560, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .extend({ top: 120, bottom: 120, left: 120, right: 120, background: { r: 247, g: 249, b: 250, alpha: 1 } })
      .jpeg({ quality: 92 })
      .toFile(path.join(PUBLIC_DIR, 'og-square.jpg'));

    await sharp(iconPath)
      .resize(560, 560, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .extend({ top: 120, bottom: 120, left: 120, right: 120, background: { r: 247, g: 249, b: 250, alpha: 1 } })
      .png({ quality: 95 })
      .toFile(path.join(PUBLIC_DIR, 'og-square.png'));
  }

  // 3. OpenGraph Banner (1200 x 630 px) com Amanitech Academy
  const logoBuffer = await sharp(logoPath)
    .resize(480, 246, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const ogCardSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0E1618" />
        <stop offset="40%" stop-color="#12181A" />
        <stop offset="85%" stop-color="#1B2224" />
        <stop offset="100%" stop-color="#090E0F" />
      </linearGradient>
      <linearGradient id="brandBar" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#1BA9A2" />
        <stop offset="35%" stop-color="#148F89" />
        <stop offset="70%" stop-color="#F26A21" />
        <stop offset="100%" stop-color="#D95A15" />
      </linearGradient>
      <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="100%" stop-color="#F7F9FA" />
      </linearGradient>
      <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="12" stdDeviation="20" flood-color="#000000" flood-opacity="0.6" />
      </filter>
      <filter id="badgeShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.3" />
      </filter>
    </defs>

    <!-- Background -->
    <rect width="1200" height="630" fill="url(#bg)" />

    <!-- Top Accent Bar -->
    <rect x="0" y="0" width="1200" height="10" fill="url(#brandBar)" />

    <!-- Subtle Tech Grid Background Pattern -->
    <g stroke="rgba(27, 169, 162, 0.08)" stroke-width="1">
      <line x1="0" y1="120" x2="1200" y2="120" />
      <line x1="0" y1="240" x2="1200" y2="240" />
      <line x1="0" y1="360" x2="1200" y2="360" />
      <line x1="0" y1="480" x2="1200" y2="480" />
      <line x1="200" y1="0" x2="200" y2="630" />
      <line x1="400" y1="0" x2="400" y2="630" />
      <line x1="600" y1="0" x2="600" y2="630" />
      <line x1="800" y1="0" x2="800" y2="630" />
      <line x1="1000" y1="0" x2="1000" y2="630" />
    </g>

    <!-- Ambient Glowing Orbs -->
    <circle cx="1020" cy="180" r="300" fill="#1BA9A2" opacity="0.20" filter="blur(70px)" />
    <circle cx="200" cy="500" r="260" fill="#F26A21" opacity="0.14" filter="blur(70px)" />

    <!-- Left Content Column -->
    <g transform="translate(80, 75)">
      
      <!-- Category Pill -->
      <g filter="url(#badgeShadow)">
        <rect x="0" y="0" width="460" height="42" rx="21" fill="#1BA9A2" fill-opacity="0.25" stroke="#1BA9A2" stroke-width="1.5" />
        <polygon points="20,15 32,21 20,27" fill="#F26A21" />
        <text x="42" y="27" fill="#E6F7F6" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800" letter-spacing="2">
          ADAPTIVE LEARNING &amp; STREAMING • RDC
        </text>
      </g>

      <!-- Main Headline -->
      <text x="0" y="115" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="40" font-weight="900" letter-spacing="-0.5">
        Transformação Digital &amp;
      </text>
      <text x="0" y="165" fill="#F26A21" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="40" font-weight="900" letter-spacing="-0.5">
        Climática da África
      </text>

      <!-- Subtitle & Value Proposition -->
      <text x="0" y="222" fill="#E3E8EA" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="500">
        A plataforma educacional da AMANITECH dedicada a formar o
      </text>
      <text x="0" y="248" fill="#E3E8EA" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="500">
        capital humano soberano em tecnologia, inovação e sustentabilidade.
      </text>

      <!-- Feature Badges Row -->
      <g transform="translate(0, 295)">
        <!-- Badge 1: Adaptive Learning -->
        <g>
          <rect x="0" y="0" width="185" height="50" rx="14" fill="#1B2224" stroke="#1BA9A2" stroke-width="1" />
          <text x="16" y="24" fill="#1BA9A2" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800">▶ ADAPTIVE LEARNING</text>
          <text x="16" y="40" fill="#E3E8EA" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="500">Trilhas Personalizadas</text>
        </g>

        <!-- Badge 2: Adaptive Streaming -->
        <g transform="translate(200, 0)">
          <rect x="0" y="0" width="185" height="50" rx="14" fill="#1B2224" stroke="#F26A21" stroke-width="1" />
          <text x="16" y="24" fill="#F26A21" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800">⚡ ADAPTIVE STREAMING</text>
          <text x="16" y="40" fill="#E3E8EA" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="500">Acesso Contínuo &amp; Offline</text>
        </g>

        <!-- Badge 3: Certificações -->
        <g transform="translate(400, 0)">
          <rect x="0" y="0" width="170" height="50" rx="14" fill="#1B2224" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
          <text x="16" y="24" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800">✓ CERTIFICAÇÕES</text>
          <text x="16" y="40" fill="#E3E8EA" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="500">Reconhecimento Oficial</text>
        </g>
      </g>

      <!-- Footer Info Line -->
      <g transform="translate(0, 420)">
        <text x="0" y="0" fill="#1BA9A2" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800" letter-spacing="1">
          AMANITECH ACADEMY • Technology &amp; Sustainability • Kinshasa, RDC
        </text>
      </g>
    </g>

    <!-- Right Side: Official Brand Emblem Container -->
    <g transform="translate(710, 85)" filter="url(#cardShadow)">
      <rect width="420" height="450" rx="36" fill="url(#cardGrad)" stroke="#1BA9A2" stroke-width="2" />
      <rect x="160" y="16" width="100" height="4" rx="2" fill="#1BA9A2" opacity="0.3" />
      <text x="210" y="400" text-anchor="middle" fill="#0E6B66" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800" letter-spacing="3">
        ACADEMY
      </text>
    </g>
  </svg>
  `;

  const ogCanvasBuffer = await sharp(Buffer.from(ogCardSvg))
    .png()
    .toBuffer();

  const finalOgBuffer = await sharp(ogCanvasBuffer)
    .composite([
      {
        input: logoBuffer,
        top: 170,
        left: 680,
      },
    ])
    .png({ quality: 95 })
    .toBuffer();

  // Save in all required formats & paths
  await sharp(finalOgBuffer)
    .png({ quality: 95 })
    .toFile(path.join(PUBLIC_DIR, 'og-image.png'));

  await sharp(finalOgBuffer)
    .jpeg({ quality: 90 })
    .toFile(path.join(PUBLIC_DIR, 'og-image.jpg'));

  await sharp(finalOgBuffer)
    .jpeg({ quality: 90 })
    .toFile(path.join(PUBLIC_DIR, 'og-edtech.jpg'));

  await sharp(finalOgBuffer)
    .png({ quality: 95 })
    .toFile(path.join(PUBLIC_DIR, 'og-edtech.png'));

  await sharp(finalOgBuffer)
    .jpeg({ quality: 90 })
    .toFile(path.join(PUBLIC_DIR, 'logoog.jpg'));

  await sharp(finalOgBuffer)
    .png({ quality: 95 })
    .toFile(path.join(PUBLIC_DIR, 'logoog.png'));

  console.log('✔ public/og-image.jpg, public/og-image.png atualizados com sucesso!');
}

syncAssets().catch(console.error);

