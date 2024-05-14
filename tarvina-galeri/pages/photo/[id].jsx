import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import "../../app/globals.css";
import Navbar from '@/components/navbar';
import CategoryMenu from '@/components/kategori';

function PhotoDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        console.log("API Response:", response.data);

        setPhoto(data);
        setLoading(false);
      } catch (err) {
        setError('Fotoğraflar yüklenirken bir sorun oluştu.');
        setLoading(false);
      }
    };

    if (id) {
      fetchPhoto();
    }
  }, [id]);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <Navbar/>
      <div className="flex flex-row items-start gap-8 pt-16">
      <div className="w-1/4">
        <CategoryMenu/>
      </div>
      <div className="w-3/4">
      {photo && (
        <>
        <div className="container mx-auto p-4 flex items-center justify-center min-h-screen">
    <div className="flex flex-col md:flex-row items-center justify-center">
      <div className="md:w-1/3 w-1/2 max-w-sm"> 
        <img src={photo.image} alt={photo.title} className="w-full h-auto object-contain" /> 
      </div>
      <div className="md:pl-8 md:mt-0 mt-4 w-full">
        <h1 className="text-2xl font-bold text-center">{photo.title}</h1>
        <p className="mt-4">{photo.description}</p>
        <button 
          onClick={() => router.push('/')}
          className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300 text-center max-w-sm"
        >
          Galeriye Dön
        </button>
      </div>
    </div>
  </div>
        </>
      )}
      </div>
      </div>
    </div>
  );
}

export default PhotoDetailPage;

