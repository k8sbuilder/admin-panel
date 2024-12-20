'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Settings } from 'lucide-react'

interface Domain {
  id: string
  name: string
  status: 'active' | 'inactive' | 'archived'
  statusChangeDate: string
}

const mockDomains: Domain[] = [
  { id: '1', name: 'example1.com', status: 'active', statusChangeDate: '2023-06-01' },
  { id: '2', name: 'example2.com', status: 'inactive', statusChangeDate: '2023-06-15' },
  { id: '3', name: 'example3.com', status: 'archived', statusChangeDate: '2023-07-01' },
  { id: '4', name: 'example4.com', status: 'active', statusChangeDate: '2023-07-15' },
  { id: '5', name: 'example5.com', status: 'inactive', statusChangeDate: '2023-08-01' },
]

const getStatusColor = (status: Domain['status']) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800'
    case 'inactive':
      return 'bg-red-100 text-red-800'
    case 'archived':
      return 'bg-purple-100 text-purple-800'
  }
}

export default function DomainLibraryPage() {
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null)

  const handleAdvancedSettings = (domain: Domain) => {
    setSelectedDomain(domain)
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Domain Library</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-200px)]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Domain Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Status Change Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockDomains.map((domain) => (
                  <TableRow key={domain.id}>
                    <TableCell>{domain.name}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(domain.status)}>
                        {domain.status.charAt(0).toUpperCase() + domain.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{domain.statusChangeDate}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAdvancedSettings(domain)}
                          >
                            <Settings className="h-4 w-4 mr-2" />
                            Advanced Settings
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Advanced Settings for {selectedDomain?.name}</DialogTitle>
                          </DialogHeader>
                          <div className="py-4">
                            {/* Add advanced settings content here */}
                            <p>Advanced settings for {selectedDomain?.name} will be displayed here.</p>
                            <p>Current Status: {selectedDomain?.status}</p>
                            <p>Last Status Change: {selectedDomain?.statusChangeDate}</p>
                          </div>
                        </DialogContent>
                      </Dialog>
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

