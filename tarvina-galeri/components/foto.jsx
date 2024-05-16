import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import MobilPhotos from "/components/fotoMobil"; 
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function Photos() {

  const [isMobile, setIsMobile] = useState(window.innerWidth <786);
  const [photos, setPhotos] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hoveredId, setHoveredId] = useState(null);
  const [clickedIds, setClickedIds] = useState(new Set());

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
      const fetchPhotos = async () => {
          try {
              const response = await axios.get('https://fakestoreapi.com/products');
              console.log("API Response:", response.data);
              setPhotos(response.data);
              setLoading(false);
              // Initialize all photos as not favorite
              let initialFavorites = {};
              response.data.forEach(photo => {
                initialFavorites[photo.id] = false;
              });
              setFavorites(initialFavorites);
          } catch (err) {
              setError('Fotoğraflar yüklenirken bir sorun oluştu.');
              setLoading(false);
          }
      };

      fetchPhotos(); 
  }, []);

  const toggleFavorite = (id) => {
    setFavorites(prevFavorites => ({
      ...prevFavorites,
      [id]: !prevFavorites[id]
    }));
  };

  const handleFavoriteClick = (id) => {
    toggleFavorite(id);
    setClickedIds((prev) => {
      const newClickedIds = new Set(prev);
      if (newClickedIds.has(id)) {
        newClickedIds.delete(id);
      } else {
        newClickedIds.add(id);
      }
      return newClickedIds;
    });
  };

  if (isMobile) {
    return <MobilPhotos/>
  }

  if (error) return <p>{error}</p>;


  
  return (
    <div style={{ paddingTop: '24px' }}>
      <div className="flex justify-end">
        <div className="columns-5 gap-0" style={{ columnGap: '0px' }}>
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative cursor-pointer p-0 m-0 group"
              onMouseEnter={() => setHoveredId(photo.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Link href={`/photo/${photo.id}`} passHref>
                <div className="p-0 m-0">
                  <img src={photo.image} alt={photo.title} className="w-full h-auto p-0 m-0" />
                  <div className="absolute bottom-0 left-0 right-0 hidden group-hover:flex items-center justify-center"
                       style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)', height: '50%' }}>
                    <p className="text-white text-xs sm:text-xs px-3 text-center">
                      {photo.description.split(" ").slice(0, 20).join(" ")}{photo.description.split(" ").length > 20 ? "..." : ""}
                    </p>
                  </div>
                </div>
              </Link>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavoriteClick(photo.id);
                }}
                className={`absolute top-2 right-2 border-gray-300 transition duration-300 ease-in-out transform hover:scale-110 rounded-full ${
                  hoveredId === photo.id || clickedIds.has(photo.id) ? 'block' : 'hidden'
                }`}
              >
                {favorites[photo.id] ? <FaHeart className="text-orange-500 text-2xl" /> : <FaRegHeart className="text-gray-400 text-2xl" />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
};

export default Photos;
