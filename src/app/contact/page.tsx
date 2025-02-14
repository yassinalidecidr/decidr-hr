export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-purple-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-16 text-white">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/10 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea 
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white h-32"
                  placeholder="Your message"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full px-4 py-2 bg-white text-blue-900 rounded-md font-medium hover:bg-opacity-90 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white/10 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-2 text-gray-200">
                <p>Email: contact@hradvisor.ai</p>
                <p>Phone: +61 2 1234 5678</p>
                <p>Hours: Mon-Fri 9am-5pm AEST</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 