'use-client'

import { Button } from "@/components/ui/button"
import { useFileUpload } from "@/hooks/use-file-upload"
import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface ImageUploaderProps {
  onUpload?: (file: File | File[] | null) => void
  accept?: string
  maxSizeMB?: number
  multiple?: boolean
  label?: string
  description?: string
  showHelperText?: boolean
  initialImage?: string; 
}

export default function ImageUploader({
  onUpload,
  accept = "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
  maxSizeMB = 2,
  multiple = false,
  label = "Drop your image here",
  description = "SVG, PNG, JPG or GIF",
  showHelperText = true,
  initialImage
}: ImageUploaderProps) {
  const maxSize = maxSizeMB * 1024 * 1024

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept,
    maxSize,
    multiple,
  })

  const prevFilesRef = useRef<any | null>(null);
  const [initialPreview, setInitialPreview] = useState(initialImage || "");

  useEffect(() => {
    const currentFiles: any = multiple ? files.map(f => f.file) : files[0]?.file ?? null;

    if (JSON.stringify(prevFilesRef.current) !== JSON.stringify(currentFiles)) {
      prevFilesRef.current = currentFiles;

      if (!multiple && files.length > 1) {
        onUpload?.(null);
      } else {
        onUpload?.(currentFiles);
      }
    }
  }, [files, multiple, onUpload]);

  // Clear initialPreview if user uploads a new file
  useEffect(() => {
    if (files.length > 0 && initialPreview) {
      setInitialPreview(""); 
    }
  }, [files, initialPreview]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-[input:focus]:ring-[3px]"
      >
        <input {...getInputProps()} className="sr-only" aria-label="Upload image file" />

        {/* Preview */}
        {files.length > 0 || initialPreview ? (
          multiple ? (
            // Multiple mode (grid) - no initial image support
            <div className="flex flex-col gap-2 w-full">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 w-full">
                {files.map( file => (
                  <div key={file.id} className="relative aspect-square w-full rounded-lg overflow-hidden border">
                    <img src={file.preview} alt={file.file.name} className="h-full w-full object-cover" />
                    <button type="button" onClick={() => removeFile( file.id )}
                      className="absolute top-1 right-1 flex size-6 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                      aria-label="Remove image"
                    >
                      <XIcon className="size-3" />
                    </button>
                  </div>
                ) )}
              </div>
              <Button type="button" variant="outline" className="mt-2 self-start" onClick={openFileDialog}>
                <UploadIcon className="-ms-1 size-4 opacity-60" /> Add more
              </Button>
            </div>
          ) : (
            // Single file mode
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={files[ 0 ]?.preview || initialPreview}
                alt={files[ 0 ]?.file?.name || "Uploaded image"}
                className="mx-auto max-h-72 max-w-full rounded object-contain"
              />
              <button
                type="button"
                className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                onClick={() =>
                {
                  if ( files.length > 0 ) removeFile( files[ 0 ]?.id )
                  setInitialPreview( "" )
                  onUpload?.( null )
                }}
                aria-label="Remove image"
              >
                <XIcon className="size-4" />
              </button>
            </div>
          )
        ) : (
          // Empty state
          <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
            <div className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border" aria-hidden="true">
              <ImageIcon className="size-4 opacity-60" />
            </div>
            <p className="mb-1.5 text-sm font-medium">{label}</p>
            <p className="text-muted-foreground text-xs">{description} (max. {maxSizeMB}MB)</p>
            <Button type="button" variant="outline" className="mt-4" onClick={openFileDialog}>
              <UploadIcon className="-ms-1 size-4 opacity-60" /> Select file
            </Button>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div className="text-destructive flex items-center gap-1 text-xs" role="alert">
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[ 0 ]}</span>
        </div>
      )}

      {showHelperText && (
        <p aria-live="polite" role="region" className="text-muted-foreground mt-2 text-center text-xs">
          {multiple ? "Multiple image uploader with grid preview" : "Single image uploader with preview"}
        </p>
      )}
    </div>
  );
}