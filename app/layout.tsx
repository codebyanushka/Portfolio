import "./globals.css";
import CursorEnergy from "./components/CursorEnergy";
import SmoothScroll from "./components/SmoothScroll";
import MouseTracker from "./components/MouseTracker";

export const metadata = {
  title: "Portfolio",
  description: "Creative Developer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <MouseTracker />
        <CursorEnergy />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
