import milletBoxImage from "../assets/millet-box.png";
import proteinBoxImage from "../assets/protein-box.png";
import allInOneBoxImage from "../assets/all-in-one-box.png";

export const storeLinks = {
  amazon: "https://www.amazon.in/s?k=roastedkart",
};

export const products = [
  {
    id: "millet-box",
    slug: "the-great-indian-millet-box",
    name: "The Great Indian Millet Box",
    category: "Millet Mix",
    shortDescription: "Pack of 4 millet mixes for wholesome and crunchy snacking.",
    longDescription:
      "Four millet-based snack mixes curated for nutrient-rich, crunchy eating. Each blend pairs traditional grains with bold seasoning for an energetic Indian snack ritual.",
    heroColor: "from-amber-400 via-orange-500 to-rose-500",
    benefits: ["Wholesome millets", "Roasted not fried", "No artificial flavours", "High fiber"],
    ingredients: "Each pack uses a unique blend of whole millets, legumes, and seasoning. See individual flavour variants for full ingredient details.",
    nutrition: { serving: "80 g", protein: "8-14g", calories: "314–393 kcal", fat: "6g", carbs: "22g" },
    reviews: [
      "Millet mix is crunchy, flavorful, and actually keeps me full.",
      "A great guilt-free snack when I want something different.",
      "Perfect for sharing with chai time guests.",
    ],
    image: milletBoxImage,
      variants: [
      {
        id: "millet-box-pack",
        slug: "the-great-indian-millet-box-pack",
        name: "Millet Box Pack",
        weight: "4 x 80 g",
        price: 316,
        mrp: 316,
        tags: ["Pack Of 4", "Millet Mix"],
        protein: "8g",
        calories: "314–393 kcal",
        amazon: "https://amzn.in/d/0hhNl7NF",
      },
    ],
  },
  {
    id: "protein-box",
    slug: "the-great-indian-protein-box",
    name: "The Great Indian Protein Box",
    category: "Protein Pops",
    shortDescription: "Pack of 3 soya protein pops for clean, flavor-forward energy.",
    longDescription:
      "Three roasted soya protein pop flavors crafted for performance-focused snacking. Big taste meets smart macros in every crunchy bite.",
    heroColor: "from-orange-500 via-rose-500 to-fuchsia-500",
    benefits: ["High protein", "Roasted not fried", "No palm oil", "No maida"],
    ingredients:
      "Soya grits, chickpea flour, rice flour, seasoning blend, spices, sea salt, sunflower oil (light coating).",
    nutrition: { serving: "30 g", protein: "33 - 36g", calories: "182 kcal", fat: "6g", carbs: "13g" },
    reviews: [
      "Peri Peri is dangerously addictive. I keep ordering weekly.",
      "Finally a clean snack that doesn’t taste boring.",
      "Gym bag essential. Crunch + macros = win.",
    ],
    image: proteinBoxImage,
    variants: [
      {
        id: "protein-box-pack",
        slug: "the-great-indian-protein-box-pack",
        name: "Protein Box Pack",
        weight: "3 x 80 g",
        price: 237,
        mrp: 237,
        tags: ["Pack Of 3", "Soya Pops"],
        protein: "21g",
        calories: "314–393 kcal",
        amazon: "https://amzn.in/d/0gIyrvYl",
      },
    ],
  },
  {
    id: "all-in-one-snack-box",
    slug: "roasted-kart-all-in-one-snack-box",
    name: "Roasted Kart All-in-One Snack Box",
    category: "Snack Box",
    shortDescription: "Trail pack with all 8 flavours in one adventure-ready box.",
    longDescription:
      "One box with all eight signature flavors from our range. The trail pack is designed for tasting every snack profile without compromise.",
    heroColor: "from-lime-400 via-emerald-500 to-cyan-500",
    benefits: ["All 8 flavours", "Roasted not fried", "No palm oil", "Perfect for sharing"],
    ingredients:
      "Mixed snack blends including millets, soya pops, roasted nuts, seasoning blends, and light sunflower oil.",
    nutrition: { serving: "40 g", protein: "25-30g", calories: "250 kcal", fat: "8g", carbs: "28g" },
    reviews: [
      "The trail pack is perfect for trying everything at once.",
      "Loved the variety and the shareable box format.",
      "All 8 flavours are a hit — great for gifting.",
    ],
    image: allInOneBoxImage,
    variants: [
      {
        id: "all-in-one-trail-pack",
        slug: "all-in-one-trail-pack",
        name: "Trail Pack",
        weight: "8 x 80 g",
        price: 632,
        mrp: 632,
        tags: ["All Flavours", "Trail Pack"],
        protein: "25g",
        calories: "314–393 kcal",
        amazon: "https://amzn.in/d/0g9o9KVK",
      },
    ],
  },
];

export const flattenedVariants = products.flatMap((product) =>
  product.variants.map((variant) => ({
    ...variant,
    productId: product.id,
    productSlug: product.slug,
    productName: product.name,
    productCategory: product.category,
    heroColor: product.heroColor,
  })),
);

export const totalProducts = products.length;
export const totalVariants = flattenedVariants.length;

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug);
}

export function getVariantBySlug(variantSlug) {
  return flattenedVariants.find((variant) => variant.slug === variantSlug);
}
