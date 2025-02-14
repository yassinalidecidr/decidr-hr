import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">404 - Page Not Found</h2>
        <p className="text-gray-600 mb-4">
          The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 inline-block"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
} 