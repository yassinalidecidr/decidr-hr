export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-purple-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-16 text-white">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="space-y-8 text-gray-200">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Information Collection</h2>
            <p>
              We collect information that you provide directly to us, including when you create an account,
              use our services, or communicate with us. This may include:
            </p>
            <ul className="list-disc list-inside mt-2 ml-4 space-y-2">
              <li>Name and contact information</li>
              <li>Login credentials</li>
              <li>Communication preferences</li>
              <li>Chat history and interactions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside mt-2 ml-4 space-y-2">
              <li>Provide and improve our services</li>
              <li>Personalize your experience</li>
              <li>Communicate with you</li>
              <li>Ensure security and prevent fraud</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information
              against unauthorized or unlawful processing, accidental loss, destruction or damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul className="list-disc list-inside mt-2 ml-4 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@hradvisor.ai" className="text-blue-400 hover:text-blue-300">
                privacy@hradvisor.ai
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 