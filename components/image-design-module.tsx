'use client'

import { useState } from 'react'
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { DraggablePrompt } from './draggable-prompt'
import { DroppableArea } from './droppable-area'

interface Style {
  name: string;
  preview: string;
}

interface GeneratedImage {
  src: string;
  selected: boolean;
  tags: string[];
}

export function ImageDesignModule() {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([])
  const [numImages, setNumImages] = useState(1)
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [selectedPrompt, setSelectedPrompt] = useState('')
  const [editablePrompt, setEditablePrompt] = useState('')
  const [newTag, setNewTag] = useState('')
  const [bulkTag, setBulkTag] = useState('')

  const styles: Style[] = [
    { name: 'Modern', preview: '/placeholder.svg?height=50&width=50&text=Modern' },
    { name: 'Vintage', preview: '/placeholder.svg?height=50&width=50&text=Vintage' },
    { name: 'Minimalist', preview: '/placeholder.svg?height=50&width=50&text=Minimalist' },
    { name: 'Bold', preview: '/placeholder.svg?height=50&width=50&text=Bold' },
  ]

  const prompts = [
    "Create a futuristic cityscape with flying cars",
    "Generate a serene landscape with mountains and a lake",
    "Design a cute and playful cartoon character",
    "Craft an abstract representation of emotions",
    "Illustrate a busy marketplace in a medieval fantasy setting"
  ]

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id === 'droppable-area') {
      const promptIndex = parseInt(event.active.id.split('-')[1])
      setSelectedPrompt(prompts[promptIndex])
      setEditablePrompt(prompts[promptIndex])
    }
  }

  const generateImages = () => {
    setLoading(true)
    setProgress(0)
    setGeneratedImages([])

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          setLoading(false)
          // Generate placeholder images
          setGeneratedImages(Array.from({ length: numImages }, (_, i) => ({
            src: `/placeholder.svg?height=300&width=300&text=Generated Image ${i + 1}`,
            selected: false,
            tags: []
          })))
          return 100
        }
        return prevProgress + 10
      })
    }, 500)
  }

  const toggleImageSelection = (index: number) => {
    setGeneratedImages(prevImages => 
      prevImages.map((img, i) => 
        i === index ? { ...img, selected: !img.selected } : img
      )
    )
  }

  const addTagToImage = (index: number, tag: string) => {
    if (tag.trim() !== '') {
      setGeneratedImages(prevImages =>
        prevImages.map((img, i) =>
          i === index ? { ...img, tags: [...new Set([...img.tags, tag.trim()])] } : img
        )
      )
    }
  }

  const removeTagFromImage = (index: number, tagToRemove: string) => {
    setGeneratedImages(prevImages =>
      prevImages.map((img, i) =>
        i === index ? { ...img, tags: img.tags.filter(tag => tag !== tagToRemove) } : img
      )
    )
  }

  const handleBulkTag = () => {
    if (bulkTag.trim() !== '') {
      setGeneratedImages(prevImages =>
        prevImages.map(img =>
          img.selected ? { ...img, tags: [...new Set([...img.tags, bulkTag.trim()])] } : img
        )
      )
      setBulkTag('')
    }
  }

  return (
    <Card className="h-[800px] flex flex-col">
      <CardHeader>
        <CardTitle>Image Designer</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden flex flex-col">
        <DndContext onDragEnd={handleDragEnd}>
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Select a prompt:</h3>
            <ScrollArea className="h-24 border rounded-md p-2">
              {prompts.map((prompt, index) => (
                <DraggablePrompt key={index} id={`prompt-${index}`} prompt={prompt} />
              ))}
            </ScrollArea>
          </div>
          <DroppableArea id="droppable-area">
            {selectedPrompt ? (
              <Input
                value={editablePrompt}
                onChange={(e) => setEditablePrompt(e.target.value)}
                className="w-full"
              />
            ) : (
              <p className="text-sm text-gray-500">Drag and drop a prompt here</p>
            )}
          </DroppableArea>
        </DndContext>
        <div className="space-y-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Select Style</label>
            <div className="grid grid-cols-4 gap-2">
              {styles.map((style) => (
                <div
                  key={style.name}
                  className={`cursor-pointer border rounded-md p-2 ${selectedStyle === style.name ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => setSelectedStyle(style.name)}
                >
                  <Image
                    src={style.preview}
                    alt={style.name}
                    width={50}
                    height={50}
                    className="mx-auto mb-1"
                  />
                  <p className="text-xs text-center">{style.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              min="1"
              max="10"
              value={numImages}
              onChange={(e) => setNumImages(parseInt(e.target.value))}
              className="w-20"
            />
            <span>Number of images to generate</span>
          </div>
          <Button onClick={generateImages} disabled={loading}>Generate Images</Button>
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <Input
            placeholder="Add tags to selected images"
            value={bulkTag}
            onChange={(e) => setBulkTag(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleBulkTag();
              }
            }}
            className="flex-grow"
          />
          <Button onClick={handleBulkTag}>Bulk Tag</Button>
        </div>
        <div className="flex-1 relative overflow-hidden">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full max-w-xs space-y-4">
                <Progress value={progress} className="w-full" />
                <p className="text-center">Generating images...</p>
              </div>
            </div>
          ) : generatedImages.length > 0 ? (
            <ScrollArea className="h-full">
              <div className="space-y-4 p-4">
                <div className="grid grid-cols-2 gap-4">
                  {generatedImages.map((image, index) => (
                    <div key={index} className="relative border rounded-md p-2">
                      <Image
                        src={image.src}
                        alt={`Generated Image ${index + 1}`}
                        width={300}
                        height={300}
                        className="rounded-md w-full h-auto"
                      />
                      <Checkbox
                        checked={image.selected}
                        onCheckedChange={() => toggleImageSelection(index)}
                        className="absolute top-4 left-4 bg-white"
                      />
                      <div className="mt-2">
                        <div className="flex flex-wrap gap-1 mb-2">
                          {image.tags.map((tag, tagIndex) => (
                            <Badge 
                              key={tagIndex} 
                              variant="secondary"
                              className="px-2 py-1 text-xs"
                            >
                              {tag}
                              <button
                                onClick={() => removeTagFromImage(index, tag)}
                                className="ml-1 text-xs font-bold"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center">
                          <Input
                            placeholder="Add a tag"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                addTagToImage(index, newTag);
                                setNewTag('');
                              }
                            }}
                            className="flex-grow mr-2"
                          />
                          <Button 
                            onClick={() => {
                              addTagToImage(index, newTag);
                              setNewTag('');
                            }}
                            size="sm"
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <p>No images generated yet</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

