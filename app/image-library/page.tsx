'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Pencil, Trash2 } from 'lucide-react'
import Image from 'next/image'

interface ImageItem {
  id: string
  src: string
  tags: string[]
}

const mockImages: ImageItem[] = Array.from({ length: 20 }, (_, i) => ({
  id: `img-${i + 1}`,
  src: `/placeholder.svg?height=200&width=200&text=Image${i + 1}`,
  tags: ['tag1', 'tag2', 'tag3'].sort(() => 0.5 - Math.random()).slice(0, 2)
}))

const allTags = Array.from(new Set(mockImages.flatMap(img => img.tags)))

const getTagColor = (tag: string) => {
  const colors = [
    'bg-red-100 text-red-800',
    'bg-blue-100 text-blue-800',
    'bg-green-100 text-green-800',
    'bg-yellow-100 text-yellow-800',
    'bg-purple-100 text-purple-800',
    'bg-pink-100 text-pink-800',
  ]
  return colors[allTags.indexOf(tag) % colors.length]
}

export default function ImageLibraryPage() {
  const [images, setImages] = useState<ImageItem[]>(mockImages)
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [filterTag, setFilterTag] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredAndSortedImages = images
    .filter(img => !filterTag || img.tags.includes(filterTag))
    .filter(img => img.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    .sort((a, b) => {
      const aId = parseInt(a.id.split('-')[1])
      const bId = parseInt(b.id.split('-')[1])
      return sortOrder === 'asc' ? aId - bId : bId - aId
    })

  const handleSelectAll = () => {
    if (selectedImages.length === filteredAndSortedImages.length) {
      setSelectedImages([])
    } else {
      setSelectedImages(filteredAndSortedImages.map(img => img.id))
    }
  }

  const handleSelectImage = (id: string) => {
    setSelectedImages(prev =>
      prev.includes(id) ? prev.filter(imgId => imgId !== id) : [...prev, id]
    )
  }

  const handleDelete = () => {
    setImages(prev => prev.filter(img => !selectedImages.includes(img.id)))
    setSelectedImages([])
  }

  const handleEdit = (id: string) => {
    console.log(`Editing image with id: ${id}`)
    // Implement edit functionality here
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Image Library</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="flex space-x-2">
              <Select onValueChange={(value) => setFilterTag(value === 'all' ? null : value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tags</SelectItem>
                  {allTags.map(tag => (
                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => setSortOrder(value as 'asc' | 'desc')}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Ascending</SelectItem>
                  <SelectItem value="desc">Descending</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Search tags"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[200px]"
              />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleSelectAll}>
                {selectedImages.length === filteredAndSortedImages.length ? 'Deselect All' : 'Select All'}
              </Button>
              <Button variant="destructive" onClick={handleDelete} disabled={selectedImages.length === 0}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Selected
              </Button>
            </div>
          </div>
          <ScrollArea className="h-[calc(100vh-250px)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredAndSortedImages.map((image) => (
                <div key={image.id} className="relative group">
                  <Image
                    src={image.src}
                    alt={`Image ${image.id}`}
                    width={200}
                    height={200}
                    className="rounded-md"
                  />
                  <div className="absolute top-2 left-2">
                    <Checkbox
                      checked={selectedImages.includes(image.id)}
                      onCheckedChange={() => handleSelectImage(image.id)}
                    />
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1">
                    {image.tags.map((tag, index) => (
                      <Badge key={index} className={getTagColor(tag)}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleEdit(image.id)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

