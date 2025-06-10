import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "react-toastify/dist/ReactToastify.css";
import { GoogleAnalytics } from '@next/third-parties/google'
import dynamic from 'next/dynamic'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StradeVN",
  description: "Strade is an e-commerce platform that connects international buyers with suppliers in Vietnam",
};

const CrispWithNoSSR = dynamic(
    () => import('@/components/crisp'),
    { ssr: false }
)

export default async function RootLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) {
  return (
    <html lang="vi">
    <head>
      <GoogleAnalytics gaId="G-V8569QFL48"/>
      <meta property="og:image:width" content="1300"/>
      <meta property="og:image:height" content="816"/>
      <meta property="og:image:type" content="image/jpg"/>
      <CrispWithNoSSR />
    </head>
    <body className={inter.className}>
    <main className="min-h-screen bg-[#FDFBFF]">
      <Header lang={lang}/>
      {children}
      <Footer lang={lang}/>
    </main>
    </body>
    </html>
  );
}
