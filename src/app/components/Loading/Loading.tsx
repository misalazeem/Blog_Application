"use client"

import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full border-t-4 border-gray-500 border-solid h-16 w-16"></div>
    </div>
  );
};

export default Loading;