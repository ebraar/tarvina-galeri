import React from 'react';

const CategoryMenu = () => {
  const categories = [
    "Hayvanlar & Doğa",
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
    <div className="h-full bg-gray-100 fixed rounded-lg w-1/4">
      <div className="p-5">
        <h2 className="font-bold text-xl mb-4">Kategoriler</h2>
        <ul className="space-y-2">
          {categories.map(category => (
            <li key={category} className="border-b border-gray-300">
              <input type="checkbox" id={category} className="mr-2" />
              <label htmlFor={category}>{category}</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CategoryMenu;
