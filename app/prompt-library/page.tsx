'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Prompt {
  id: string
  body: string
  creationDate: string
  tags: string[]
}

const mockPrompts: Prompt[] = [
  { id: '1', body: 'Create a logo for a tech startup', creationDate: '2023-06-01', tags: ['logo', 'tech'] },
  { id: '2', body: 'Design a landing page for a fitness app', creationDate: '2023-06-15', tags: ['web design', 'fitness'] },
  { id: '3', body: 'Write a product description for an eco-friendly water bottle', creationDate: '2023-07-01', tags: ['copywriting', 'eco-friendly'] },
]

export default function PromptLibraryPage() {
  const [newPrompt, setNewPrompt] = useState('')
  const [newTag, setNewTag] = useState('')
  const [prompts, setPrompts] = useState<Prompt[]>(mockPrompts)

  const handleCreatePrompt = () => {
    if (newPrompt.trim()) {
      const newPromptObj: Prompt = {
        id: (prompts.length + 1).toString(),
        body: newPrompt.trim(),
        creationDate: new Date().toISOString().split('T')[0],
        tags: newTag.trim() ? [newTag.trim()] : [],
      }
      setPrompts([...prompts, newPromptObj])
      setNewPrompt('')
      setNewTag('')
    }
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Prompt Library</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 space-y-2">
            <Input
              placeholder="Enter new prompt"
              value={newPrompt}
              onChange={(e) => setNewPrompt(e.target.value)}
            />
            <div className="flex space-x-2">
              <Input
                placeholder="Add tag (optional)"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
              />
              <Button onClick={handleCreatePrompt}>Create Prompt</Button>
            </div>
          </div>
          <ScrollArea className="h-[calc(100vh-300px)]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Prompt</TableHead>
                  <TableHead>Creation Date</TableHead>
                  <TableHead>Tags</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prompts.map((prompt) => (
                  <TableRow key={prompt.id}>
                    <TableCell>{prompt.body}</TableCell>
                    <TableCell>{prompt.creationDate}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {prompt.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

