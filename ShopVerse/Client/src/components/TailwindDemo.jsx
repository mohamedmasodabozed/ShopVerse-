import React from 'react';
import Header from './Header';
import Footer from './Footer/Footer';

const TailwindDemo = () => {
  return (
    <>
      <Header isLoggedIn={true} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">Tailwind CSS Demo</h1>
        
        {/* Basic card */}
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 my-4">
          <div className="flex-shrink-0">
            <div className="h-12 w-12 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xl font-bold">TW</div>
          </div>
          <div>
            <div className="text-xl font-medium text-black">Tailwind CSS</div>
            <p className="text-gray-500">Successfully installed and working!</p>
          </div>
        </div>
        
        {/* Button examples */}
        <div className="max-w-md mx-auto my-8 p-6 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Button Examples</h2>
          <div className="space-y-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Primary Button
            </button>
            <button className="bg-transparent hover:bg-green-500 text-green-700 hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded block">
              Secondary Button
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block">
              Danger Button
            </button>
          </div>
        </div>
        
        {/* Responsive grid */}
        <div className="max-w-6xl mx-auto my-8">
          <h2 className="text-xl font-semibold mb-4">Responsive Grid</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-purple-200 p-4 rounded-lg shadow">Item 1</div>
            <div className="bg-purple-300 p-4 rounded-lg shadow">Item 2</div>
            <div className="bg-purple-400 p-4 rounded-lg shadow">Item 3</div>
            <div className="bg-purple-500 p-4 rounded-lg shadow text-white">Item 4</div>
            <div className="bg-purple-600 p-4 rounded-lg shadow text-white">Item 5</div>
            <div className="bg-purple-700 p-4 rounded-lg shadow text-white">Item 6</div>
          </div>
        </div>
        
        {/* Form elements */}
        <div className="max-w-md mx-auto my-8 p-6 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Form Elements</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="username" 
                type="text" 
                placeholder="Username"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                id="password" 
                type="password" 
                placeholder="******************"
              />
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Sign In
              </button>
              <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TailwindDemo;
