import { Toaster } from '@pims-frontend/ui/components/ui/toaster';
import '@pims-frontend/ui/styles/globals.css';
import Providers from './provider';
import Script from 'next/script';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <Script
          src="/admin/Grid/GridE.js"
          strategy="beforeInteractive"
        ></Script>
      </head>
      <body>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
