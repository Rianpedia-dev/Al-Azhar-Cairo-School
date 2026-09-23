"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";

interface UseUploadOptions {
  maxSizeMB?: number;
  allowedTypes?: string[];
  maxFiles?: number;
}

export function useUpload(options: UseUploadOptions = {}) {
  const {
    maxSizeMB = 10, // PRD 7.6.4: default 10MB per file
    allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/webp"],
    maxFiles = 5,
  } = options;

  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const validateFile = useCallback(
    (file: File): boolean => {
      if (file.size > maxSizeMB * 1024 * 1024) {
        toast.error(`Ukuran file ${file.name} melebihi batas maksimal ${maxSizeMB}MB`);
        return false;
      }

      if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
        toast.error(
          `Format berkas ${file.name} tidak didukung. Harap unggah PDF atau Gambar (PNG/JPG/WEBP).`
        );
        return false;
      }

      return true;
    },
    [maxSizeMB, allowedTypes]
  );

  const addFiles = useCallback(
    (newFiles: FileList | File[]) => {
      const validFiles: File[] = [];
      const fileArray = Array.from(newFiles);

      if (files.length + fileArray.length > maxFiles) {
        toast.error(`Maksimal hanya dapat mengunggah ${maxFiles} file per tugas`);
        return;
      }

      for (const file of fileArray) {
        if (validateFile(file)) {
          validFiles.push(file);
        }
      }

      setFiles((prev) => [...prev, ...validFiles]);
    },
    [files.length, maxFiles, validateFile]
  );

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
    setProgress(0);
  }, []);

  const upload = useCallback(async (): Promise<{ url: string; nama: string; size: number }[]> => {
    if (files.length === 0) return [];

    setIsUploading(true);
    setProgress(20);

    // Simulated upload progress
    await new Promise((res) => setTimeout(res, 500));
    setProgress(60);
    await new Promise((res) => setTimeout(res, 500));
    setProgress(100);
    setIsUploading(false);

    return files.map((f) => ({
      nama: f.name,
      url: `/uploads/${Date.now()}_${f.name}`,
      size: f.size,
    }));
  }, [files]);

  return {
    files,
    isUploading,
    progress,
    addFiles,
    removeFile,
    clearFiles,
    upload,
  };
}
