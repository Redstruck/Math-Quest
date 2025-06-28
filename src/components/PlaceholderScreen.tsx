import React from 'react';
import { ArrowLeft, Construction } from 'lucide-react';

interface PlaceholderScreenProps {
  title: string;
  description: string;
  onBack: () => void;
}

const PlaceholderScreen: React.FC<PlaceholderScreenProps> = ({ title, description, onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-purple-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="mr-4 p-3 bg-white/70 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>

        {/* Coming Soon Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-400 to-pink-500 rounded-3xl mb-6 shadow-lg">
            <Construction className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Coming Soon!</h2>
          <p className="text-gray-600 mb-6">
            This feature is currently under development and will be available in the next phase.
          </p>
          <div className="text-sm text-gray-500">
            Stay tuned for exciting updates! 🚀
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderScreen;