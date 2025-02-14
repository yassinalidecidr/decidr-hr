export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-purple-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-16 text-white">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-200">{`
              We're dedicated to revolutionizing HR processes through AI-powered solutions. 
              Our platform combines cutting-edge technology with human expertise to deliver 
              seamless HR experiences.`}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
            <p className="text-gray-200">
              Our AI consultant provides instant, accurate responses to HR-related queries, 
              helping organizations streamline their operations and provide better support 
              to their employees.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <ul className="list-disc list-inside text-gray-200 space-y-2">
              <li>Innovation in HR Technology</li>
              <li>Employee-Centric Solutions</li>
              <li>Data Security & Privacy</li>
              <li>Continuous Improvement</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
} 