import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import api from '../services/api';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: number, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | null>(null);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
      const response = await api.post('/products', product);
      setProducts((prevProducts) => [...prevProducts, response.data]);
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  const updateProduct = async (id: number, product: Partial<Product>) => {
    try {
      const response = await api.put(`/products/${id}`, product);
      const updatedProduct = response.data;
  
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p))
      );
      fetchProducts();
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      throw error;
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts debe usarse dentro de un ProductProvider');
  }
  return context;
};