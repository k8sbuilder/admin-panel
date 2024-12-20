'use client'

import { useState } from 'react'
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { DraggablePrompt } from './draggable-prompt'
import { DroppableArea } from './droppable-area'

interface GeneratedLogo {
  src: string;
  selected: boolean;
}

export function LogoModule() {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [generatedLogos, setGeneratedLogos] = useState<GeneratedLogo[]>([])
  const [numLogos, setNumLogos] = useState(1)
  const [selectedPrompt, setSelectedPrompt] = useState('')
  const [editablePrompt, setEditablePrompt] = useState('')
  const [logoTags, setLogoTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')

  const prompts = [
    "Create a minimalist logo for a tech company",
    "Design a playful logo for a children's toy brand",
    "Craft an elegant logo for a luxury fashion label",
    "Generate a nature-inspired logo for an eco-friendly product",
    "Develop a bold logo for a sports team"
  ]

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id === 'droppable-area') {
      const promptIndex = parseInt(event.active.id.split('-')[1])
      setSelectedPrompt(prompts[promptIndex])
      setEditablePrompt(prompts[promptIndex])
    }
  }

  const generateLogos = () => {
    setLoading(true)
    setProgress(0)
    setGeneratedLogos([])

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          setLoading(false)
          // Generate placeholder logos
          setGeneratedLogos(Array.from({ length: numLogos }, (_, i) => ({
            src: `/placeholder.svg?height=200&width=200&text=Generated Logo ${i + 1}`,
            selected: false
          })))
          return 100
        }
        return prevProgress + 10
      })
    }, 500)
  }

  const toggleLogoSelection = (index: number) => {
    setGeneratedLogos(prevLogos => 
      prevLogos.map((logo, i) => 
        i === index ? { ...logo, selected: !logo.selected } : logo
      )
    )
  }

  const handleAddTag = () => {
    if (newTag && !logoTags.includes(newTag)) {
      setLogoTags([...logoTags, newTag])
      setNewTag('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setLogoTags(logoTags.filter(t => t !== tag))
  }

  return (
    <Card className="h-[800px] flex flex-col">
      <CardHeader>
        <CardTitle>Logo Creator</CardTitle>
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
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              min="1"
              max="10"
              value={numLogos}
              onChange={(e) => setNumLogos(parseInt(e.target.value))}
              className="w-20"
            />
            <span>Number of logos to generate</span>
          </div>
          <Button onClick={generateLogos} disabled={loading}>Generate Logos</Button>
        </div>
        <div className="flex-1 relative">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full max-w-xs space-y-4">
                <Progress value={progress} className="w-full" />
                <p className="text-center">Generating logos...</p>
              </div>
            </div>
          ) : generatedLogos.length > 0 ? (
            <ScrollArea className="h-full">
              <div className="grid grid-cols-3 gap-4 p-4">
                {generatedLogos.map((logo, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={logo.src}
                      alt={`Generated Logo ${index + 1}`}
                      width={200}
                      height={200}
                      className="rounded-md"
                    />
                    <Checkbox
                      checked={logo.selected}
                      onCheckedChange={() => toggleLogoSelection(index)}
                      className="absolute top-2 left-2 bg-white"
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <p>No logos generated yet</p>
            </div>
          )}
        </div>
        <div className="mt-4 mb-4">
          <label className="block text-sm font-medium mb-1">Logo Tags</label>
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
            {logoTags.map(tag => (
              <Badge key={tag} variant="secondary" className="px-2 py-1">
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
        <div className="mt-4">
          <Button variant="outline" className="w-full">Save Selected Logos</Button>
        </div>
      </CardContent>
    </Card>
  )
}

