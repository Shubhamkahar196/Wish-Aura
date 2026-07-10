// "use client";

// import { useRef, useState } from "react";
// import Image from "next/image";

// import { Button } from "@/components/ui/button";

// import { validateImage } from "./validate-image";
// import axios from 'axios'

// type ImageUploadProps = {
//   onUpload: (url: string) => void;
// };

// export default function ImageUpload({
//   onUpload,
// }: ImageUploadProps) {
//   const inputRef = useRef<HTMLInputElement>(null);

//   const [preview, setPreview] = useState("");

//   const [uploading, setUploading] = useState(false);

//   async function handleUpload(
//     e: React.ChangeEvent<HTMLInputElement>
//   ) {
//     const file = e.target.files?.[0];

//     if (!file) return;

//     const error = validateImage(file);

//     if (error) {
//       alert(error);
//       return;
//     }

//     setPreview(URL.createObjectURL(file));

//     setUploading(true);

//     try {
//       const formData = new FormData();

//       formData.append("file", file);

//       formData.append(
//         "upload_preset",
//         "wishaura"
//       );

//     //   const response = await fetch(
//     //     `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
//     //     {
//     //       method: "POST",
//     //       body: formData,
//     //     }
//     //   );

//     const response = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,formData)

//       if (!response.ok) {
//         throw new Error("Upload Failed");
//       }

//       const data = await response.json();

//       onUpload(data.secure_url);
//     } catch (error) {
//       console.error(error);
//       alert("Image upload failed.");
//     } finally {
//       setUploading(false);
//     }
//   }

//   return (
//     <div className="space-y-4">
//       <input
//         ref={inputRef}
//         type="file"
//         hidden
//         accept="image/*"
//         onChange={handleUpload}
//       />

//       {preview ? (
//         <Image
//           src={preview}
//           alt="Preview"
//           width={300}
//           height={300}
//           className="rounded-xl border object-cover"
//         />
//       ) : (
//         <div className="flex h-64 items-center justify-center rounded-xl border-2 border-dashed">
//           No Image Selected
//         </div>
//       )}

//       <Button
//         type="button"
//         disabled={uploading}
//         onClick={() => inputRef.current?.click()}
//       >
//         {uploading ? "Uploading..." : "Choose Image"}
//       </Button>
//     </div>
//   );
// }


"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { validateImage } from "./validate-image";
import axios from "axios";

type ImageUploadProps = {
  onUpload: (url: string) => void;
};

export default function ImageUpload({ onUpload }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateImage(file);
    if (error) {
      alert(error);
      return;
    }

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset","unsigned_upload");

      // Axios automatically sets multipart/form-data headers for FormData objects
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      // Axios puts the parsed JSON directly into response.data
      onUpload(response.data.secure_url);
    } catch (error) {
      console.error(error);
      alert("Image upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={handleUpload}
      />
      {preview ? (
        <Image
          src={preview}
          alt="Preview"
          width={300}
          height={300}
          className="rounded-xl border object-cover"
        />
      ) : (
        <div className="flex h-64 items-center justify-center rounded-xl border-2 border-dashed">
          No Image Selected
        </div>
      )}
      <Button
        type="button"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
      >
        {uploading ? "Uploading..." : "Choose Image"}
      </Button>
    </div>
  );
}
