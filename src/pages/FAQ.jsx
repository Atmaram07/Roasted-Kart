export default function FAQ() {
  return (
    <section className="bg-[#fff8ef] px-4 py-14 md:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-3xl border border-[#00000012] bg-gradient-to-br from-[#ffe9d1] to-[#fff8ef] p-8 text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ff6b00]">Frequently Asked Questions</p>
          <h1 className="mt-2 text-5xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Need help? Start here.</h1>
          <p className="mx-auto mt-4 max-w-3xl text-[#4d4d4d]">
            Find quick answers to common questions about ordering, shipping, returns, and our products.
          </p>
        </div>

        <div className="rounded-3xl border border-[#00000012] bg-white p-8 space-y-6 text-[#555]">
          <article className="space-y-3">
            <h2 className="text-2xl font-black uppercase text-[#1f1f1f]">What is the delivery time?</h2>
            <p>
              Orders are processed within 1–2 business days after payment confirmation. Delivery typically takes 3–7 business days depending on your location within India.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-black uppercase text-[#1f1f1f]">What is the return eligibility?</h2>
            <p>
              Returns and refunds are eligible for damaged or wrong products received. Cancellations are accepted before dispatch. Perishable or opened food items are generally not refundable unless they arrive damaged or incorrect.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-black uppercase text-[#1f1f1f]">What is the shelf life?</h2>
            <p>
              Shelf life can vary by product, typically between 4 to 6 months from packaging. Please check the product pack for the exact expiry date.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-black uppercase text-[#1f1f1f]">How should I store the snacks?</h2>
            <p>
              Store products in a cool, dry place away from direct sunlight. Keep the pouch sealed after opening to preserve freshness and crunch.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-black uppercase text-[#1f1f1f]">What payment methods are accepted?</h2>
            <p>
              We accept major payment methods through a secure checkout, including credit and debit cards, UPI, net banking, and other popular digital wallets.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-black uppercase text-[#1f1f1f]">How can I track my order?</h2>
            <p>
              You will receive tracking details once your order is shipped. Use the courier tracking number provided via email or SMS to monitor delivery status.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
