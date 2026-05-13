import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getProductBySlug, getVariantBySlug } from "../data/catalog";

export default function ProductPage() {
  const { variantSlug } = useParams();
  const navigate = useNavigate();

  const [selectedVariantSlug, setSelectedVariantSlug] = useState(variantSlug);

  const variant = useMemo(() => getVariantBySlug(selectedVariantSlug), [selectedVariantSlug]);
  const product = useMemo(() => (variant ? getProductBySlug(variant.productSlug) : null), [variant]);

  if (!variant || !product) {
    return (
      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-[#00000012] bg-white p-8 text-center text-[#555]">
          Product not found.
        </div>
      </section>
    );
  }

  const onVariantChange = (slug) => {
    setSelectedVariantSlug(slug);
    navigate(`/product/${slug}`);
  };

  return (
    <section className="px-4 py-14 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className={`rounded-3xl bg-gradient-to-br ${product.heroColor} p-[2px] shadow-[0_24px_50px_rgba(9,4,25,0.45)]`}>
            <div className="h-full rounded-3xl bg-white p-8">
              <img src={product.image} alt={product.name} className="h-96 md:h-[400px] w-full rounded-2xl object-contain" />
              <div className="mt-6 rounded-2xl bg-[#fff8ef] p-4 text-sm text-[#555]">
                Packaging-first product visual placeholder. Add packshot image here.
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#00000012] bg-white p-8">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#ffca3a]">{product.category}</p>
            <h1 className="mt-2 text-4xl font-black uppercase [font-family:'Space_Grotesk',sans-serif]">{product.name}</h1>
            <h2 className="mt-2 text-2xl font-black uppercase text-[#ff7a00] [font-family:'Space_Grotesk',sans-serif]">{variant.name}</h2>
            <p className="mt-3 text-[#555]">{product.longDescription}</p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-[#ff7a0024] p-3">
                <p className="text-[11px] font-black uppercase tracking-wide text-[#ffd3a7]">Protein</p>
                <p className="text-lg font-black text-[#1f1f1f]">{variant.protein}</p>
              </div>
              <div className="rounded-xl bg-[#d5ff4f24] p-3">
                <p className="text-[11px] font-black uppercase tracking-wide text-[#dcff8a]">Calories</p>
                <p className="text-lg font-black text-[#1f1f1f]">{variant.calories}</p>
              </div>
            </div>

            <div className="mt-5 flex items-end gap-3">
              <p className="text-3xl font-black text-[#d5ff4f]">Rs {variant.price}</p>
              <p className="text-sm text-[#b9aacd] line-through">Rs {variant.mrp}</p>
            </div>

            <div className="mt-6">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#ffca3a]">Choose Variant</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.variants.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onVariantChange(item.slug)}
                    className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-wide ${
                      item.slug === selectedVariantSlug ? "bg-[#ff7a00] text-white" : "bg-[#fff8ef] text-[#7a4d1f]"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href={variant.amazon} target="_blank" rel="noopener noreferrer" className="rounded-full bg-gradient-to-r from-[#ff7a00] to-[#ff3d81] px-6 py-3 text-sm font-black uppercase tracking-wide text-white">
                Buy on Amazon
              </a>
              <a href={variant.flipkart} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#0000001f] px-6 py-3 text-sm font-black uppercase tracking-wide text-[#1f1f1f]">
                Buy on Flipkart
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <div className="rounded-2xl border border-[#00000012] bg-white p-5">
            <h3 className="text-2xl font-black uppercase [font-family:'Space_Grotesk',sans-serif]">Benefits</h3>
            <ul className="mt-3 space-y-2 text-sm text-[#555]">
              {product.benefits.map((item) => (
                <li key={item}>+ {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[#00000012] bg-white p-5">
            <h3 className="text-2xl font-black uppercase [font-family:'Space_Grotesk',sans-serif]">Ingredients</h3>
            <p className="mt-3 text-sm text-[#555]">{product.ingredients}</p>
          </div>
          <div className="rounded-2xl border border-[#00000012] bg-white p-5">
            <h3 className="text-2xl font-black uppercase [font-family:'Space_Grotesk',sans-serif]">Nutrition</h3>
            <div className="mt-3 space-y-2 text-sm text-[#555]">
              <p>Serving: {product.nutrition.serving}</p>
              <p>Protein: {product.nutrition.protein}</p>
              <p>Calories: {product.nutrition.calories}</p>
              <p>Fat: {product.nutrition.fat}</p>
              <p>Carbs: {product.nutrition.carbs}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-[#00000012] bg-white p-6">
          <h3 className="text-2xl font-black uppercase [font-family:'Space_Grotesk',sans-serif]">Reviews</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {product.reviews.map((review) => (
              <div key={review} className="rounded-xl bg-[#fff8ef] p-4 text-sm text-[#3d3d3d]">
                {review}
              </div>
            ))}
          </div>
          <Link to="/shop" className="mt-5 inline-block text-sm font-black uppercase tracking-wide text-[#ff6b00]">
            Back to shop
          </Link>
        </div>
      </div>
    </section>
  );
}

