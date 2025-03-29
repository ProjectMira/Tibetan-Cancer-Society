
import React, { useState } from 'react';
import PageLayout from '../components/PageLayout';
import { Check, Upload, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { toast } from "@/hooks/use-toast";

const Donate = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setUploadedImage(event.target.result as string);
            toast({
              title: "Success!",
              description: "Your donation receipt has been uploaded.",
            });
          }
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file.",
          variant: "destructive"
        });
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setUploadedImage(event.target.result as string);
            toast({
              title: "Success!",
              description: "Your donation receipt has been uploaded.",
            });
          }
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file.",
          variant: "destructive"
        });
      }
    }
  };

  const removeUploadedImage = () => {
    setUploadedImage(null);
  };

  return (
    <PageLayout 
      title="Support Our Cause" 
      description="Your generous donations help us continue our mission to support cancer patients and their families."
      backgroundImage="https://images.unsplash.com/photo-1615729947596-a598e5de0ab3"
    >
      <section className="py-16 bg-white">
        <div className="section-container max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Bank Transfer Details</h2>
              <Card className="p-6">
                <div className="space-y-4">
                  <p className="mb-4 text-muted-foreground">
                    Please use the following bank details to make your donation via direct transfer:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-md space-y-2">
                    <p><span className="font-medium">Bank Name:</span> Tibet National Bank</p>
                    <p><span className="font-medium">Account Name:</span> Tibetan Cancer Society</p>
                    <p><span className="font-medium">Account Number:</span> 123456789012</p>
                    <p><span className="font-medium">IFSC Code:</span> TNBL0001234</p>
                    <p><span className="font-medium">Swift Code:</span> TIBNATBNK</p>
                  </div>
                  <div className="flex items-start mt-4">
                    <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">After making the donation, upload a screenshot of your payment receipt below.</span>
                  </div>
                </div>
              </Card>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-6">Upload Payment Receipt</h2>
              {!uploadedImage ? (
                <div 
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary hover:bg-gray-50'}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-lg font-medium mb-2">Upload Your Payment Screenshot</p>
                  <p className="text-sm text-muted-foreground mb-4">Drag and drop your image here, or click to select a file</p>
                  <p className="text-xs text-muted-foreground">Supports: JPG, PNG, GIF</p>
                  <input 
                    id="file-upload" 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleFileInput} 
                  />
                </div>
              ) : (
                <div className="relative rounded-lg overflow-hidden">
                  <img 
                    src={uploadedImage} 
                    alt="Uploaded payment receipt" 
                    className="w-full h-auto" 
                  />
                  <button 
                    onClick={removeUploadedImage}
                    className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
              <p className="text-center mt-4 text-sm text-muted-foreground">
                Your donation will help us provide essential services to cancer patients in the Tibetan community.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold mb-4">Thank You for Your Support</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your contribution makes a significant difference in our ability to provide cancer awareness, 
              education, and support services to the Tibetan community. All donations are tax-deductible.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Donate;
