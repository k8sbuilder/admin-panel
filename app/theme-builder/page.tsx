'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface Theme {
  id: string
  name: string
  primaryColor: string
  secondaryColor: string
  darkModeColor: string
  lightModeColor: string
  primaryFont: string
  secondaryFont: string
  cssPath: string
  assetsDir: string
  layout: string[]
}

const themes: Theme[] = [
  {
    id: '1',
    name: 'Modern',
    primaryColor: '#007bff',
    secondaryColor: '#6c757d',
    darkModeColor: '#121212',
    lightModeColor: '#ffffff',
    primaryFont: 'Roboto',
    secondaryFont: 'Open Sans',
    cssPath: '/themes/modern/styles.css',
    assetsDir: '/themes/modern/assets',
    layout: ['Home', 'Products', 'About', 'Cart', 'Contact']
  },
  {
    id: '2',
    name: 'Classic',
    primaryColor: '#28a745',
    secondaryColor: '#ffc107',
    darkModeColor: '#1a1a1a',
    lightModeColor: '#f8f9fa',
    primaryFont: 'Merriweather',
    secondaryFont: 'Lato',
    cssPath: '/themes/classic/styles.css',
    assetsDir: '/themes/classic/assets',
    layout: ['Home', 'Shop', 'About Us', 'Cart', 'Contact Us']
  },
  {
    id: '3',
    name: 'Minimalist',
    primaryColor: '#17a2b8',
    secondaryColor: '#f8f9fa',
    darkModeColor: '#2c3e50',
    lightModeColor: '#ecf0f1',
    primaryFont: 'Montserrat',
    secondaryFont: 'Raleway',
    cssPath: '/themes/minimalist/styles.css',
    assetsDir: '/themes/minimalist/assets',
    layout: ['Home', 'Catalog', 'About', 'Cart', 'Contact']
  },
]

export default function ThemeBuilderPage() {
  const [selectedTheme, setSelectedTheme] = useState<Theme>(themes[0])
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleThemeSelect = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId)
    if (theme) {
      setSelectedTheme(theme)
    }
  }

  const handleColorChange = (colorType: keyof Theme, value: string) => {
    setSelectedTheme(prev => ({ ...prev, [colorType]: value }))
  }

  const handleFontChange = (fontType: keyof Theme, value: string) => {
    setSelectedTheme(prev => ({ ...prev, [fontType]: value }))
  }

  const handleSaveChanges = () => {
    console.log('Saving theme changes:', selectedTheme)
    // In a real application, this would update the theme in the database
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Theme Builder</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Select Theme</h3>
              <Select onValueChange={handleThemeSelect} defaultValue={selectedTheme.id}>
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  {themes.map((theme) => (
                    <SelectItem key={theme.id} value={theme.id}>
                      {theme.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-4 space-y-4">
                <div>
                  <Label htmlFor="themeName">Theme Name</Label>
                  <Input
                    id="themeName"
                    value={selectedTheme.name}
                    onChange={(e) => setSelectedTheme(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex items-center mt-1">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={selectedTheme.primaryColor}
                      onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                      className="w-12 h-12 p-1 mr-2"
                    />
                    <Input
                      value={selectedTheme.primaryColor}
                      onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                      className="flex-grow"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex items-center mt-1">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={selectedTheme.secondaryColor}
                      onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                      className="w-12 h-12 p-1 mr-2"
                    />
                    <Input
                      value={selectedTheme.secondaryColor}
                      onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                      className="flex-grow"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="darkModeColor">Dark Mode Color</Label>
                  <div className="flex items-center mt-1">
                    <Input
                      id="darkModeColor"
                      type="color"
                      value={selectedTheme.darkModeColor}
                      onChange={(e) => handleColorChange('darkModeColor', e.target.value)}
                      className="w-12 h-12 p-1 mr-2"
                    />
                    <Input
                      value={selectedTheme.darkModeColor}
                      onChange={(e) => handleColorChange('darkModeColor', e.target.value)}
                      className="flex-grow"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="lightModeColor">Light Mode Color</Label>
                  <div className="flex items-center mt-1">
                    <Input
                      id="lightModeColor"
                      type="color"
                      value={selectedTheme.lightModeColor}
                      onChange={(e) => handleColorChange('lightModeColor', e.target.value)}
                      className="w-12 h-12 p-1 mr-2"
                    />
                    <Input
                      value={selectedTheme.lightModeColor}
                      onChange={(e) => handleColorChange('lightModeColor', e.target.value)}
                      className="flex-grow"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="primaryFont">Primary Font</Label>
                  <Input
                    id="primaryFont"
                    value={selectedTheme.primaryFont}
                    onChange={(e) => handleFontChange('primaryFont', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="secondaryFont">Secondary Font</Label>
                  <Input
                    id="secondaryFont"
                    value={selectedTheme.secondaryFont}
                    onChange={(e) => handleFontChange('secondaryFont', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <Button onClick={handleSaveChanges}>Save Changes</Button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Theme Preview</h3>
              <div 
                className={`border rounded-md p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
                style={{
                  backgroundColor: isDarkMode ? selectedTheme.darkModeColor : selectedTheme.lightModeColor,
                  color: isDarkMode ? selectedTheme.lightModeColor : selectedTheme.darkModeColor,
                }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 style={{ fontFamily: selectedTheme.primaryFont, color: selectedTheme.primaryColor }}>
                    {selectedTheme.name} Theme
                  </h2>
                  <div className="flex items-center">
                    <Label htmlFor="darkModeToggle" className="mr-2">Dark Mode</Label>
                    <Switch
                      id="darkModeToggle"
                      checked={isDarkMode}
                      onCheckedChange={setIsDarkMode}
                    />
                  </div>
                </div>
                <p style={{ fontFamily: selectedTheme.secondaryFont }}>
                  This is a preview of your theme. The primary color is used for headings and important elements.
                  The secondary color is used for accents and highlights.
                </p>
                <div className="mt-4">
                  <Button style={{ backgroundColor: selectedTheme.primaryColor, color: selectedTheme.lightModeColor }}>
                    Primary Button
                  </Button>
                  <Button 
                    variant="outline" 
                    className="ml-2"
                    style={{ 
                      borderColor: selectedTheme.secondaryColor, 
                      color: selectedTheme.secondaryColor
                    }}
                  >
                    Secondary Button
                  </Button>
                </div>
              </div>
              <h3 className="text-lg font-semibold mt-4 mb-2">Layout</h3>
              <div className="flex space-x-2">
                {selectedTheme.layout.map((item, index) => (
                  <div 
                    key={index}
                    className="border rounded-md p-2 text-sm"
                    style={{ 
                      backgroundColor: selectedTheme.secondaryColor,
                      color: selectedTheme.lightModeColor
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
              <h3 className="text-lg font-semibold mt-4 mb-2">Theme Details</h3>
              <ScrollArea className="h-[200px] border rounded-md p-2">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Property</TableHead>
                      <TableHead>Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>CSS Path</TableCell>
                      <TableCell>{selectedTheme.cssPath}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Assets Directory</TableCell>
                      <TableCell>{selectedTheme.assetsDir}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

