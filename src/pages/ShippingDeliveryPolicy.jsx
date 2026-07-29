export default function ShippingDeliveryPolicy() {
  return (
    <section className="bg-[#fff8ef] px-4 py-14 md:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-3xl border border-[#00000012] bg-gradient-to-br from-[#ffe9d1] to-[#fff8ef] p-8 text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ff6b00]">Shipping & Delivery Policy</p>
          <h1 className="mt-2 text-4xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">RoastedKart Shipping & Delivery Policy</h1>
          <p className="mx-auto mt-4 max-w-3xl text-[#4d4d4d]">
            This policy explains how we ship orders across India and what to expect while your snacks are on the way.
          </p>
        </div>

        <div className="rounded-3xl border border-[#00000012] bg-white p-7 space-y-6 text-[#555]">
          <article className="space-y-3">
            <h2 className="text-2xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Delivery locations</h2>
            <p>
              We currently deliver to locations across India. Delivery availability depends on your entered shipping address.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Processing time</h2>
            <p>
              Orders are processed and dispatched within 1–2 business days after payment confirmation.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Shipping time</h2>
            <p>
              Once dispatched, delivery typically takes 3–7 business days depending on your location and courier service.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Shipping charges</h2>
            <p>
              Shipping charges are calculated at checkout and vary based on order weight, destination, and delivery speed.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Courier partners</h2>
            <p>
              We work with trusted courier partners to deliver your orders efficiently and safely.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Tracking information</h2>
            <p>
              Tracking details are shared once your order is shipped. Use the tracking number provided to monitor delivery status.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Delays</h2>
            <p>
              Delivery may be delayed due to unforeseen circumstances such as weather, courier disruptions, or high demand.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Lost package process</h2>
            <p>
              If your package is lost in transit, contact us at <a href="mailto:dietfactoryindia@gmail.com" className="text-[#ff6b00]">dietfactoryindia@gmail.com</a> and we will work with the courier partner to resolve the issue.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
