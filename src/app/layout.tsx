import { Header } from "@components/business/header/header";
import { Menu } from "@components/business/menu/menu";
import { Cart } from "@components/business/cart/cart";
import { CartContextProvider } from "@contexts/cart.context";
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
