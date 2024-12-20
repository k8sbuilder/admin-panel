'use client'
import { useState } from 'react'
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Checkbox } from '@/components/ui/checkbox'
import { DraggablePrompt } from './draggable-prompt'
import { DroppableArea } from './droppable-area'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface GeneratedDomain {
  name: string;
  available: boolean;
  checked: boolean;
}

export function DomainModule() {
  const [selectedPrompt, setSelectedPrompt] = useState('')
  const [editablePrompt, setEditablePrompt] = useState('')
  const [generatedDomains, setGeneratedDomains] = useState<GeneratedDomain[]>([])
  const [numDomainsToGenerate, setNumDomainsToGenerate] = useState(20)
  const [prompts, setPrompts] = useState([
    "Create a domain name for a tech startup focusing on AI",
    "Generate a catchy domain for a fitness app",
    "Invent a domain name for an eco-friendly product line",
    "Design a domain for a gourmet food delivery service",
    "Craft a domain name for a virtual reality gaming platform"
  ])

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id === 'droppable-area') {
      const promptIndex = parseInt(event.active.id.split('-')[1])
      setSelectedPrompt(prompts[promptIndex])
      setEditablePrompt(prompts[promptIndex])
    }
  }

  const generateDomains = () => {
    const newDomains = Array.from({ length: numDomainsToGenerate }, (_, i) => ({
      name: `generated-domain-${i + 1}.com`,
      available: Math.random() > 0.5,
      checked: false
    }))
    setGeneratedDomains(newDomains)
  }

  const toggleAllDomains = (checked: boolean) => {
    setGeneratedDomains(domains => domains.map(domain => ({ ...domain, checked })))
  }

  const toggleDomain = (index: number) => {
    setGeneratedDomains(domains => 
      domains.map((domain, i) => 
        i === index ? { ...domain, checked: !domain.checked } : domain
      )
    )
  }

  const removeNonAvailableDomains = () => {
    setGeneratedDomains(domains => domains.filter(domain => domain.available))
  }

  return (
    <Card className="h-[800px] flex flex-col">
      <CardHeader>
        <CardTitle>Domain Buyer</CardTitle>
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
        <div className="space-y-4 mb-4 flex items-center space-x-2">
          <Button onClick={generateDomains}>Generate Domains</Button>
          <Input 
            type="number" 
            value={numDomainsToGenerate} 
            onChange={(e) => setNumDomainsToGenerate(Number(e.target.value))}
            className="w-20"
          />
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium">Generated Domains:</h3>
            <div>
              <Button variant="outline" size="sm" className="mr-2" onClick={() => toggleAllDomains(true)}>Check All</Button>
              <Button variant="outline" size="sm" className="mr-2" onClick={() => toggleAllDomains(false)}>Uncheck All</Button>
              <Button variant="outline" size="sm" onClick={removeNonAvailableDomains}>Remove Unavailable</Button>
            </div>
          </div>
          <ScrollArea className="h-[350px] border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Domain Name</TableHead>
                  <TableHead>Availability</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {generatedDomains.map((domain, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Checkbox 
                        id={`domain-${index}`} 
                        checked={domain.checked}
                        onCheckedChange={() => toggleDomain(index)}
                      />
                    </TableCell>
                    <TableCell>{domain.name}</TableCell>
                    <TableCell>
                      <span className={domain.available ? "text-green-600" : "text-red-600"}>
                        {domain.available ? "Available" : "Unavailable"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
        <div className="mt-4">
          <Input placeholder="Enter domain name" />
        </div>
        <div className="mt-4 space-x-2">
          <Button variant="outline">Check Availability</Button>
          <Button variant="outline">Save Selected</Button>
          <Button variant="outline">Purchase Selected</Button>
        </div>
      </CardContent>
    </Card>
  )
}

