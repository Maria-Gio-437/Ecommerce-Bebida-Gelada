import React, { createContext, useState, useContext, useEffect } from 'react';
import { Product } from '../components/ProductCard/ProductCard';
import { useAuth } from './AuthContext';

interface ProductContextType {
  products: Product[];
  categories: string[];
  getProductById: (id: number) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  isLoading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

interface ProductProviderProps {
  children: React.ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  
  // Produtos filtrados com base na idade do usuário
  const products = user?.isAdult 
    ? allProducts 
    : allProducts.filter(product => !product.alcoholic);
  
  // Extrair categorias únicas dos produtos
  const categories = Array.from(new Set(products.map(product => {
    // Aqui você pode mapear IDs de categoria para nomes, se necessário
    switch(product.category) {
      case 1: return 'Cervejas';
      case 2: return 'Destilados';
      case 3: return 'Vinhos';
      case 4: return 'Sem Álcool';
      default: return 'Outros';
    }
  })));
  
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Em um ambiente real, isso seria uma chamada à API
        // Simulando uma chamada à API com dados mockados
        const mockProducts: Product[] = [
          {
            id: 1,
            name: 'Cerveja Pilsen',
            price: 8.90,
            category: 1,
            alcoholic: true,
            image: '/images/cerveja-pilsen.jpg'
          },
          {
            id: 2,
            name: 'Cerveja IPA',
            price: 12.90,
            category: 1,
            alcoholic: true,
            image: '/images/cerveja-ipa.jpg'
          },
          {
            id: 3,
            name: 'Whisky 12 anos',
            price: 120.00,
            category: 2,
            alcoholic: true,
            image: '/images/whisky.jpg'
          },
          {
            id: 4,
            name: 'Vinho Tinto',
            price: 45.90,
            category: 3,
            alcoholic: true,
            image: '/images/vinho-tinto.jpg'
          },
          {
            id: 5,
            name: 'Refrigerante Cola',
            price: 6.50,
            category: 4,
            alcoholic: false,
            image: '/images/refrigerante-cola.jpg'
          },
          {
            id: 6,
            name: 'Água Mineral',
            price: 3.50,
            category: 4,
            alcoholic: false,
            image: '/images/agua-mineral.jpg'
          },
          {
            id: 7,
            name: 'Suco de Laranja',
            price: 7.90,
            category: 4,
            alcoholic: false,
            image: '/images/suco-laranja.jpg'
          },
          {
            id: 8,
            name: 'Energético',
            price: 9.90,
            category: 4,
            alcoholic: false,
            image: '/images/energetico.jpg'
          },
        ];
        
        setAllProducts(mockProducts);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  const getProductById = (id: number) => {
    return products.find(product => product.id === id);
  };
  
  const getProductsByCategory = (categoryName: string) => {
    // Mapear nome da categoria para ID
    let categoryId: number;
    switch(categoryName.toLowerCase()) {
      case 'cervejas': categoryId = 1; break;
      case 'destilados': categoryId = 2; break;
      case 'vinhos': categoryId = 3; break;
      case 'sem álcool': categoryId = 4; break;
      default: return [];
    }
    
    return products.filter(product => product.category === categoryId);
  };
  
  const value = {
    products,
    categories,
    getProductById,
    getProductsByCategory,
    isLoading
  };
  
  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};