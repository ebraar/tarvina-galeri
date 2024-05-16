import React from 'react';

const CategoryMenu = () => {
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

  return (
    <div className="h-full bg-black fixed sm:w-1/5">
      <div className="p-5">
        <h2 className="font-bold text-xl text-white mb-4">Kategoriler</h2>
        <ul className="space-y-6">
          {categories.map(category => (
            <li key={category} className="border-b border-gray-300">
              <input type="checkbox" id={category} className="mr-2" />
              <label htmlFor={category} className="text-white">{category}</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ); 
}

export default CategoryMenu;
