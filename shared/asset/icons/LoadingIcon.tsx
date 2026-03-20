'use client';

export default function LoadingIcon({ size = 24 }: { size?: number }) {
  return (
    <>
      <div
        style={{
          width: size,
          height: size,
          border: '4px solid #f4f4f4',
          borderTop: '4px solid #3182f6',
          borderRadius: '50%',
          animation: 'loading-spin 1s linear infinite',
        }}
      />
      <style jsx>{`
        @keyframes loading-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
