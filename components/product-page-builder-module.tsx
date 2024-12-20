'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

interface ImageItem {
  src: string;
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

export function ProductPageBuilderModule() {
  const [selectedImages, setSelectedImages] = useState<ImageItem[]>([])
  const [selectedPodService, setSelectedPodService] = useState('')
  const [productTags, setProductTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')

  // Mock data - replace with actual data in a real application
  const availableImages: ImageItem[] = Array.from({ length: 8 }, (_, i) => ({
    src: `/placeholder.svg?height=100&width=100&text=Product${i + 1}`,
    selected: false
  }))
  const podServices = ['Printful', 'Printify', 'Gooten', 'Scalable Press']

  const handleImageSelection = (index: number) => {
    setSelectedImages(prev => 
      prev.map((img, i) => 
        i === index ? { ...img, selected: !img.selected } : img
      )
    )
  }

  const handleAddTag = () => {
    if (newTag && !productTags.includes(newTag)) {
      setProductTags([...productTags, newTag])
      setNewTag('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setProductTags(productTags.filter(t => t !== tag))
  }

  return (
    <Card className="h-[800px] flex flex-col">
      <CardHeader>
        <CardTitle>Product Page Builder</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden flex flex-col">
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Select Images:</h3>
          <ScrollArea className="h-[200px] border rounded-md p-2">
            <div className="grid grid-cols-4 gap-4">
              {availableImages.map((image, index) => (
                <div 
                  key={index} 
                  className="relative cursor-pointer group"
                  onClick={() => handleImageSelection(index)}
                >
                  <Image
                    src={image.src}
                    alt={`Product Image ${index + 1}`}
                    width={100}
                    height={100}
                    className="rounded-md transition-opacity group-hover:opacity-75"
                  />
                  <Checkbox
                    checked={image.selected}
                    className="absolute top-2 left-2 bg-white"
                  />
                  <Badge 
                    className={`${getProductColor(`Product${index + 1}`)} absolute bottom-2 left-2 right-2 text-xs text-center`}
                  >
                    Product {index + 1}
                  </Badge>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Select POD Service</label>
          <Select onValueChange={setSelectedPodService}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a POD service" />
            </SelectTrigger>
            <SelectContent>
              {podServices.map(service => (
                <SelectItem key={service} value={service}>{service}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 mb-4">
          <Button variant="outline" className="w-full">Generate Product Description</Button>
          <Button variant="outline" className="w-full">Assign Price</Button>
          <Button variant="outline" className="w-full">Set Inventory</Button>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Product Tags</label>
          <div className="flex space-x-2 mb-2">
            <Input 
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a tag"
              className="flex-grow"
            />
            <Button onClick={handleAddTag}>Add</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {productTags.map(tag => (
              <Badge key={tag} className={`${getProductColor(tag)} px-2 py-1`}>
                {tag}
                <button 
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-xs font-bold"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex justify-between mt-auto">
          <Button variant="outline">Preview Product Page</Button>
          <Button>Create Product Page</Button>
        </div>
      </CardContent>
    </Card>
  )
}

