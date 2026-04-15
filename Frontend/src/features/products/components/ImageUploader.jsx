import { useCallback, useState } from "react";
import { UploadIcon,CloseIcon } from "../../../components/ui/GlobalIcons";
const MAX_IMAGES = 7;


export default function ImageUploader({ images, onChange }) {
  const [dragging, setDragging] = useState(false);

  const addFiles = useCallback((files) => {
    const valid = Array.from(files).filter((f) => f.type.startsWith("image/"));
    const remaining = MAX_IMAGES - images.length;
    const toAdd = valid.slice(0, remaining).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: `${Date.now()}-${Math.random()}`,
    }));
    onChange([...images, ...toAdd]);
  }, [images, onChange]);

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  }

  function handleFileInput(e) {
    addFiles(e.target.files);
    e.target.value = "";
  }

  function removeImage(id) {
    onChange(images.filter((img) => img.id !== id));
  }

  return (
    <div className="flex flex-col h-full gap-6">
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className="flex-1 flex flex-col items-center justify-center gap-4 transition-all duration-300 cursor-pointer relative"
        style={{
          border: dragging
            ? "1.5px dashed var(--color-primary)"
            : "1.5px dashed rgba(212, 160, 23, 0.3)",
          backgroundColor: dragging ? "rgba(246, 190, 57, 0.04)" : "transparent",
          minHeight: "280px",
        }}
        onClick={() => document.getElementById("product-image-input").click()}
      >
        <input
          id="product-image-input"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileInput}
          disabled={images.length >= MAX_IMAGES}
        />

        <span style={{ color: dragging ? "var(--color-primary)" : "var(--color-outline)" }}>
          <UploadIcon />
        </span>

        <div className="text-center">
          <p
            className="font-semibold tracking-widest uppercase text-[0.65rem] mb-1"
            style={{ color: dragging ? "var(--color-primary)" : "var(--color-on-surface)" }}
          >
            {images.length >= MAX_IMAGES ? "Maximum images reached" : "Drop images here"}
          </p>
          <p className="text-[0.6rem] uppercase tracking-widest" style={{ color: "var(--color-outline)" }}>
            {images.length >= MAX_IMAGES
              ? `${MAX_IMAGES} / ${MAX_IMAGES} uploaded`
              : `or click to browse — ${images.length} / ${MAX_IMAGES}`}
          </p>
        </div>

        {/* Thin gold accent corners */}
        {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
          <span
            key={i}
            className={`absolute ${pos} w-4 h-4`}
            style={{
              borderTop: i < 2 ? "1px solid var(--color-primary-container)" : "none",
              borderBottom: i >= 2 ? "1px solid var(--color-primary-container)" : "none",
              borderLeft: i % 2 === 0 ? "1px solid var(--color-primary-container)" : "none",
              borderRight: i % 2 === 1 ? "1px solid var(--color-primary-container)" : "none",
            }}
          />
        ))}
      </div>

      {/* Thumbnail strip */}
      {images.length > 0 && (
        <div className="flex gap-3 flex-wrap">
          {images.map((img, idx) => (
            <div
              key={img.id}
              className="relative shrink-0 group"
              style={{ width: "80px", height: "80px" }}
            >
              <img
                src={img.preview}
                alt={`Upload ${idx + 1}`}
                className="w-full h-full object-cover"
                style={{ display: "block" }}
              />
              {/* First image label */}
              {idx === 0 && (
                <span
                  className="absolute bottom-0 left-0 right-0 text-center text-[0.5rem] uppercase tracking-widest py-0.5"
                  style={{ backgroundColor: "var(--color-primary-container)", color: "var(--color-on-primary-container)" }}
                >
                  Cover
                </span>
              )}
              {/* Remove button */}
              <button
                type="button"
                onClick={() => removeImage(img.id)}
                className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ backgroundColor: "rgba(19,19,19,0.9)", color: "#e5e2e1", border: "none", cursor: "pointer" }}
                aria-label="Remove image"
              >
                <CloseIcon />
              </button>
            </div>
          ))}

          {/* Placeholder slots */}
          {Array.from({ length: MAX_IMAGES - images.length }).map((_, i) => (
            <div
              key={`ph-${i}`}
              className="shrink-0"
              style={{
                width: "80px", height: "80px",
                border: "1px dashed rgba(212,160,23,0.15)",
                backgroundColor: "var(--color-surface-container)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
