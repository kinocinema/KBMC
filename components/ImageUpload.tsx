import React, { useRef, useState } from 'react';
import { Upload, Loader2, Image as ImageIcon, Link2, X } from 'lucide-react';
import { uploadImageToStorage } from '../utils/imageUpload';

interface ImageUploadProps {
  /** Current image URL */
  value: string;
  /** Called with the new Firebase Storage download URL after a successful upload */
  onChange: (url: string) => void;
  /** Storage folder, e.g. "doctors", "news", "pages", "promotions", "insurance" */
  folder?: string;
  /** Label shown above the field */
  label?: string;
  /** Preview thumbnail height class */
  previewClassName?: string;
}

/**
 * Reusable image upload field for the Admin portal.
 * Lets admins pick an image from their computer, uploads it directly to
 * Firebase Storage (kbmc-website bucket) and stores the public URL —
 * no more manual uploads in the Firebase Console.
 * A manual URL paste option is kept as a collapsible fallback.
 */
export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  folder = 'uploads',
  label = 'Image',
  previewClassName = 'w-full h-32',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Sila pilih fail gambar (JPG, PNG, WebP, GIF).');
      return;
    }

    setUploading(true);
    try {
      const url = await uploadImageToStorage(file, folder);
      onChange(url);
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Muat naik gagal. Sila cuba lagi atau gunakan gambar yang lebih kecil.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-bold text-gray-700 mb-1">{label}</label>
      )}

      {value && (
        <div className="relative inline-block mb-2">
          <img
            src={value}
            alt="Preview"
            className={`${previewClassName} object-cover rounded-lg border border-gray-200 bg-gray-50`}
            onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.3'; }}
          />
          <button
            type="button"
            onClick={() => onChange('')}
            title="Buang gambar"
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 px-4 py-2 bg-[#006D77] text-white rounded-lg font-bold text-sm hover:bg-[#005a63] disabled:opacity-50 transition-colors"
        >
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Memuat naik...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" /> {value ? 'Tukar Gambar' : 'Muat Naik Gambar'}
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          title="Tampal URL gambar secara manual"
          className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-600 text-sm font-bold hover:bg-gray-50"
        >
          <Link2 className="w-4 h-4" /> URL
        </button>
      </div>

      {showUrlInput && (
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2 text-sm"
        />
      )}

      {!value && !uploading && (
        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
          <ImageIcon className="w-3 h-3" /> Gambar akan dimuat naik terus ke Firebase Storage
        </p>
      )}
    </div>
  );
};
