import { LayoutContext } from "@/modules/context/layout-context";
import { cookies } from "next/headers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  return (
    <html lang="en">
      <body>
        <LayoutContext accessToken={accessToken}>{children}</LayoutContext>
      </body>
    </html>
  );
}
