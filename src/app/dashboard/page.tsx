'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';

export default function DashboardPage() {
  const { user, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace('/login');
    }
  }, [token, router]);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-blue-950 via-blue-900 to-purple-900">
      <div className="container mx-auto px-6 py-10">
        {/* User and Organization Info Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-center text-white mb-6">
            Welcome, {user?.name || 'User'}
          </h1>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">User Information</h3>
                <div className="space-y-2 text-gray-200">
                  <p>Email: {user?.email}</p>
                  <p>Role: {user?.role || 'Member'}</p>
                  <p>Member since: {new Date(user?.startDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Organization Details</h3>
                <div className="space-y-2 text-gray-200">
                  <p>Organization: {user?.organisation?.name || 'Personal Account'}</p>
                  <p>Subscription: {'Free Plan'}</p>
                  {/* <p>Members: {user?.organization?.memberCount || 1}</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition duration-300">
            <h2 className="text-2xl font-semibold text-white mb-4">Recent Chats</h2>
            {/* Add content here */}
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition duration-300">
            <h2 className="text-2xl font-semibold text-white mb-4">Statistics</h2>
            {/* Add content here */}
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition duration-300">
            <h2 className="text-2xl font-semibold text-white mb-4">Settings</h2>
            {/* Add content here */}
          </div>
        </div>
      </div>
    </div>
  );
} 