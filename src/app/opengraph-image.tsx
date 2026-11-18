import { ImageResponse } from 'next/og';
import { site } from '@/lib/content';

export const alt = 'Focaro Digital: desarrollo web, sistemas y automatización';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          padding: '72px 78px',
          backgroundColor: '#262a30',
          color: '#f4f4f1',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ position: 'absolute', left: 0, top: 0, width: 12, height: '100%', background: '#5d7e98' }} />
        <div style={{ width: 710, display: 'flex', flexDirection: 'column', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 64 }}>
            <div style={{ width: 46, height: 46, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #8ea8bb', color: '#f4f4f1', fontSize: 28, fontWeight: 700 }}>F</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 23, fontWeight: 700, letterSpacing: 2 }}>{site.name.toUpperCase()}</span>
              <span style={{ color: '#a9c1d4', fontSize: 12, letterSpacing: 4, marginTop: 3 }}>SOLUCIONES DIGITALES</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 63, fontWeight: 600, lineHeight: 1.08, letterSpacing: -2 }}>
            <span>Desarrollo web</span>
            <span style={{ color: '#a9c1d4' }}>y software.</span>
          </div>
          <p style={{ width: 640, marginTop: 28, color: '#d1d8dc', fontSize: 24, lineHeight: 1.45 }}>
            Sitios, sistemas y automatización para procesos reales.
          </p>
          <span style={{ marginTop: 34, color: '#a9c1d4', fontSize: 17, letterSpacing: 1 }}>{site.url.replace('https://', '')}</span>
        </div>
        <div style={{ position: 'absolute', right: 77, top: 146, width: 310, height: 310, border: '1px solid #5d7e98', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 218, height: 218, border: '1px solid #5d7e98', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(-24deg)' }}>
            <div style={{ width: 122, height: 122, border: '1px solid #8ba6ba', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(24deg)', color: '#a9c1d4', fontSize: 64, fontWeight: 600 }}>F</div>
          </div>
          <div style={{ position: 'absolute', right: 33, top: 63, width: 14, height: 14, borderRadius: '50%', background: '#a9c1d4' }} />
          <div style={{ position: 'absolute', left: 41, bottom: 48, width: 10, height: 10, borderRadius: '50%', background: '#5d7e98' }} />
        </div>
      </div>
    ),
    { ...size },
  );
}
