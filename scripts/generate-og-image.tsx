import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import satori from 'satori';
import sharp from 'sharp';

async function generateOGImage() {
  try {
    console.log('🎨 Generating OG image...');

    const logoPath = join(process.cwd(), 'app', 'favicon.ico');
    const cardPath = join(process.cwd(), 'public', 'cardBack.jpeg');

    const logoBuffer = readFileSync(logoPath);
    const cardBuffer = readFileSync(cardPath);

    const logoBase64 = logoBuffer.toString('base64');
    const cardBase64 = cardBuffer.toString('base64');

    console.log('📥 Loading Caudex font...');
    const fontPath = join(process.cwd(), 'public', 'caudex-regular.ttf');
    const fontBoldPath = join(process.cwd(), 'public', 'caudex-bold.ttf');

    const fontData = readFileSync(fontPath);
    const fontDataBold = readFileSync(fontBoldPath);

    console.log('✨ Rendering SVG...');

    const svg = await satori(
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(193, 150, 112, 0.15) 0%, transparent 50%)',
          fontFamily: 'Caudex',
          position: 'relative',
        }}
      >
        {}
        <div
          style={{
            position: 'absolute',
            right: '-100px',
            top: '50%',
            transform: 'translateY(-50%) rotate(15deg)',
            opacity: 0.2,
            display: 'flex',
          }}
        >
          <img
            src={`data:image/jpeg;base64,${cardBase64}`}
            alt="Tarot Card"
            width="400"
            height="700"
            style={{
              filter: 'blur(2px)',
            }}
          />
        </div>

        {}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px',
            zIndex: 10,
          }}
        >
          {}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '40px',
            }}
          >
            <img src={`data:image/x-icon;base64,${logoBase64}`} alt="Logo" width="auto" height="auto" />
          </div>

          {}
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #ffffff 0%, #c19670 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              marginBottom: '20px',
              textAlign: 'center',
              letterSpacing: '-0.02em',
            }}
          >
            tarotpedia
          </div>

          {}
          <div
            style={{
              fontSize: 32,
              color: '#c19670',
              textAlign: 'center',
              maxWidth: '800px',
              lineHeight: 1.4,
            }}
          >
            Ancient wisdom meets artificial intelligence
          </div>

          {}
          <div
            style={{
              display: 'flex',
              width: '200px',
              height: '2px',
              background: 'linear-gradient(90deg, transparent 0%, #c19670 50%, transparent 100%)',
              marginTop: '40px',
            }}
          />
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Caudex',
            data: fontData,
            weight: 400,
            style: 'normal',
          },
          {
            name: 'Caudex',
            data: fontDataBold,
            weight: 700,
            style: 'normal',
          },
        ],
      }
    );

    console.log('🖼️  Converting to PNG...');

    const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

    const outputPath = join(process.cwd(), 'public', 'og-image.png');
    writeFileSync(outputPath, pngBuffer);

    console.log('✅ OG image generated successfully at public/og-image.png');
    console.log(`   Size: ${(pngBuffer.length / 1024).toFixed(2)} KB`);
  } catch (error) {
    console.error('❌ Error generating OG image:', error);
    process.exit(1);
  }
}

generateOGImage();
