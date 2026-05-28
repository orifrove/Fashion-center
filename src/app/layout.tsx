import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'StyleAI — Your AI Fashion Stylist',
    template: '%s | StyleAI',
  },
  description:
    'AI-powered wardrobe management and outfit recommendations. Upload your clothes, get personalized style advice.',
  keywords: ['fashion', 'AI stylist', 'wardrobe', 'outfit recommendations', 'personal style'],
  authors: [{ name: 'StyleAI' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://styleai.app',
    title: 'StyleAI — Your AI Fashion Stylist',
    description: 'AI-powered wardrobe management and outfit recommendations.',
    siteName: 'StyleAI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StyleAI — Your AI Fashion Stylist',
    description: 'AI-powered wardrobe management and outfit recommendations.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  )
}
