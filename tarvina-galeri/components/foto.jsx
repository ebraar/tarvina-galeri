"use client"
import axios from 'axios';
import { useState, useEffect } from 'react';

const Photos = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [favorites, setFavorites] = useState({});
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  const openModal = (index) => {
    setSelectedPhotoIndex(index);
  };

  const closeModal = () => {
    setSelectedPhotoIndex(null);
  };

  const toggleFavorite = (photoId, event) => {
    event.stopPropagation();  // Modal açılmasını engellemek için
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [photoId]: !prevFavorites[photoId]
    }));
  };

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
                console.log("API Response:", response.data);
                setPhotos(response.data); 
                setLoading(false);
            } catch (err) {
                setError('Fotoğraflar yüklenirken bir sorun oluştu.');
                setLoading(false);
            }
        };

        fetchPhotos(); 
    }, []);

    if (loading) return <p>Yükleniyor...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="flex justify-end">
          <div className="columns-4 gap-0" style={{ columnGap: '0px' }}>
            {photos.map((photo, index) => (
              <div key={photo.id} className="relative group mb-4 break-inside-avoid cursor-pointer" onClick={() => openModal(index)}>
                <img src={photo.image} alt={photo.title} className="w-full h-auto" />
                
                <button
                  onClick={(e) => toggleFavorite(photo.id, e)}
                  className={`absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full shadow-md bg-white`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill={favorites[photo.id] ? "red" : "none"} viewBox="0 0 24 24" stroke="black" className="w-6 h-6" strokeWidth="0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 10-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <div className="absolute bottom-0 left-0 right-0 hidden group-hover:flex items-center justify-center"
                     style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)', height: '50%' }}>
                  <p className="text-white text-sm px-3 text-center">
                    {photo.description.split(" ").slice(0, 20).join(" ")}{photo.description.split(" ").length > 20 ? "..." : ""}
                  </p>
                </div>
              </div>
  
            ))}
            <div>
                {selectedPhotoIndex !== null && (
            <div className="absolute w-3/4 h-1/4  bg-black bg-opacity-50 flex justify-center items-center p-4 right-0" onClick={closeModal}>
              <div className="bg-white p-4 rounded-lg w-full mx-auto relative" onClick={e => e.stopPropagation()}
                   style={{ overflowY: 'auto',  margin: '5% auto',  }}>
                <img src={photos[selectedPhotoIndex].image} alt={photos[selectedPhotoIndex].title} className="w-auto max-w-full h-auto mb-4" style={{  }}/>
                <p className="text-black text-center">{photos[selectedPhotoIndex].description}</p>
              </div>
            </div>
          )}
          </div>
          </div>
    
      
        </div>
      );
      
};

export default Photos;
