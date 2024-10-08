// src/components/ProductListing.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.h1`
  text-align: center;
  margin: 20px 0;
  font-size: 2.5em;
  color: #333;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const ProductCard = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  text-align: center;
  background-color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ProductTitle = styled.h2`
  font-size: 1.2em;
  margin-bottom: 10px;
  color: #555;
  height: 50px;
`;

const ProductImage = styled.img`
  width: 180px;
  height: 180px;
  object-fit: cover;
  margin-bottom: 15px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ProductPrice = styled.p`
  font-weight: bold;
  margin-top: 10px;
  font-size: 1.3em;
  color: #ff6f61;
`;

const SearchInput = styled.input`
  padding: 15px;
  margin: 20px 0;
  width: 100%;
  max-width: 400px;
  font-size: 1.1em;
  border: 2px solid #ddd;
  border-radius: 5px;
  outline: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the products:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const results = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  return (
    <Container>
      <Header>Product Listing</Header>
      <SearchInput
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <ProductGrid>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id}>
              <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                <ProductImage src={product.image} alt={product.title} loading="lazy" />
                <ProductTitle>{product.title}</ProductTitle>
                <ProductPrice>${product.price}</ProductPrice>
              </Link>
            </ProductCard>
          ))}
        </ProductGrid>
      )}
    </Container>
  );
};

export default ProductListing;
