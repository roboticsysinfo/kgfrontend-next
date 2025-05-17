"use client"

import React from 'react';

const OptimizedImage = ({ imageUrl, alt, width = 200, height = 200, quality = 80, format = 'auto' }) => {
  // Construct the ImageKit URL with transformations
  const optimizedUrl = `${imageUrl}?tr=w-${width},h-${height},q-${quality},f-${format}`;

  return (
    <img
      src={imageUrl ? optimizedUrl : 'https://placehold.co/100x100'}
      alt={alt}
    />
  );
};

export default OptimizedImage;
