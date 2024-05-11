import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-orange-500 shadow fixed top-0 left-0 right-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center">
                <h1 className="text-4xl font-semibold text-white font-sans">Tarvina Galeri</h1> 
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <input type="text" placeholder="Aramak istediğiniz resmi giriniz" className="input input-bordered w-96 max-w-xs rounded-lg border-2 border-gray-200 text-sm p-3" />
            </div>
            <div className="ml-6 relative">
              <button className="btn bg-orange-500 hover:bg-orange-600 text-white text-lg py-2 px-4 rounded-lg border border-gray-200">
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