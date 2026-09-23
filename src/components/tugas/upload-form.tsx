"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Upload, X, FileText, Image as ImageIcon } from "lucide-react";

interface UploadFormProps {
  maxFiles?: number;
  maxSizeMB?: number;
  acceptedTypes?: string[];
  onUpload?: (files: File[]) => void;
  label?: string;
}

export function UploadForm({
  maxFiles = 5,
  maxSizeMB = 10,
  acceptedTypes = [".pdf", ".jpg", ".jpeg", ".png", ".webp"],
  onUpload,
  label = "Upload File Jawaban",
}: UploadFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles) return;
      const validFiles = Array.from(newFiles).filter((file) => {
        const ext = "." + file.name.split(".").pop()?.toLowerCase();
        const isValidType = acceptedTypes.includes(ext);
        const isValidSize = file.size <= maxSizeMB * 1024 * 1024;
        return isValidType && isValidSize;
      });

      setFiles((prev) => {
        const combined = [...prev, ...validFiles].slice(0, maxFiles);
        return combined;
      });
    },
    [acceptedTypes, maxFiles, maxSizeMB]
  );

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (files.length > 0) {
      onUpload?.(files);
    }
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return <ImageIcon className="h-4 w-4 text-[#00AEEF]" />;
    return <FileText className="h-4 w-4 text-[#E1251B]" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">{label}</p>

      {/* Drop zone */}
      <div
        className={cn(
          "relative rounded-xl border-2 border-dashed p-6 md:p-8 text-center transition-all duration-200 cursor-pointer",
          isDragging
            ? "border-accent bg-accent/5 scale-[1.01]"
            : "border-border hover:border-accent/50 hover:bg-secondary/50"
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => {
          const input = document.createElement("input");
          input.type = "file";
          input.multiple = true;
          input.accept = acceptedTypes.join(",");
          input.onchange = (e) => handleFiles((e.target as HTMLInputElement).files);
          input.click();
        }}
      >
        <Upload className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
        <p className="text-sm font-medium">
          Drag & drop file di sini atau{" "}
          <span className="text-accent font-semibold">klik untuk pilih</span>
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {acceptedTypes.join(", ")} • Max {maxSizeMB}MB per file • Max {maxFiles} file
        </p>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <Card key={index} className="border border-border/50">
              <CardContent className="flex items-center gap-3 p-3">
                {getFileIcon(file)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </CardContent>
            </Card>
          ))}

          <Button className="w-full btn-touch gap-2" onClick={handleSubmit}>
            <Upload className="h-4 w-4" />
            Upload {files.length} File
          </Button>
        </div>
      )}
    </div>
  );
}
