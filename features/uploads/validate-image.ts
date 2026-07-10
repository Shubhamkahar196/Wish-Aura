const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export function validateImage(file: File) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return "Only JPG, PNG and WEBP images are allowed.";
  }

  if (file.size > MAX_FILE_SIZE) {
    return "Image size should be less than 5MB.";
  }

  return null;
}