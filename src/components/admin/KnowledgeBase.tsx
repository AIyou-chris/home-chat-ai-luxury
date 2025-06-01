
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FolderPlus, FileText, Upload, Search } from 'lucide-react';

export const KnowledgeBase = () => {
  const [selectedProject, setSelectedProject] = useState('default');
  const [searchTerm, setSearchTerm] = useState('');

  const projects = [
    { id: 'default', name: 'General Knowledge', description: 'Common real estate information' },
    { id: 'luxury', name: 'Luxury Properties', description: 'High-end property information' },
    { id: 'commercial', name: 'Commercial Real Estate', description: 'Business property data' }
  ];

  const knowledgeItems = [
    { id: 1, title: 'Property Pricing Guidelines', type: 'document', project: 'default' },
    { id: 2, title: 'Market Analysis Templates', type: 'document', project: 'luxury' },
    { id: 3, title: 'Client Communication Scripts', type: 'text', project: 'default' }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Knowledge Base Management</h1>
        <p className="text-gray-600">Manage AI knowledge for different projects and property types</p>
      </div>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="browse">Browse Knowledge</TabsTrigger>
          <TabsTrigger value="upload">Upload Content</TabsTrigger>
          <TabsTrigger value="projects">Manage Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search knowledge base..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Button variant="outline">
              <Search className="mr-2" size={16} />
              Search
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {knowledgeItems.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.type} • {item.project}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="outline">Delete</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Content</CardTitle>
              <CardDescription>Add documents, text, or files to the knowledge base</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Project</label>
                <select className="w-full p-2 border rounded-md">
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Content Title</label>
                <Input placeholder="Enter a descriptive title..." />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Content Type</label>
                <select className="w-full p-2 border rounded-md">
                  <option value="document">Document</option>
                  <option value="text">Text Content</option>
                  <option value="faq">FAQ</option>
                  <option value="template">Template</option>
                </select>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
                <Button variant="outline">Choose Files</Button>
              </div>

              <Button className="w-full">Upload Content</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Knowledge Projects</h2>
            <Button>
              <FolderPlus className="mr-2" size={16} />
              New Project
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="outline">View Content</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
