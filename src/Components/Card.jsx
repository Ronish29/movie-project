import React from 'react';

const Card = ({ title, rating, image, imdbUrl }) => {
  return (
    <div className="w-64 h-96 bg-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300">
      <img
        src={image}
        alt={title}
        className="w-full h-2/3 object-cover rounded-t-lg"
      />
      <div className="p-4 flex flex-col justify-between h-1/3">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{title}</h2>
        <p className="text-gray-600">Rating: {rating}/10</p>
        <a
          href={imdbUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 font-bold mt-2 hover:underline"
        >
          View on IMDb
        </a>
      </div>
    </div>
  );
};

export default Card;
