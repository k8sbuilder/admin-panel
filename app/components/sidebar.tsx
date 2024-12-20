'use client'

import { useRouter } from 'next/navigation'
import { Home, Globe, Image, Layers, Settings, ShoppingCart, Book, FileText, Palette } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Sidebar() {
  const router = useRouter()
  return (
    <aside className="w-64 bg-white p-4 space-y-4 shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Admin Panel</h1>
      <nav className="space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          onClick={() => router.push('/dashboard')}
        >
          <Home className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          onClick={() => router.push('/active-sites')}
        >
          <Globe className="mr-2 h-4 w-4" />
          Active Sites
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          onClick={() => router.push('/product-page-builder')}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Product Page Builder
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          onClick={() => router.push('/domain-library')}
        >
          <FileText className="mr-2 h-4 w-4" />
          Domain Library
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          onClick={() => router.push('/prompt-library')}
        >
          <Book className="mr-2 h-4 w-4" />
          Prompt Library
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          onClick={() => router.push('/image-library')}
        >
          <Image className="mr-2 h-4 w-4" />
          Image Library
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          onClick={() => router.push('/image-postprocessing-lab')}
        >
          <Layers className="mr-2 h-4 w-4" />
          Image Postprocessing Lab
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          onClick={() => router.push('/theme-builder')}
        >
          <Palette className="mr-2 h-4 w-4" />
          Theme Builder
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          onClick={() => router.push('/settings')}
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </nav>
    </aside>
  )
}

