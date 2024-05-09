import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Photos = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                // Tüm ürünleri almak için genel bir API çağrısı
                const response = await axios.get('https://fakestoreapi.com/products');
                console.log("API Response:", response.data);
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError('Ürünler yüklenirken bir sorun oluştu.');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <p>Yükleniyor...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>ebo</div>
    )
}

export default Photos;
