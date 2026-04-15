function ProductImageGallery({images, activeImg, setActiveImg, product}) {
  const mainImg  = images[activeImg]?.url ?? null;
  return (
    <div className="flex flex-col gap-3 w-full lg:w-105 lg:shrink-0">
          {/* Main image — capped at 500px so it doesn't fill the full screen */}
          <div
            className="w-full overflow-hidden max-h-125"
            style={{
              aspectRatio: "4/5",
              maxHeight: "500px",
              backgroundColor: "var(--color-surface-container-low)",
            }}
          >
            {mainImg ? (
              <img
                src={mainImg}
                alt={images[activeImg]?.alt ?? product.title}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-[0.6rem] uppercase tracking-widest" style={{ color: "var(--color-outline)" }}>No image</span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((img, idx) => (
                <button
                  key={img._id}
                  onClick={() => setActiveImg(idx)}
                  className="flex-1 overflow-hidden transition-all duration-200"
                  style={{
                    aspectRatio: "1",
                    border: idx === activeImg
                      ? "1.5px solid var(--color-primary)"
                      : "1.5px solid transparent",
                    padding: 0,
                    cursor: "pointer",
                    background: "none",
                    maxWidth: "80px",
                  }}
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    style={{ opacity: idx === activeImg ? 1 : 0.55, transition: "opacity 200ms" }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
  )
}

export default ProductImageGallery