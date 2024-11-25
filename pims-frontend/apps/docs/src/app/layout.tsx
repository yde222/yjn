import { Toaster } from '@pims-frontend/ui/components/ui/toaster';
import '@pims-frontend/ui/styles/globals.css';
import Providers from '@pims-frontend/docs/app/providers';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
