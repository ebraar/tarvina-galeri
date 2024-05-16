import React, { useState, useEffect }from 'react';   


const MobilNav = () => {

    const categories = [
        "Doğa",
        "Mimari",
        "Arka Fonlar",
        "İş & Ofis",
        "Kutlama",
        "Konseptler",
        "Yolculuk",
        "Çevre",
        "Aile",
        "Spor"
      ];

    const [isMenuOpen, setIsMenuOpen] = useState(false); // Menü açık/kapalı durumunu kontrol et
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Mobil durumu kontrol et

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize); // Pencere boyutu değiştiğinde kontrol et
    handleResize(); // İlk render'da da kontrol et
    return () => {
      window.removeEventListener('resize', handleResize); // Event listener'ı temizle
    };
  }, []);

  return (
    <nav className="bg-black shadow-none fixed border-none left-0 right-0 top-0 z-50" style={{ marginTop: '-1px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-2xl font-semibold text-white flex-grow text-center mt-3">Tarvina Galeri</h1>
        <div className="flex justify-between items-center h-16">
          {isMobile && (
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white mr-4">
              {isMenuOpen ? '✕' : '≡'}
            </button>
          )}
  
          <input
            type="text"
            placeholder="Aramak istediğiniz resmi giriniz"
            className="input input-bordered w-full rounded-lg border border-gray-200 text-sm p-2"
          />
          <button className="btn bg-black hover:bg-gray-800 text-white text-lg py-1 px-2 rounded-lg border border-gray-200 ml-2">
            Ara
          </button>
        </div>
      </div>
      <div>
        <h2 className="bg-black text-white text-center animate-fade-in-out pb-2">Baskı Yapabileceğiniz Desenler</h2>
      </div>
      {isMenuOpen && (
        <div className={`fixed top-26 left-0 w-48 bg-black text-white p-4  h-full transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <ul className="space-y-2">
            {categories.map(category => (
              <li key={category} className="border-b border-gray-400">
                <input type="checkbox" id={category} className="mr-2" />
                <label htmlFor={category} className="text-white font-source-sans">{category}</label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
  
  
};


export default MobilNav;