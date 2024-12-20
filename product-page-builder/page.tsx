'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'

// Mock data
const imageLibrary = [
  { id: '1', src: '/placeholder.svg?height=100&width=100&text=Product1', name: 'Product 1' },
  { id: '2', src: '/placeholder.svg?height=100&width=100&text=Product2', name: 'Product 2' },
  { id: '3', src: '/placeholder.svg?height=100&width=100&text=Product3', name: 'Product 3' },
  { id: '4', src: '/placeholder.svg?height=100&width=100&text=Product4', name: 'Product 4' },
]

const podServices = ['Printful', 'Printify', 'Gooten', 'Scalable Press']

const domains = ['example1.com', 'example2.com', 'example3.com']

export default function ProductPageBuilderPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [productDescription, setProductDescription] = useState('')
  const [price, setPrice] = useState('')
  const [selectedPodService, setSelectedPodService] = useState('')
  const [selectedDomain, setSelectedDomain] = useState('')
  const [descriptionPrompt, setDescriptionPrompt] = useState('')

  const handleImageSelect = (src: string) => {
    setSelectedImage(src)
  }

  const handleGenerateDescription = () => {
    // In a real application, this would call an API to generate the description
    console.log('Generating description from prompt:', descriptionPrompt)
    setProductDescription('This is a generated product description based on your prompt.')
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Product Page Builder</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Select Product Image</h3>
              <ScrollArea className="h-[300px] border rounded-md p-2">
                <div className="grid grid-cols-2 gap-2">
                  {imageLibrary.map((image) => (
                    <div
                      key={image.id}
                      className={`cursor-pointer border rounded p-2 ${selectedImage === image.src ? 'border-blue-500' : ''}`}
                      onClick={() => handleImageSelect(image.src)}
                    >
                      <Image src={image.src} alt={image.name} width={100} height={100} />
                      <p className="text-xs mt-1 text-center">{image.name}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Product Description</h3>
              <Textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Enter product description"
                className="h-[200px] mb-2"
              />
              <div className="flex space-x-2">
                <Input
                  value={descriptionPrompt}
                  onChange={(e) => setDescriptionPrompt(e.target.value)}
                  placeholder="Enter prompt for description generation"
                />
                <Button onClick={handleGenerateDescription}>Generate</Button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Price</h3>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Print on Demand Service</h3>
              <Select onValueChange={setSelectedPodService}>
                <SelectTrigger>
                  <SelectValue placeholder="Select POD service" />
                </SelectTrigger>
                <SelectContent>
                  {podServices.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Tag with Domain</h3>
            <Select onValueChange={setSelectedDomain}>
              <SelectTrigger>
                <SelectValue placeholder="Select domain" />
              </SelectTrigger>
              <SelectContent>
                {domains.map((domain) => (
                  <SelectItem key={domain} value={domain}>
                    {domain}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mt-6">
            <Button>Create Product Page</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

