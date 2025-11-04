
import React from 'react';
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';

const LandingPage: React.FC = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 w-screen">
      <Header />
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Welcome to Our Platform</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">Your journey starts here.</p>
        <div className="flex space-x-4">
          {/* Add navigation links or buttons here */}
          <a href="/dashboard" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">Go to Dashboard</a>
          <a href="/login" className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50">Login</a>
        </div>
      </div>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Features</h2>
            <p className="text-gray-700 dark:text-gray-300">Discover what our platform has to offer.</p>
          </div>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="rounded-lg shadow-lg p-8 bg-white dark:bg-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Feature One</h3>
                <p className="text-gray-700 dark:text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="rounded-lg shadow-lg p-8 bg-white dark:bg-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Feature Two</h3>
                <p className="text-gray-700 dark:text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="rounded-lg shadow-lg p-8 bg-white dark:bg-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Feature Three</h3>
                <p className="text-gray-700 dark:text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;
