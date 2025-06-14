
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ImageUploadProps {
  currentImage?: string;
  onImageUpdate: (imageUrl: string) => void;
  fallbackText: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const ImageUpload = ({ currentImage, onImageUpdate, fallbackText, size = 'lg' }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const sizeClasses = {
    sm: 'h-16 w-16',
    md: 'h-20 w-20',
    lg: 'h-24 w-24',
    xl: 'h-32 w-32'
  };

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      onImageUpdate(data.publicUrl);
      
      toast({
        title: 'Success',
        description: 'Image uploaded successfully!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Error uploading image',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center space-x-6 animate-fade-in">
      <div className="relative group">
        <Avatar className={`${sizeClasses[size]} hover-lift cursor-pointer transition-all duration-300`}>
          <AvatarImage src={currentImage} className="object-cover" />
          <AvatarFallback className="bg-gradient-to-r from-orange-500 to-blue-600 text-white text-lg font-semibold">
            {fallbackText}
          </AvatarFallback>
        </Avatar>
        <div 
          className="absolute inset-0 bg-gray-900/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <Camera className="h-6 w-6 text-white" />
        </div>
      </div>
      
      <div className="space-y-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="hover-lift"
        >
          <Upload className="h-4 w-4 mr-2" />
          {uploading ? 'Uploading...' : 'Change Photo'}
        </Button>
        <p className="text-sm text-muted-foreground">
          JPG, PNG or GIF. Max 2MB.
        </p>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={uploadImage}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
