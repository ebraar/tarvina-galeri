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
    <div className="relative container mx-auto p-4 flex items-center justify-center min-h-screen">
      {/* Geri dön butonu, sol üst köşede yer alacak ve daha ince çerçeveli olacak */}
      <button 
        onClick={() => router.push('/')}
        className="absolute top-4 left-4 bg-white border border-gray-300 text-gray-700 hover:text-gray-900 font-bold py-2 px-4 rounded transition duration-300 flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="flex flex-col md:flex-row items-center justify-center">
        {/* Fotoğrafın sola kaydırılması ve sağ tarafındaki boşluğun azaltılması */}
        <div className="md:w-2/3 w-full max-w-4xl mr-4"> 
          <img src={photo.image} alt={photo.title} className="w-full max-h-[80vh] object-contain" /> 
        </div>
        {/* Metin içeriğinin daha kompakt olması ve ekranı doldurmadan görülebilir olması */}
        <div className="md:pl-8 md:mt-0 mt-4 w-full md:w-1/3 overflow-auto max-h-[80vh] md:pr-2">
          <h1 className="text-2xl font-bold">{photo.title}</h1>
          <p className="mt-4 text-lg">{photo.description}</p>
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

