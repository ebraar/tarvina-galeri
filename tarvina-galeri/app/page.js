"use client"
import React, { useState, useEffect } from 'react';
import Navbar from "/components/navbar";      
import CategoryMenu from "/components/kategori";
import Photos from "/components/foto";

export default function Home() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Navbar/>
      <div className="pt-16">  
        <div className="flex flex-row items-start gap-8">
        {!isMobile && (
            <div className="w-1/5">
              <CategoryMenu />
            </div>
          )}
          <div className={isMobile ? "w-full" : "w-4/5"}> 
            <Photos /> 
          </div>
        </div>
      </div>
    </>
  );
}
