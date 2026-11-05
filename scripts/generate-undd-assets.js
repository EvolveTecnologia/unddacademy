import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateAssets() {
  const publicDir = path.resolve('public');
  const flagPath = path.join(publicDir, 'assets/aistudio/7501795_59b517b5.png');
  const logoPath = path.join(publicDir, 'assets/aistudio/undd_b1797e20.png');
  const womanPhotoPath = path.join(publicDir, 'mulher-em-laptop.jpeg');

  console.log('--- 1. Gerando Favicons com a Bandeira do Brasil ---');
  // Copy raw flag as flag-brasil.png
  fs.copyFileSync(flagPath, path.join(publicDir, 'flag-brasil.png'));
  fs.copyFileSync(logoPath, path.join(publicDir, 'undd.png'));
  fs.copyFileSync(logoPath, path.join(publicDir, 'logo.png'));

  // 1.1 Favicon 32x32
  await sharp(flagPath)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));
  console.log('✔ public/favicon-32x32.png criado');

  // 1.2 Favicon.ico (32x32 PNG container for modern browsers)
  await sharp(flagPath)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));
  console.log('✔ public/favicon.ico criado');

  // 1.3 Apple Touch Icon 180x180 with clean dark padding for iOS home screen
  await sharp(flagPath)
    .resize(180, 180, { fit: 'contain', background: { r: 6, g: 11, b: 24, alpha: 1 } })
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✔ public/apple-touch-icon.png criado');

  // 1.4 PWA 192x192
  await sharp(flagPath)
    .resize(192, 192, { fit: 'contain', background: { r: 6, g: 11, b: 24, alpha: 1 } })
    .png()
    .toFile(path.join(publicDir, 'pwa-192x192.png'));
  console.log('✔ public/pwa-192x192.png criado');

  // 1.5 PWA 512x512
  await sharp(flagPath)
    .resize(512, 512, { fit: 'contain', background: { r: 6, g: 11, b: 24, alpha: 1 } })
    .png()
    .toFile(path.join(publicDir, 'pwa-512x512.png'));
  console.log('✔ public/pwa-512x512.png criado');

  // 1.6 Maskable PWA 512x512 (with safe zone inner padding)
  const flagInner = await sharp(flagPath)
    .resize(360, 360, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 6, g: 11, b: 24, alpha: 1 }
    }
  })
    .composite([{ input: flagInner, gravity: 'center' }])
    .png()
    .toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));
  console.log('✔ public/pwa-maskable-512x512.png criado');

  console.log('\n--- 2. Gerando OpenGraph Banner (1200x630) com Mulher no Laptop + UNDD Academy ---');

  // 2.1 Resize woman photo to 1200x630 with smart crop
  const womanResized = await sharp(womanPhotoPath)
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .toBuffer();

  // Resize UNDD Logo for composition (width 620px)
  const logoResized = await sharp(logoPath)
    .resize(620, null, { fit: 'inside' })
    .png()
    .toBuffer();

  // Resize Brazil Flag for composition badge (height 50px)
  const flagBadge = await sharp(flagPath)
    .resize(null, 50, { fit: 'inside' })
    .png()
    .toBuffer();

  // SVG Overlay with dark gradient, professional typography, highlights, and borders
  const overlaySvg = Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Horizontal Gradient from rich deep navy to semi-transparent over woman -->
        <linearGradient id="scrimH" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#060B18" stop-opacity="0.97" />
          <stop offset="42%" stop-color="#060B18" stop-opacity="0.92" />
          <stop offset="68%" stop-color="#060B18" stop-opacity="0.65" />
          <stop offset="100%" stop-color="#060B18" stop-opacity="0.25" />
        </linearGradient>

        <!-- Vertical Gradient for depth -->
        <linearGradient id="scrimV" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#060B18" stop-opacity="0.70" />
          <stop offset="60%" stop-color="#060B18" stop-opacity="0.0" />
          <stop offset="100%" stop-color="#060B18" stop-opacity="0.95" />
        </linearGradient>

        <linearGradient id="blueAccent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#1E40AF" />
          <stop offset="100%" stop-color="#3B82F6" />
        </linearGradient>

        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#F59E0B" />
          <stop offset="100%" stop-color="#FBBF24" />
        </linearGradient>

        <filter id="cardShadow" x="-5%" y="-5%" width="110%" height="110%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" flood-opacity="0.5" flood-color="#000000" />
        </filter>
      </defs>

      <!-- Background Scrims -->
      <rect width="1200" height="630" fill="url(#scrimH)" />
      <rect width="1200" height="630" fill="url(#scrimV)" />

      <!-- Top Subtle Header Bar -->
      <rect x="0" y="0" width="1200" height="6" fill="url(#blueAccent)" />

      <!-- Tag / Badge at Top Left -->
      <g transform="translate(70, 70)">
        <rect x="0" y="0" width="460" height="34" rx="17" fill="#0C162E" stroke="#1B2F5C" stroke-width="1.5" />
        <circle cx="20" cy="17" r="5" fill="#10B981" />
        <text x="35" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" fill="#60A5FA" letter-spacing="1.5">
          PLATAFORMA OFICIAL DE ENSINO • DOCENTES DE DIREITA
        </text>
      </g>

      <!-- Subtitle Description -->
      <text x="70" y="260" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="900" fill="#FFFFFF" letter-spacing="0.5">
        CAPACITAÇÃO PROFISSIONAL E EXCELÊNCIA TÉCNICA
      </text>

      <text x="70" y="300" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="500" fill="#94A3B8" letter-spacing="0.2">
        Ambiente virtual completo para jovens e adultos, fundamentado no mérito,
      </text>
      <text x="70" y="328" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="500" fill="#94A3B8" letter-spacing="0.2">
        no protagonismo individual e livre de viés ideológico de esquerda.
      </text>

      <!-- 3 Feature Badges in Pill Cards -->
      <g transform="translate(70, 375)">
        <!-- Pill 1 -->
        <rect x="0" y="0" width="200" height="48" rx="14" fill="#0C162E" stroke="#1B2F5C" stroke-width="1.5" />
        <text x="24" y="29" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF">
          📚 Cursos 100% Online
        </text>

        <!-- Pill 2 -->
        <rect x="215" y="0" width="215" height="48" rx="14" fill="#0C162E" stroke="#1B2F5C" stroke-width="1.5" />
        <text x="238" y="29" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF">
          ⚡ Prática de Mercado
        </text>

        <!-- Pill 3 -->
        <rect x="445" y="0" width="215" height="48" rx="14" fill="#0C162E" stroke="#1B2F5C" stroke-width="1.5" />
        <text x="468" y="29" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF">
          🎓 Certificado Oficial
        </text>
      </g>

      <!-- Bottom Bar Info -->
      <line x1="70" y1="465" x2="720" y2="465" stroke="#1B2F5C" stroke-width="1" />

      <g transform="translate(70, 500)">
        <text x="0" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#60A5FA" letter-spacing="1">
          Acesse via Mobile, Tablet e Desktop
        </text>
        <text x="0" y="42" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500" fill="#64748B">
          www.undd.academy • Ensino livre, técnico e emancipador
        </text>
      </g>
    </svg>
  `);

  // Composite the final 1200x630 OG Image:
  // Base: womanResized
  // Overlays:
  // 1. overlaySvg
  // 2. logoResized at (x: 70, y: 130)
  // 3. flagBadge at (x: 1080, y: 50)
  const ogComposition = await sharp(womanResized)
    .composite([
      { input: overlaySvg, top: 0, left: 0 },
      { input: logoResized, top: 130, left: 70 },
      { input: flagBadge, top: 50, left: 1080 }
    ])
    .toBuffer();

  // Save 1200x630 JPEG (highest compatibility with WhatsApp, FB, Twitter)
  await sharp(ogComposition)
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile(path.join(publicDir, 'og-image.jpg'));
  console.log('✔ public/og-image.jpg criado (1200x630)');

  // Save 1200x630 PNG
  await sharp(ogComposition)
    .png({ quality: 95, compressionLevel: 8 })
    .toFile(path.join(publicDir, 'og-image.png'));
  console.log('✔ public/og-image.png criado (1200x630)');

  // Synchronize alias filenames: og-edtech, logoog
  fs.copyFileSync(path.join(publicDir, 'og-image.jpg'), path.join(publicDir, 'og-edtech.jpg'));
  fs.copyFileSync(path.join(publicDir, 'og-image.png'), path.join(publicDir, 'og-edtech.png'));
  fs.copyFileSync(path.join(publicDir, 'og-image.jpg'), path.join(publicDir, 'logoog.jpg'));
  fs.copyFileSync(path.join(publicDir, 'og-image.png'), path.join(publicDir, 'logoog.png'));

  console.log('\n--- 3. Gerando Versão Quadrada 800x800 para WhatsApp Thumbnail ---');
  // Square composition with woman background cropped square, logo, flag, and text
  const womanSquare = await sharp(womanPhotoPath)
    .resize(800, 800, { fit: 'cover', position: 'center' })
    .toBuffer();

  const logoSquare = await sharp(logoPath)
    .resize(660, null, { fit: 'inside' })
    .png()
    .toBuffer();

  const flagSquareBadge = await sharp(flagPath)
    .resize(90, 90, { fit: 'contain' })
    .png()
    .toBuffer();

  const squareOverlaySvg = Buffer.from(`
    <svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#060B18" stop-opacity="0.80" />
          <stop offset="70%" stop-color="#060B18" stop-opacity="0.94" />
          <stop offset="100%" stop-color="#060B18" stop-opacity="0.98" />
        </radialGradient>
      </defs>
      <rect width="800" height="800" fill="url(#vignette)" />

      <!-- Top Tag -->
      <rect x="220" y="55" width="360" height="34" rx="17" fill="#0C162E" stroke="#1B2F5C" stroke-width="1.5" />
      <text x="400" y="77" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800" fill="#60A5FA" letter-spacing="1.5">
        UNIÃO NACIONAL DE DOCENTES DE DIREITA
      </text>

      <!-- Center Subtitle -->
      <text x="400" y="440" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="900" fill="#FFFFFF" letter-spacing="1">
        PLATAFORMA OFICIAL DE ENSINO
      </text>
      <text x="400" y="475" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="600" fill="#94A3B8">
        Capacitação Profissional • Mérito • Excelência Técnica
      </text>

      <!-- Bottom Tag -->
      <rect x="270" y="670" width="260" height="42" rx="21" fill="#1E40AF" />
      <text x="400" y="696" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF" letter-spacing="1">
        ACESSE: UNDD.ACADEMY
      </text>
    </svg>
  `);

  const squareComposition = await sharp(womanSquare)
    .composite([
      { input: squareOverlaySvg, top: 0, left: 0 },
      { input: flagSquareBadge, top: 130, left: 355 },
      { input: logoSquare, top: 250, left: 70 }
    ])
    .toBuffer();

  await sharp(squareComposition)
    .jpeg({ quality: 95 })
    .toFile(path.join(publicDir, 'og-square.jpg'));
  console.log('✔ public/og-square.jpg criado (800x800)');

  await sharp(squareComposition)
    .png({ quality: 95 })
    .toFile(path.join(publicDir, 'og-square.png'));
  console.log('✔ public/og-square.png criado (800x800)');

  // Also copy to dist/ if it exists
  const distDir = path.resolve('dist');
  if (fs.existsSync(distDir)) {
    ['og-image.jpg', 'og-image.png', 'og-edtech.jpg', 'og-edtech.png', 'logoog.jpg', 'logoog.png', 'og-square.jpg', 'og-square.png', 'favicon.ico', 'favicon-32x32.png', 'apple-touch-icon.png', 'pwa-192x192.png', 'pwa-512x512.png', 'pwa-maskable-512x512.png', 'undd.png', 'logo.png'].forEach(file => {
      const src = path.join(publicDir, file);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(distDir, file));
      }
    });
    console.log('✔ Copiados todos os arquivos para dist/');
  }

  console.log('\n✅ Todos os ativos de imagem, favicons e OpenGraph foram gerados com sucesso!');
}

generateAssets().catch(console.error);
