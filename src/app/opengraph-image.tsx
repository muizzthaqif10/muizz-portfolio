import { ImageResponse } from 'next/og';
import { profile } from '@/data/profile';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          backgroundColor: '#0a0e14',
          backgroundImage:
            'linear-gradient(to right, #1e2530 1px, transparent 1px), linear-gradient(to bottom, #1e2530 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, color: '#5eead4', fontFamily: 'monospace' }}>
          {`// ${profile.shortName.toLowerCase()}.dev`}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 24,
            fontSize: 60,
            fontWeight: 600,
            color: '#e6eaf0',
            maxWidth: 900,
          }}
        >
          {profile.fullName}
        </div>
        <div style={{ display: 'flex', marginTop: 20, fontSize: 30, color: '#8b95a5' }}>
          {profile.title} — {profile.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
