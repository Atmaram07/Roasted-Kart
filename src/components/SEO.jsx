import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getProductBySlug, getVariantBySlug } from "../data/catalog";

const SITE = "https://www.roastedkart.com";
const ORGANIZATION_ID = `${SITE}/#organization`;
const DEFAULT_TITLE = "RoastedKart | Official Website for Roasted Snacks & Soya Protein Pops";
const DEFAULT_DESCRIPTION = "RoastedKart is an Indian snack brand offering roasted snack boxes, millet mixes and soya protein pops. Explore our range and shop online at the official RoastedKart website.";

const pages = {
  "/": { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION },
  "/shop": {
    title: "Shop Roasted Snacks, Millet Boxes & Soya Pops | RoastedKart",
    description: "Shop the official RoastedKart range of snack boxes, millet mixes and soya protein pops in multiple flavours and pack sizes.",
  },
  "/build-your-own": {
    title: "Build Your Own Snack Box | RoastedKart",
    description: "Create your own snack box with favourites from RoastedKart. Explore roasted snacks and build a mix that suits your taste.",
  },
  "/about": {
    title: "About RoastedKart | Indian Roasted Snack Brand",
    description: "Get to know RoastedKart, an Indian snack brand offering roasted snack boxes, millet mixes and soya protein pops.",
  },
  "/contact": {
    title: "Contact RoastedKart | Customer Support & Orders",
    description: "Contact the RoastedKart team for product questions, order support and assistance with your online snack order.",
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
    setMeta("name", "twitter:card", "summary");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setLink("canonical", canonical);

    setStructuredData("rk-organization-schema", {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: "RoastedKart",
      alternateName: "Roasted Kart",
      url: `${SITE}/`,
      description: DEFAULT_DESCRIPTION,
      email: "dietfactoryindia@gmail.com",
      telephone: "+91 74250 49203",
      sameAs: [
        "https://www.instagram.com/roastedkart/",
        "https://www.linkedin.com/company/roastedkart",
      ],
    });
    setStructuredData("rk-website-schema", {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      name: "RoastedKart",
      alternateName: "Roasted Kart",
      url: `${SITE}/`,
      publisher: { "@id": ORGANIZATION_ID },
      inLanguage: "en-IN",
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
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
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
