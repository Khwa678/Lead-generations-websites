import React from 'react';

const PropertyMap = ({ location }) => {
  return (
    <div className="w-full h-48 bg-gray-200 rounded flex items-center justify-center">
      {/* Placeholder for Google Maps integration as required  */}
      <p className="text-gray-500">Map Integration: {location || 'No location set'}</p>
    </div>
  );
};

export default PropertyMap;