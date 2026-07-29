export default function RefundCancellationPolicy() {
  return (
    <section className="bg-[#fff8ef] px-4 py-14 md:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-3xl border border-[#00000012] bg-gradient-to-br from-[#ffe9d1] to-[#fff8ef] p-8 text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ff6b00]">Refund & Cancellation Policy</p>
          <h1 className="mt-2 text-4xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">RoastedKart Refund & Cancellation Policy</h1>
          <p className="mx-auto mt-4 max-w-3xl text-[#4d4d4d]">
            We want every order to be right. This policy explains cancellations, eligible refunds, and what to do if your order arrives damaged or incorrect.
          </p>
        </div>

        <div className="rounded-3xl border border-[#00000012] bg-white p-7 space-y-6 text-[#555]">
          <article className="space-y-3">
            <h2 className="text-2xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Cancellation window</h2>
            <p>
              You may request cancellation any time before your order is dispatched. Once the order has left our facility, cancellation is not possible.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Eligible refund cases</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-[#555]">
              <li>Order cancelled before dispatch</li>
              <li>Damaged products received</li>
              <li>Wrong product delivered</li>
            </ul>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Non-refundable products</h2>
            <p>
              Perishable or opened food items are generally non-refundable unless they arrive damaged or incorrect.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Damaged or wrong product process</h2>
            <p>
              If you receive a damaged or incorrect item, contact us within 24 hours with photos and your order details.
            </p>
            <p>
              We will review the issue and arrange a replacement or refund as appropriate.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Refund processing timeline</h2>
            <p>
              Approved refunds are processed back to the original payment method within 5–7 business days after verification.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Contact</h2>
            <p>
              For cancellations or refunds, email us at <a href="mailto:dietfactoryindia@gmail.com" className="text-[#ff6b00]">dietfactoryindia@gmail.com</a> with your order number and issue details.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
