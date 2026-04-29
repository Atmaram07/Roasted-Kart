export const storeLinks = {
  amazon: "https://www.amazon.in/s?k=roastedkart+snacks",
  flipkart: "https://www.flipkart.com/search?q=roastedkart+snacks",
  blinkit: "https://blinkit.com",
  zepto: "https://www.zeptonow.com",
};

export const products = [
  {
    id: "protein-puffs",
    slug: "protein-puffs",
    name: "Soya Protein Pops",
    category: "Protein Puffs",
    shortDescription: "High-protein roasted puffs built for crunchy cravings.",
    longDescription:
      "Crunchy roasted pops with bold masala notes and protein-forward macros. Designed for snackers who want both flavor and performance.",
    heroColor: "from-orange-500 via-rose-500 to-fuchsia-500",
    benefits: ["Roasted not fried", "High protein", "No palm oil", "No maida"],
    ingredients:
      "Soya grits, chickpea flour, rice flour, seasoning blend, spices, sea salt, sunflower oil (light coating).",
    nutrition: { serving: "30 g", protein: "21g", calories: "182 kcal", fat: "6g", carbs: "13g" },
    reviews: [
      "Peri Peri is dangerously addictive. I keep ordering weekly.",
      "Finally a clean snack that doesn’t taste boring.",
      "Gym bag essential. Crunch + macros = win.",
    ],
    variants: [
      {
        id: "protein-puffs-peri-peri",
        slug: "protein-puffs-peri-peri",
        name: "Peri Peri",
        weight: "60 g",
        price: 249,
        mrp: 299,
        tags: ["Spicy", "Hero SKU", "High Protein"],
        protein: "21g",
        calories: "182 kcal",
        amazon: "https://www.amazon.in/s?k=soya+protein+pops+peri+peri",
        flipkart: "https://www.flipkart.com/search?q=soya+protein+pops+peri+peri",
      },
      {
        id: "protein-puffs-pudina",
        slug: "protein-puffs-pudina",
        name: "Pudina",
        weight: "60 g",
        price: 239,
        mrp: 299,
        tags: ["Refreshing", "Light"],
        protein: "20g",
        calories: "176 kcal",
        amazon: "https://www.amazon.in/s?k=soya+protein+pops+pudina",
        flipkart: "https://www.flipkart.com/search?q=soya+protein+pops+pudina",
      },
      {
        id: "protein-puffs-cream-onion",
        slug: "protein-puffs-cream-onion",
        name: "Cream & Onion",
        weight: "60 g",
        price: 249,
        mrp: 299,
        tags: ["Classic", "Crowd Favorite"],
        protein: "22g",
        calories: "188 kcal",
        amazon: "https://www.amazon.in/s?k=soya+protein+pops+cream+and+onion",
        flipkart: "https://www.flipkart.com/search?q=soya+protein+pops+cream+and+onion",
      },
    ],
  },
  {
    id: "roasted-peanuts",
    slug: "roasted-peanuts",
    name: "Roasted Peanuts",
    category: "Roasted Peanuts",
    shortDescription: "Traditional crunch upgraded with better roast and punchy flavors.",
    longDescription:
      "Desi flavor-packed roasted peanuts that deliver satiety without oily overload. Perfect for chai breaks and post-work munching.",
    heroColor: "from-amber-400 via-yellow-500 to-orange-500",
    benefits: ["Roasted crunch", "Better satiety", "No artificial flavours", "No maida"],
    ingredients:
      "Peanuts, spice mix, herbs, dried mint, salt, natural acidity regulators, sunflower oil (light coating).",
    nutrition: { serving: "35 g", protein: "24g", calories: "210 kcal", fat: "9g", carbs: "10g" },
    reviews: [
      "Hing jeera flavor reminds me of street snacks but cleaner.",
      "This hits better than fried peanuts.",
      "The crunch is unreal.",
    ],
    variants: [
      {
        id: "roasted-peanuts-hing-jeera",
        slug: "roasted-peanuts-hing-jeera",
        name: "Hing Jeera",
        weight: "140 g",
        price: 320,
        mrp: 349,
        tags: ["Desi", "Chatpata"],
        protein: "24g",
        calories: "210 kcal",
        amazon: "https://www.amazon.in/s?k=roasted+peanuts+hing+jeera",
        flipkart: "https://www.flipkart.com/search?q=roasted+peanuts+hing+jeera",
      },
      {
        id: "roasted-peanuts-nimbu-pudina",
        slug: "roasted-peanuts-nimbu-pudina",
        name: "Nimbu Pudina",
        weight: "140 g",
        price: 320,
        mrp: 349,
        tags: ["Tangy", "Fresh"],
        protein: "23g",
        calories: "205 kcal",
        amazon: "https://www.amazon.in/s?k=roasted+peanuts+nimbu+pudina",
        flipkart: "https://www.flipkart.com/search?q=roasted+peanuts+nimbu+pudina",
      },
      {
        id: "roasted-peanuts-fiery-chilli",
        slug: "roasted-peanuts-fiery-chilli",
        name: "Fiery Chilli",
        weight: "140 g",
        price: 329,
        mrp: 359,
        tags: ["Spicy", "Bold"],
        protein: "24g",
        calories: "214 kcal",
        amazon: "https://www.amazon.in/s?k=roasted+peanuts+fiery+chilli",
        flipkart: "https://www.flipkart.com/search?q=roasted+peanuts+fiery+chilli",
      },
    ],
  },
  {
    id: "roasted-makhana",
    slug: "roasted-makhana",
    name: "Roasted Makhana",
    category: "Makhana",
    shortDescription: "Light, airy, and flavor-bomb makhana for guilt-free snacking.",
    longDescription:
      "Crunchy roasted foxnuts with elevated flavor profiles. Your binge companion for movie nights, office breaks, and travel snacking.",
    heroColor: "from-lime-400 via-emerald-500 to-cyan-500",
    benefits: ["Light texture", "Roasted not fried", "No palm oil", "No artificial flavours"],
    ingredients:
      "Makhana (fox nuts), spices, seasoning blend, herbs, sea salt, sunflower oil (light coating).",
    nutrition: { serving: "30 g", protein: "14g", calories: "160 kcal", fat: "4g", carbs: "18g" },
    reviews: [
      "Pudina Pop feels super light but super flavorful.",
      "My clean munching hero.",
      "Crispy and addictive.",
    ],
    variants: [
      {
        id: "roasted-makhana-pudina-pop",
        slug: "roasted-makhana-pudina-pop",
        name: "Pudina Pop",
        weight: "60 g",
        price: 449,
        mrp: 499,
        tags: ["Fresh", "Crunchy"],
        protein: "13g",
        calories: "155 kcal",
        amazon: "https://www.amazon.in/s?k=roasted+makhana+pudina+pop",
        flipkart: "https://www.flipkart.com/search?q=roasted+makhana+pudina+pop",
      },
      {
        id: "roasted-makhana-tikka-masala",
        slug: "roasted-makhana-tikka-masala",
        name: "Tikka Masala",
        weight: "60 g",
        price: 449,
        mrp: 499,
        tags: ["Smoky", "Spicy"],
        protein: "14g",
        calories: "162 kcal",
        amazon: "https://www.amazon.in/s?k=roasted+makhana+tikka+masala",
        flipkart: "https://www.flipkart.com/search?q=roasted+makhana+tikka+masala",
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
