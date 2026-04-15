import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../components/ImageUploader";
import ProductForm from "../components/ProductForm";
import { useProducts } from "../hooks/useProducts";
import { BackArrow } from "../../../components/ui/GlobalIcons";

const INITIAL_FORM = {
  title: "",
  description: "",
  price: "",
  currency: "INR",
};

function validate(form, images) {
  const errors = {};
  if (!form.title.trim())           errors.title       = "Title is required.";
  if (!form.description.trim())     errors.description = "Description is required.";
  if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0)
                                    errors.price       = "Enter a valid price.";
  if (images.length === 0)          errors.images      = "Upload at least one image.";
  return errors;
}

export default function CreateProductPage() {
  const navigate = useNavigate();
  const { handleCreateProduct,loading } = useProducts();

  const [form,        setForm]        = useState(INITIAL_FORM);
  const [images,      setImages]      = useState([]);
  const [errors,      setErrors]      = useState({});

  function handleFieldChange(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(form, images);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    try {
      const payload = new FormData();
      payload.append("title",       form.title);
      payload.append("description", form.description);
      payload.append("priceAmount",       form.price);
      payload.append("priceCurrency",    form.currency);
      images.forEach((img) => payload.append("images", img.file));

      await handleCreateProduct(payload);
      navigate("/seller/dashboard");
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row"
      style={{ backgroundColor: "var(--color-background)", fontFamily: "var(--font-family)" }}
    >
      {/* Image upload panel  */}
      <div
        className="flex flex-col flex-1 p-8 lg:p-12"
        style={{ backgroundColor: "var(--color-surface-container-low)", borderRight: "1px solid rgba(79,70,52,0.2)" }}
      >
        {/* Section label */}
        <p
          className="text-[0.58rem] uppercase tracking-[0.2em] mb-6"
          style={{ color: "var(--color-outline)" }}
        >
          Product Images
        </p>

        <ImageUploader images={images} onChange={setImages} />

        {errors.images && (
          <p className="mt-3 text-[0.62rem]" style={{ color: "var(--color-error)" }}>
            {errors.images}
          </p>
        )}
      </div>

      {/*  RIGHT — Form panel */}
      <div
        className="flex flex-col w-full lg:w-120 xl:w-135 shrink-0 p-8 lg:p-12"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        {/* Back button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-8 w-fit transition-colors duration-300"
          style={{ background: "none", border: "none", color: "var(--color-outline)", cursor: "pointer", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600, fontFamily: "var(--font-family)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-primary-container)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-outline)")}
        >
          <BackArrow />
          Back
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1
            className="font-bold tracking-[0.18em] uppercase mb-1"
            style={{ color: "var(--color-primary-container)", fontSize: "1.4rem" }}
          >
            Create Product
          </h1>
          <p
            className="uppercase tracking-[0.14em] text-[0.6rem]"
            style={{ color: "var(--color-outline)" }}
          >
            New Listing
          </p>
          {/* Gold rule */}
          <div
            className="mt-4"
            style={{ height: "1px", width: "32px", backgroundColor: "var(--color-primary-container)" }}
          />
        </div>

        {/* Form */}
        <ProductForm
          form={form}
          onChange={handleFieldChange}
          errors={errors}
          onSubmit={handleSubmit}
          isSubmitting={loading}
        />
      </div>
    </div>
  );
}