export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-purple-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-16 text-white">
        <h1 className="text-4xl font-bold mb-8">Our Services</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/10 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">AI HR Assistant</h2>
            <p className="text-gray-200">
              24/7 intelligent support for all your HR-related queries and needs.
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Policy Management</h2>
            <p className="text-gray-200">
              Automated policy updates and instant access to HR documentation.
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Employee Support</h2>
            <p className="text-gray-200">
              Comprehensive assistance for employee inquiries and concerns.
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Analytics</h2>
            <p className="text-gray-200">
              Insights and reporting on HR operations and employee engagement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 