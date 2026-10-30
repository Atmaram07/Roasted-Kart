import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getProductBySlug, getVariantBySlug } from "../data/catalog";

const SITE = "https://www.roastedkart.com";
const DEFAULT_TITLE = "RoastedKart | Roasted Snacks, Millet Mixes & Soya Protein Pops";
const DEFAULT_DESCRIPTION = "Explore RoastedKart's range of roasted snack boxes, millet mixes and soya protein pops. Discover flavour-packed snacks and shop online.";

const pages = {
  "/": { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION },
  "/shop": {
    title: "Shop Roasted Snacks, Millet Boxes & Soya Pops | RoastedKart",
    description: "Shop RoastedKart snack boxes, millet mixes and soya protein pops in multiple flavours and pack sizes. Explore the range and order online.",
  },
  "/build-your-own": {
    title: "Build Your Own Snack Box | RoastedKart",
    description: "Create a snack box with RoastedKart favourites. Explore roasted snacks and build a mix that suits your taste.",
  },
  "/about": {
    title: "About RoastedKart | Our Roasted Snack Range",
    description: "Get to know RoastedKart and our range of flavour-forward roasted snacks, millet mixes and soya protein pops.",
  },
  "/contact": {
    title: "Contact RoastedKart | Customer Support & Orders",
    description: "Get in touch with RoastedKart for product questions, order support and assistance with your online snack order.",
  },
  "/faq": {
    title: "Frequently Asked Questions | RoastedKart",
    description: "Find answers to common questions about RoastedKart products, orders, payments, shipping and customer support.",
  },
  "/privacy-policy": {
    title: "Privacy Policy | RoastedKart",
    description: "Read how RoastedKart handles personal information and privacy.",
  },
  "/terms-conditions": {
    title: "Terms & Conditions | RoastedKart",
    description: "Review the terms and conditions for shopping on RoastedKart.",
  },
  "/refund-cancellation-policy": {
    title: "Refund & Cancellation Policy | RoastedKart",
    description: "Read RoastedKart's refund, return and cancellation information.",
  },
  "/shipping-delivery-policy": {
    title: "Shipping & Delivery Policy | RoastedKart",
    description: "Review shipping, dispatch and delivery information for RoastedKart orders.",
  },
};

const noIndexPaths = ["/cart", "/checkout", "/order-success", "/track-order", "/admin/orders"];

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

function setStructuredData(id, data) {
  let element = document.getElementById(id);
  if (!data) {
    element?.remove();
    return;
  }
  if (!element) {
    element = document.createElement("script");
    element.id = id;
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(data);
}

export default function SEO() {
  const location = useLocation();
  const path = location.pathname.replace(/\/$/, "") || "/";
  const variant = path.startsWith("/product/") ? getVariantBySlug(path.split("/").pop()) : null;
  const product = variant ? getProductBySlug(variant.productSlug) : null;
  const page = pages[path] || {};
  const title = variant && product ? `${variant.name} ${variant.weight} | RoastedKart` : page.title || DEFAULT_TITLE;
  const description = variant && product
    ? `${product.shortDescription} Explore ${variant.weight} packs from RoastedKart and order online.`
    : page.description || DEFAULT_DESCRIPTION;
  const canonical = `${SITE}${path === "/" ? "/" : path}`;
  const shouldNoIndex = noIndexPaths.includes(path) || (path.startsWith("/product/") && !variant);

  useEffect(() => {
    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "robots", shouldNoIndex ? "noindex, nofollow" : "index, follow");
    setMeta("property", "og:type", variant && product ? "product" : "website");
    setMeta("property", "og:site_name", "RoastedKart");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonical);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setLink("canonical", canonical);

    setStructuredData("rk-organization-schema", {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "RoastedKart",
      url: SITE,
      email: "dietfactoryindia@gmail.com",
      telephone: "+91 74250 49203",
    });
    setStructuredData("rk-website-schema", {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "RoastedKart",
      url: SITE,
    });

    if (variant && product) {
      setStructuredData("rk-product-schema", {
        "@context": "https://schema.org",
        "@type": "Product",
        name: `${variant.name} ${variant.weight}`,
        description,
        image: product.image,
        brand: { "@type": "Brand", name: "RoastedKart" },
        category: product.category,
        offers: {
          "@type": "Offer",
          url: canonical,
          priceCurrency: "INR",
          price: String(variant.price),
        },
      });
      setStructuredData("rk-breadcrumb-schema", {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Shop", item: `${SITE}/shop` },
          { "@type": "ListItem", position: 3, name: product.name, item: canonical },
        ],
      });
    } else {
      setStructuredData("rk-product-schema", null);
      setStructuredData("rk-breadcrumb-schema", null);
    }
  }, [title, description, canonical, shouldNoIndex, variant, product]);

  return null;
}
