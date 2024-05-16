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
  const [isMobile, setIsMobile] = useState(false); // Mobil durumu için state

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // 768px altında mobil olarak kabul et
    };
    
    handleResize(); // İlk yüklemede kontrol et
    window.addEventListener('resize', handleResize); // Boyut değişikliğinde kontrol et

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup
    };
  }, []);

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
      <Navbar />
      <div className={`flex flex-row items-start gap-8 ${isMobile ? 'pt-16' : 'pt-0'}`}>
      {!isMobile && (
        <div className="w-1/5 mt-16">
          <CategoryMenu />
        </div>
      )}
      <div className={`w-full ${!isMobile ? 'w-4/5' : ''}`}>
      {photo && (
        <div className="relative container mx-auto p-4 flex items-center justify-center min-h-screen">
          <button 
            onClick={() => router.push('/')}
            className="absolute top-0 left-0 text-gray-700 hover:text-gray-900 font-bold py-2 px-4 rounded transition duration-300 "
            style={{ marginTop: isMobile ? '4rem' : '5rem' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
  
          <div className="grid md:grid-cols-2 items-center md:items-start justify-center">
            <div className="w-full "> 
              <img src={photo.image} alt={photo.title} className="w-96 h-96 object-contain mt-12 p-5 md:p-2" /> 
            </div>
            <div className="md:pl-8 md:mt-0 mt-4 w-full">
              <h1 className="text-xl font-bold">{photo.title}</h1>
              <p className="mt-2 text-lg">{photo.description}</p>
            </div>
          </div>
        </div>
      )}
      </div>
      </div>
    </div>
  );
  
}

export default PhotoDetailPage;

