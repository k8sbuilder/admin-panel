'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

interface ProductItem {
  id: string;
  name: string;
  image: string;
  price: number;
  selected: boolean;
}

const getProductColor = (name: string) => {
  switch (name.toLowerCase()) {
    case 'tech t-shirt':
    case 'smart watch':
      return 'bg-blue-100 text-blue-800'
    case 'fitness tracker':
    case 'yoga mat':
      return 'bg-green-100 text-green-800'
    case 'eco water bottle':
    case 'solar charger':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export function LaunchSiteModule() {
  const [selectedDomain, setSelectedDomain] = useState('')
  const [selectedLogo, setSelectedLogo] = useState('')
  const [selectedProducts, setSelectedProducts] = useState<ProductItem[]>([])
  const [selectedTheme, setSelectedTheme] = useState('')

  // Mock data - replace with actual data in a real application
  const availableDomains = ['techstartup.com', 'fitnessguru.com', 'ecofriendly.com']
  const availableLogos = ['logo1.png', 'logo2.png', 'logo3.png']
  const availableProducts: ProductItem[] = [
    { id: '1', name: 'Tech T-Shirt', image: '/placeholder.svg?height=100&width=100&text=Tech T-Shirt', price: 29.99, selected: false },
    { id: '2', name: 'Fitness Tracker', image: '/placeholder.svg?height=100&width=100&text=Fitness Tracker', price: 99.99, selected: false },
    { id: '3', name: 'Eco Water Bottle', image: '/placeholder.svg?height=100&width=100&text=Eco Bottle', price: 19.99, selected: false },
    { id: '4', name: 'Smart Watch', image: '/placeholder.svg?height=100&width=100&text=Smart Watch', price: 199.99, selected: false },
    { id: '5', name: 'Yoga Mat', image: '/placeholder.svg?height=100&width=100&text=Yoga Mat', price: 39.99, selected: false },
    { id: '6', name: 'Solar Charger', image: '/placeholder.svg?height=100&width=100&text=Solar Charger', price: 49.99, selected: false },
  ]
  const availableThemes = ['Modern', 'Classic', 'Minimalist', 'Bold']

  const handleProductSelection = (id: string) => {
    setSelectedProducts(prev => 
      prev.map(product => 
        product.id === id ? { ...product, selected: !product.selected } : product
      )
    )
  }

  const handleCheckAll = () => {
    setSelectedProducts(availableProducts.map(product => ({ ...product, selected: true })))
  }

  const handleUncheckAll = () => {
    setSelectedProducts(availableProducts.map(product => ({ ...product, selected: false })))
  }

  return (
    <Card className="h-[800px] flex flex-col">
      <CardHeader>
        <CardTitle>Launch Site Module</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden flex flex-col">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Select Domain</label>
            <Select onValueChange={setSelectedDomain}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a domain" />
              </SelectTrigger>
              <SelectContent>
                {availableDomains.map(domain => (
                  <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Select Logo</label>
            <Select onValueChange={setSelectedLogo}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a logo" />
              </SelectTrigger>
              <SelectContent>
                {availableLogos.map(logo => (
                  <SelectItem key={logo} value={logo}>{logo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mb-4 flex-1 overflow-hidden">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium">Select Products</label>
            <div>
              <Button variant="outline" size="sm" className="mr-2" onClick={handleCheckAll}>Check All</Button>
              <Button variant="outline" size="sm" onClick={handleUncheckAll}>Uncheck All</Button>
            </div>
          </div>
          <ScrollArea className="h-[300px] border rounded-md p-2">
            <div className="grid grid-cols-2 gap-4">
              {availableProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="relative cursor-pointer group border rounded-md p-2"
                  onClick={() => handleProductSelection(product.id)}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={100}
                    height={100}
                    className="rounded-md transition-opacity group-hover:opacity-75 mx-auto"
                  />
                  <Checkbox
                    checked={product.selected}
                    className="absolute top-2 left-2 bg-white"
                  />
                  <div className="mt-2 text-center">
                    <Badge className={`${getProductColor(product.name)} mb-1`}>
                      {product.name}
                    </Badge>
                    <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Select Theme</label>
          <Select onValueChange={setSelectedTheme}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a theme" />
            </SelectTrigger>
            <SelectContent>
              {availableThemes.map(theme => (
                <SelectItem key={theme} value={theme}>
                  <Badge variant="outline" className="bg-purple-100 text-purple-800 mr-2">
                    {theme}
                  </Badge>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-between mt-auto">
          <Button variant="outline">Preview</Button>
          <Button className="bg-green-500 hover:bg-green-600 text-white">Launch Site</Button>
        </div>
      </CardContent>
    </Card>
  )
}

