'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Edit, Settings, BarChart, DollarSign } from 'lucide-react'
import Image from 'next/image'

interface ActiveSite {
  id: string
  domain: string
  activationDate: string
  theme: string
  logo: string
}

const mockActiveSites: ActiveSite[] = [
  { id: '1', domain: 'example1.com', activationDate: '2023-06-01', theme: 'Modern', logo: '/placeholder.svg?height=40&width=40&text=Logo1' },
  { id: '2', domain: 'example2.com', activationDate: '2023-06-15', theme: 'Classic', logo: '/placeholder.svg?height=40&width=40&text=Logo2' },
  { id: '3', domain: 'example3.com', activationDate: '2023-07-01', theme: 'Minimalist', logo: '/placeholder.svg?height=40&width=40&text=Logo3' },
  { id: '4', domain: 'example4.com', activationDate: '2023-07-15', theme: 'Bold', logo: '/placeholder.svg?height=40&width=40&text=Logo4' },
]

export default function ActiveSitesPage() {
  const [selectedSite, setSelectedSite] = useState<ActiveSite | null>(null)

  const handleEdit = (column: string, site: ActiveSite) => {
    console.log(`Editing ${column} for site:`, site)
    // Implement edit functionality here
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Active Sites</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-200px)]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Domain</TableHead>
                  <TableHead>Activation Date</TableHead>
                  <TableHead>Theme</TableHead>
                  <TableHead>Logo</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockActiveSites.map((site) => (
                  <TableRow key={site.id}>
                    <TableCell>{site.domain}</TableCell>
                    <TableCell>{site.activationDate}</TableCell>
                    <TableCell>
                      {site.theme}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit('theme', site)}
                        className="ml-2"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Image
                          src={site.logo}
                          alt={`${site.domain} logo`}
                          width={40}
                          height={40}
                          className="mr-2"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit('logo', site)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedSite(site)}
                            >
                              <Settings className="h-4 w-4 mr-2" />
                              Advanced Settings
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Advanced Settings for {selectedSite?.domain}</DialogTitle>
                            </DialogHeader>
                            <div className="py-4">
                              {/* Add advanced settings content here */}
                              <p>Advanced settings for {selectedSite?.domain} will be displayed here.</p>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => console.log(`User Analytics for ${site.domain}`)}
                        >
                          User Analytics
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => console.log(`Revenue for ${site.domain}`)}
                        >
                          Revenue
                        </Button>
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

