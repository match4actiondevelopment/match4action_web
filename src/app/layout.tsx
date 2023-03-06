import { LayoutContext } from '@/modules/context/layout-context';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LayoutContext>{children}</LayoutContext>
      </body>
    </html>
  );
}
