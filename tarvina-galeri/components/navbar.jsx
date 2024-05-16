import MobilNav from "/components/navbarMobil";      
import React, {useState, useEffect} from 'react';

function Navbar() {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  if(isMobile){
    return <MobilNav/>
  }

  return (
    <nav className="bg-black shadow fixed top-0 left-0 right-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between flex-col sm:flex-row h-auto sm:h-16">
          <div className="flex items-center justify-center sm:justify-start w-full">
            <h1 className="text-4xl font-semibold text-white font-source-sans my-4 sm:my-0">Tarvina Galeri</h1>
          </div>
          <div className="flex items-center flex-row w-full">
            <div className="flex-grow">
              <input 
                type="text" 
                placeholder="Aramak istediğiniz resmi giriniz" 
                className="input input-bordered w-full rounded-lg border-2 border-gray-200 text-sm p-2"
              />
            </div>
            <div className="ml-2">
              <button className="btn bg-black hover:bg-gray-800 text-white text-lg py-2 px-4 rounded-lg border border-gray-200">
                Ara
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;