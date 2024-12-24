import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Components/Card';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://dummyapi.online/api/movies');
        const movieData = response.data;

        const updatedMovies = await Promise.all(
          movieData.map(async (movie) => {
            try {
              const imdbId = movie.imdb_url.split('/').slice(-2, -1)[0]; 
              const posterResponse = await axios.get(
                `http://www.omdbapi.com/?i=${imdbId}&apikey=5dd4565`
              );
              const poster = posterResponse.data.Poster;
              return { ...movie, image: poster || movie.image };
            } catch {
              return movie; 
            }
          })
        );

        setMovies(updatedMovies);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch movies or posters.');
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div className="text-center text-lg text-gray-600">Loading movies...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Movie Application</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {movies.map((movie) => (
          <Card
            key={movie.id}
            title={movie.movie}
            rating={movie.rating}
            image={movie.image}
            imdbUrl={movie.imdb_url}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
