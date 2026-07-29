export default function PrivacyPolicy() {
  return (
    <section className="bg-[#fff8ef] px-4 py-14 md:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-3xl border border-[#00000012] bg-gradient-to-br from-[#ffe9d1] to-[#fff8ef] p-8 text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ff6b00]">Privacy Policy</p>
          <h1 className="mt-2 text-4xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">RoastedKart Privacy Policy</h1>
          <p className="mx-auto mt-4 max-w-3xl text-[#4d4d4d]">
            RoastedKart is committed to protecting your privacy and keeping your personal information secure when you shop with us.
          </p>
        </div>

        <div className="rounded-3xl border border-[#00000012] bg-white p-7 space-y-6 text-[#555]">
          <article className="space-y-3">
            <h2 className="text-2xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Business name</h2>
            <p>RoastedKart is the business name used on this website.</p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Information we collect</h2>
            <p>We collect information needed to process orders, communicate with you, and deliver products.</p>
            <ul className="list-disc space-y-2 pl-5 text-sm text-[#555]">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Shipping and billing address</li>
            </ul>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Payment information handling</h2>
            <p>
              Payment details are processed securely through our payment gateway partners. We do not store full card numbers on our servers.
            </p>
            <p>
              We may retain reference information needed to verify transactions and prevent fraud, but sensitive payment data is handled by trusted providers.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Cookie usage</h2>
            <p>
              We use cookies and similar technologies to improve website performance, remember your preferences, and provide personalized experiences.
            </p>
            <p>
              You can disable cookies in your browser, but certain features of the site may not function correctly if cookies are blocked.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Data protection</h2>
            <p>
              We use industry-standard security measures to protect your information from unauthorized access, alteration, disclosure, or destruction.
            </p>
            <p>
              Access to personal data is restricted to employees and service providers who require it to perform their work.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Third-party services</h2>
            <p>We may share information with third-party partners to support order fulfilment and website operations.</p>
            <ul className="list-disc space-y-2 pl-5 text-sm text-[#555]">
              <li>Payment gateway providers for secure transactions</li>
              <li>Courier partners for shipping and delivery</li>
              <li>Analytics services to improve website performance</li>
            </ul>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">User rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information. You may also object to certain processing activities.
            </p>
            <p>
              To exercise these rights, contact us at the email address below.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Contact</h2>
            <p>
              For privacy inquiries, please email us at <a href="mailto:dietfactoryindia@gmail.com" className="text-[#ff6b00]">dietfactoryindia@gmail.com</a>.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
