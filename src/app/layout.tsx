import { Header } from "./components/header/header";
import { Menu } from "./components/menu/menu";
import { Cart } from "./components/cart/cart";
import { FloatingCTAs } from "./components/floating-ctas/floating-ctas";
import "./globals.scss";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Menu />
        <Cart />
        <FloatingCTAs />
      </body>
    </html>
  );
}
