import React from "react"
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: "Jeet Singh",
    description: "A look into the work life of Jeet Singh",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}