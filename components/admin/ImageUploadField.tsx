"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const bucket = "website-assets";

export function ImageUploadField({
  value,
  onChange,
  folder = "website",
  multiple = false,
}: {
  value?: string | string[] | null;
  onChange: (value: string | string[]) => void;
  folder?: string;
  multiple?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const values = Array.isArray(value)
    ? value
    : String(value ?? "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

  async function upload(files: FileList | null) {
    if (!files?.length) return;

    setUploading(true);
    setError("");

    try {
      const supabase = createSupabaseBrowserClient();
      const urls: string[] = [];

      for (const file of Array.from(files)) {
        const cleanName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
        const path = `${folder}/${crypto.randomUUID()}-${cleanName}`;
        const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file, {
          cacheControl: "3600",
          upsert: false,
        });

        if (uploadError) {
          throw uploadError;
        }

        const { data } = supabase.storage.from(bucket).getPublicUrl(path);
        urls.push(data.publicUrl);
      }

      onChange(multiple ? [...values, ...urls] : urls[0]);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function removeAt(index: number) {
    const next = values.filter((_, itemIndex) => itemIndex !== index);
    onChange(multiple ? next : "");
  }

  return (
    <div className="space-y-3">
      <Input
        ref={inputRef}
        className="hidden"
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={(event) => upload(event.target.files)}
      />
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          className="rounded-full"
          variant="outline"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="h-4 w-4" />
          {uploading ? "Uploading..." : multiple ? "Upload Images" : "Upload Photo"}
        </Button>
        {values.length > 0 ? (
          <Button type="button" variant="ghost" onClick={() => onChange(multiple ? [] : "")}>
            Remove
          </Button>
        ) : null}
      </div>
      {error ? <p className="text-sm text-white/60">{error}</p> : null}
      {values.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {values.map((url, index) => (
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black" key={url}>
              <Image
                src={url}
                alt=""
                width={240}
                height={160}
                className="h-28 w-full object-cover"
                unoptimized
              />
              <button
                type="button"
                className="absolute right-2 top-2 rounded-full bg-black/80 p-1 text-white"
                onClick={() => removeAt(index)}
                aria-label="Remove image"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
