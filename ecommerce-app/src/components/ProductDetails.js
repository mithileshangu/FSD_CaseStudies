// src/components/ProductDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const ProductDetailContainer = styled.div`
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 10px;
`;

const ProductTitle = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #333;
`;

const ProductPrice = styled.p`
  font-size: 1.5em;
  font-weight: bold;
  color: #ff6f61;
`;

const ProductDescription = styled.p`
  font-size: 1.2em;
  margin-top: 20px;
  line-height: 1.6;
  color: #666;
`;

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading product details...</p>;

  return (
    <ProductDetailContainer>
      <ProductTitle>{product.title}</ProductTitle>
      <ProductImage src={product.image} alt={product.title} />
      <ProductPrice>${product.price}</ProductPrice>
      <ProductDescription>{product.description}</ProductDescription>
    </ProductDetailContainer>
  );
};  

export default ProductDetails;
