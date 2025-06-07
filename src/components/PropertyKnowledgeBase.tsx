
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, FileText, Download, Trash2, Eye, Plus, FolderOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface KnowledgeFile {
  id: string;
  file_name: string;
  file_type: string;
  file_url: string;
  file_size?: number;
  description?: string;
  category: string;
  created_at: string;
}

interface PropertyKnowledgeBaseProps {
  propertyId: string;
  isAgent?: boolean;
}

export const PropertyKnowledgeBase = ({ propertyId, isAgent = false }: PropertyKnowledgeBaseProps) => {
  const [knowledgeFiles, setKnowledgeFiles] = useState<KnowledgeFile[]>([
    {
      id: '1',
      file_name: 'Property_Brochure.pdf',
      file_type: 'application/pdf',
      file_url: '#',
      file_size: 2048000,
      description: 'Detailed property brochure with all amenities',
      category: 'brochures',
      created_at: '2024-01-15'
    },
    {
      id: '2',
      file_name: 'Floor_Plans.pdf',
      file_type: 'application/pdf',
      file_url: '#',
      file_size: 1536000,
      description: 'Architectural floor plans for all levels',
      category: 'floor_plans',
      created_at: '2024-01-15'
    },
    {
      id: '3',
      file_name: 'HOA_Documents.pdf',
      file_type: 'application/pdf',
      file_url: '#',
      file_size: 1024000,
      description: 'Homeowners association rules and regulations',
      category: 'legal',
      created_at: '2024-01-15'
    }
  ]);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const categories = [
    { value: 'all', label: 'All Files', icon: FolderOpen },
    { value: 'brochures', label: 'Brochures', icon: FileText },
    { value: 'floor_plans', label: 'Floor Plans', icon: FileText },
    { value: 'legal', label: 'Legal Documents', icon: FileText },
    { value: 'inspections', label: 'Inspections', icon: FileText },
    { value: 'photos', label: 'Additional Photos', icon: FileText },
    { value: 'other', label: 'Other', icon: FileText }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredFiles = selectedCategory === 'all' 
    ? knowledgeFiles 
    : knowledgeFiles.filter(file => file.category === selectedCategory);

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown size';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    
    try {
      // Simulate file upload
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const newFile: KnowledgeFile = {
          id: Date.now().toString() + i,
          file_name: file.name,
          file_type: file.type,
          file_url: '#',
          file_size: file.size,
          description: '',
          category: 'other',
          created_at: new Date().toISOString()
        };
        
        setKnowledgeFiles(prev => [...prev, newFile]);
      }
      
      toast({
        title: "Files uploaded successfully",
        description: `${files.length} file(s) added to the knowledge base.`,
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your files.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteFile = (fileId: string) => {
    setKnowledgeFiles(prev => prev.filter(file => file.id !== fileId));
    toast({
      title: "File deleted",
      description: "The file has been removed from the knowledge base.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Property Knowledge Base</h2>
          <p className="text-gray-600 mt-1">Documents and files that help our AI provide better assistance</p>
        </div>
        <Badge variant="secondary" className="text-sm">
          {knowledgeFiles.length} files
        </Badge>
      </div>

      {isAgent && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="mr-2" size={20} />
              Upload Files
            </CardTitle>
            <CardDescription>
              Add documents, brochures, floor plans, and other files to enhance the AI's knowledge about this property.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-orange-400 transition-colors">
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
                id="knowledge-file-upload"
                disabled={isUploading}
              />
              <label htmlFor="knowledge-file-upload" className="cursor-pointer">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600 font-medium">
                    {isUploading ? 'Uploading...' : 'Click to upload files or drag and drop'}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    PDF, Word, Text, Images up to 10MB each
                  </p>
                </div>
              </label>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid grid-cols-4 lg:grid-cols-7">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <TabsTrigger key={category.value} value={category.value} className="text-xs">
                <Icon size={14} className="mr-1" />
                {category.label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          {filteredFiles.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No files found</h3>
                <p className="text-gray-600">
                  {selectedCategory === 'all' 
                    ? 'No files have been uploaded to this property\'s knowledge base yet.'
                    : `No files in the ${categories.find(c => c.value === selectedCategory)?.label} category.`
                  }
                </p>
                {isAgent && (
                  <Button className="mt-4" onClick={() => document.getElementById('knowledge-file-upload')?.click()}>
                    <Plus className="mr-2" size={16} />
                    Upload First File
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredFiles.map((file) => (
                <Card key={file.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        <FileText className="text-gray-400" size={20} />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">{file.file_name}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                            <span>{formatFileSize(file.file_size)}</span>
                            <span>•</span>
                            <span>Uploaded {new Date(file.created_at).toLocaleDateString()}</span>
                            <span>•</span>
                            <Badge variant="outline" className="text-xs">
                              {categories.find(c => c.value === file.category)?.label || 'Other'}
                            </Badge>
                          </div>
                          {file.description && (
                            <p className="text-sm text-gray-600 mt-1">{file.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye size={16} className="mr-1" />
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download size={16} className="mr-1" />
                          Download
                        </Button>
                        {isAgent && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDeleteFile(file.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={16} />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
