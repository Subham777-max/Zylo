export default function CartSkeleton() {
  return (
    <div className="min-h-screen animate-pulse" style={{ backgroundColor: "var(--color-background)", fontFamily: "var(--font-family)" }}>
      <div className="max-w-300 mx-auto px-5 sm:px-8 lg:px-10 pt-10 pb-20">
        <div className="h-10 w-48 mb-2" style={{ backgroundColor: "var(--color-surface-container-low)" }} />
        <div className="h-px w-full mb-8" style={{ backgroundColor: "rgba(212,160,23,0.12)" }} />
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-px">
            {[1, 2].map((i) => (
              <div key={i} className="h-32.5" style={{ backgroundColor: "var(--color-surface-container-low)" }} />
            ))}
          </div>
          <div className="w-full lg:w-[320px] h-85" style={{ backgroundColor: "var(--color-surface-container-low)" }} />
        </div>
      </div>
    </div>
  );
}
