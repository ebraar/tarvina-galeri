"use client"
import axios from 'axios';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const MobilePhotos = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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

    if (error) return <p>{error}</p>;
    
   
    return (
        <div style={{ paddingTop: '68px', margin: '0 auto', width: '100%' }}>
            <div className="flex justify-center">
                <div className="columns-2 gap-0" style={{ width: '100%', margin: '0', padding: '0', boxSizing: 'border-box' }}>
                    {photos.map((photo) => (
                        <Link key={photo.id} href={`/photo/${photo.id}`} passHref>
                            <div className="relative group mb-4 break-inside-avoid cursor-pointer">
                                <img src={photo.image} alt={photo.title} className="w-full h-auto object-cover" />
                                <div className="absolute bottom-0 left-0 right-0 hidden group-hover:flex items-center justify-center"
                                     style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)', height: '50%' }}>
                                    <p className="text-white text-xs sm:text-xs px-3 text-center font-source-sans">
                                        {photo.description.split(" ").slice(0, 10).join(" ")}{photo.description.split(" ").length > 10 ? "..." : ""}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
    
    
};

export default MobilePhotos;
