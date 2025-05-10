import { Header } from "@components/header/header";
import { Menu } from "@components/menu/menu";
import { Cart } from "@components/cart/cart";
import { CartContextProvider } from "@contexts/cart";
import "./globals.scss";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartContextProvider>
          <Header />
          <main>{children}</main>
          <Menu />
          <Cart />
        </CartContextProvider>
      </body>
    </html>
  );
}
