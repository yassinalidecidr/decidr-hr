export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-purple-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-16 text-white">
        <h1 className="text-4xl font-bold mb-8">Our Locations</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/10 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Sydney</h2>
            <p className="text-gray-200">
              Level 30, 123 Pitt Street<br />
              Sydney, NSW 2000<br />
              Australia
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Melbourne</h2>
            <p className="text-gray-200">
              Level 18, 456 Collins Street<br />
              Melbourne, VIC 3000<br />
              Australia
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 