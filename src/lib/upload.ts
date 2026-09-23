// src/lib/upload.ts per PRD 4.2 & 7.6.4

export const UPLOAD_CONFIG = {
  maxFileSize: 10 * 1024 * 1024, // 10MB per PRD 7.6.4
  allowedExtensions: [".pdf", ".jpeg", ".jpg", ".png", ".webp"],
  allowedMimeTypes: [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/webp",
  ],
  maxFilesGuru: 10,
  maxFilesSiswa: 5,
};

/**
 * Generate standardized filename per PRD 7.6.4:
 * {userId}_{tugasId}_{timestamp}.{ext}
 */
export function generateUploadFileName(
  userId: string,
  tugasId: string,
  originalFilename: string
): string {
  const ext = originalFilename.substring(originalFilename.lastIndexOf("."));
  const timestamp = Date.now();
  return `${userId}_${tugasId}_${timestamp}${ext}`;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
