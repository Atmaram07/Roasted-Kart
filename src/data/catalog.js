import milletBoxImage from "../assets/millet-box.png";
import proteinBoxImage from "../assets/protein-box.png";
import allInOneBoxImage from "../assets/all-in-one-box.png";

export const storeLinks = {
  amazon: "https://www.amazon.in/s?k=roastedkart+snacks",
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
    nutrition: { serving: "80 g", protein: "8g", calories: "314–393 kcal", fat: "6g", carbs: "22g" },
    reviews: [
      "Millet mix is crunchy, flavorful, and actually keeps me full.",
      "A great guilt-free snack when I want something different.",
      "Perfect for sharing with chai time guests.",
    ],
    image: milletBoxImage,
    variants: [
      {
        id: "millet-masala-jowar-bhel",
        slug: "millet-masala-jowar-bhel",
        name: "Masala Jowar Bhel",
        weight: "80 g",
        price: 79,
        mrp: 79,
        tags: ["Jowar", "Bhel", "Millet Mix"],
        protein: "8g",
        calories: "314–393 kcal",
        amazon: "https://www.amazon.in/s?k=the+great+indian+millet+box",
        ingredients: "Sorghum (Jowar) Flakes (34%), Peanuts (28%), Bengal Gram (Chana) (16%), *Edible Vegetable Oil [Rice Bran Oil (Added 0.03% Antioxidant INS 307b)], Rice Puff (6%), Sugar (4%), Seasoning Mix (2%) {Iodized Salt, Sugar, Spices and Condiments [Coriander (4%), Dried Mango Powder (Amchur), Garlic, Onion, Cumin, Ginger, Black pepper (2%), Turmeric, Fenugreek], Maltodextrin, Hydrolyzed Vegetable Protein (Soy), Yeast Extract Powder, Acidity Regulator [Citric acid (INS/E 330)], Lemon Juice Powder (1.5%), Anticaking Agent [Silicon dioxide (INS/E 551)], Flavour Enhancer [Disodium 5'-ribonucleotides (INS/E 635)]}, Tamarind Powder (Tamarind Pulp, Maltodextrin) (1%), Red Chilli (1.14%), Salt (1%), Curry Leaves (0.03%).",
      },
      {
        id: "millet-minty-multigrain",
        slug: "millet-minty-multigrain",
        name: "Minty Multigrain Mix",
        weight: "80 g",
        price: 79,
        mrp: 79,
        tags: ["Wheat", "Pearl Millet", "Mint"],
        protein: "8g",
        calories: "314–393 kcal",
        amazon: "https://www.amazon.in/s?k=the+great+indian+millet+box",
        ingredients: "Wheat Flakes (Wheat) (29%), Pearl Millet (15%), Peanuts (10%), Sorghum (Jowar) Flakes (10%), Bengal Gram (Chana) (10%), Edible Vegetable Oil (10%) [Rice Bran Oil (Added 0.03% Antioxidant INS 307b)], Seasoning Mix (10%) {Salt, Maltodextrin, Spices and Condiments [Onion, Chilly, Garlic, Turmeric, Cumin, Cardamom, Ginger (0.04%), Black pepper (0.02%)], Sugar, Acidity Regulator [Citric acid (INS/E 330), Tartaric acid (INS/E 334)], Mint leaves (0.2%), Flavour Enhancer [Disodium inosinate (INS/E 631), Disodium guanylate (INS/E 627)] and Anticaking agent [Silicon dioxide (INS/E 551)]}, Corn Flakes (5%), Rice Puff (1%).",
      },
      {
        id: "millet-peri-peri-mix",
        slug: "millet-peri-peri-mix",
        name: "Peri-Peri Millet Mix",
        weight: "80 g",
        price: 79,
        mrp: 79,
        tags: ["Pearl Millet", "Peri-Peri", "Spicy"],
        protein: "8g",
        calories: "314–393 kcal",
        amazon: "https://www.amazon.in/s?k=the+great+indian+millet+box",
        ingredients: "Pearl Millet (Bajra) (22%), Wheat Flakes (Wheat) (21%), Peanuts (14%), Sorghum (Jowar) Flakes (9%), Green Gram (Moong Jor) (9%), Red Lentil (Masoor) (9%), Edible Vegetable oil (8%) [Rice Bran Oil (Added 0.03% Antioxidant INS 307b)], Peri-Peri Seasoning Mix (8%) {Iodized Salt, Sugar, Spices and Herbs [Chilli (0.9%), Oregano], Garlic powder, Onion powder, Tamarind Powder, Hydrolyzed Vegetable Protein (Soy), Corn Starch, Lime Juice Powder, Acidity Regulator [Citric Acid (INS/E 330), Sodium Acetate (INS/E 262(i))], Yeast Extract Powder, Anticaking Agent [Silicon Dioxide (INS/E 551)], Flavour Enhancer [Disodium 5'-ribonucleotide (INS/E 635)]}.",
      },
      {
        id: "millet-chaat-masala-mix",
        slug: "millet-chaat-masala-mix",
        name: "Chaat Masala Mix",
        weight: "80 g",
        price: 79,
        mrp: 79,
        tags: ["Jowar", "Pearl Millet", "Chaat"],
        protein: "8g",
        calories: "314–393 kcal",
        amazon: "https://www.amazon.in/s?k=the+great+indian+millet+box",
        ingredients: "Sorghum (Jowar) Flakes (18%), Pearl Millet (Bajra) (18%), Seasoning Mix (14%) {Sugar, Spices and Condiments [Coriander (0.7%), Chilli (0.5%), Dried Mango Powder (Amchur), Ginger], Salt, Tamarind Powder (0.5%), Acidity Regulator [Citric acid (INS/E 330), Tartaric acid (INS/E 334)], Natural Colour [Caramel Colour (INS/E 150d), Paprika Extract (INS/E 160c), Curcumin (INS/E 100)], Anticaking Agent [Silicon dioxide (INS/E 551)], Flavour Enhancer [Disodium inosinate (INS/E 631), Disodium guanylate (INS/E 627)]}, Bengal Gram (Chana) (14%), Green Gram (14%), Edible Vegetable Oil (13%) [Rice Bran Oil (Added 0.03% Antioxidant INS 307b)], Rice Puff (9%).",
      },
      {
        id: "millet-dal-jowar-mix",
        slug: "millet-dal-jowar-mix",
        name: "Dal Jowar Mix",
        weight: "80 g",
        price: 79,
        mrp: 79,
        tags: ["Jowar", "Chana Dal", "Masoor"],
        protein: "8g",
        calories: "314–393 kcal",
        amazon: "https://www.amazon.in/s?k=the+great+indian+millet+box",
        ingredients: "Sorghum (Jowar) Flakes (47%), Bengal Gram (Chana Dal) (17%), Red Lentil (Masoor) (14%), Seasoning Mix (11%) {Sugar, Iodized Salt, Spices and Condiments (Coriander, Chilli, Dry Mango Powder, Ginger, Onion, Garlic, Turmeric, Cumin, Cardamom, Black Pepper), Maltodextrin, Tamarind Powder, Acidity Regulator [Citric acid (INS/E 330), Tartaric acid (INS/E 334)], Natural Colour [Caramel Colour (INS/E 150d), Paprika Extract (INS/E 160c), Curcumin (INS/E 100)], Mint leaves (0.07%), Anticaking Agent [Silicon dioxide (INS/E 551)]}, *Edible Vegetable Oil (Rice Bran Oil) [Added 0.03% Antioxidant INS 307b], Melon Seeds (3%).",
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
    nutrition: { serving: "30 g", protein: "21g", calories: "182 kcal", fat: "6g", carbs: "13g" },
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
        amazon: "https://www.amazon.in/s?k=the+great+indian+protein+box",
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
    nutrition: { serving: "40 g", protein: "25g", calories: "250 kcal", fat: "8g", carbs: "28g" },
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
        amazon: "https://www.amazon.in/s?k=roasted+kart+all+in+one+snack+box",
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
