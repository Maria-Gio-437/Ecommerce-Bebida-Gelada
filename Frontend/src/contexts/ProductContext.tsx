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
        const mockProducts: Product[] = [
          {
            id: 1,
            name: 'Cerveja Pilsen',
            price: 8.90,
            category: 1,
            alcoholic: true,
            image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=400&fit=crop&crop=center'
          },
          {
            id: 2,
            name: 'Cerveja IPA Artesanal',
            price: 12.90,
            category: 1,
            alcoholic: true,
            image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&h=400&fit=crop&crop=center'
          },
          {
            id: 3,
            name: 'Cerveja',
            price: 10.50,
            category: 1,
            alcoholic: true,
            image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?w=400&h=400&fit=crop&crop=center'
          },
          {
            id: 4,
            name: 'Whisky 12 Anos',
            price: 120.00,
            category: 2,
            alcoholic: true,
            image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&h=400&fit=crop&crop=center'
          },
          {
            id: 5,
            name: 'Vodka',
            price: 85.00,
            category: 2,
            alcoholic: true,
            image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=400&fit=crop&crop=center'
          },
          {
            id: 6,
            name: 'Gin',
            price: 95.00,
            category: 2,
            alcoholic: true,
            image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=400&fit=crop&crop=center'
          },
          {
            id: 7,
            name: 'Vinho Tinto Reserva',
            price: 45.90,
            category: 3,
            alcoholic: true,
            image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&h=400&fit=crop&crop=center'
          },
          {
            id: 8,
            name: 'Vinho Branco Seco',
            price: 42.50,
            category: 3,
            alcoholic: true,
            image: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400&h=400&fit=crop&crop=center'
          },
          {
            id: 9,
            name: 'Champagne',
            price: 89.90,
            category: 3,
            alcoholic: true,
            image: 'https://d1zvfmhlebc91g.cloudfront.net/fit-in/456x751/filters:fill(ffffff)/filters:background_color(ffffff)/filters:quality(100)/n49shopv2_boccatispa/images/products/646fc0688d1b7/12205_espumante_chandon_reserve_brut_750ml-646fc068deea6.jpg'
          },
          {
            id: 10,
            name: 'Suco Natural de Laranja',
            price: 7.90,
            category: 4,
            alcoholic: false,
            image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=400&fit=crop&crop=center'
          },
          {
            id: 11,
            name: 'Água Mineral',
            price: 2.50,
            category: 4,
            alcoholic: false,
            image: 'https://ibassets.com.br/ib.item.image.big/b-aacc52e5cb9c4b49b872a48fa0530b9c.jpeg'
          },
          {
            id: 14,
            name: 'Energético',
            price: 6.90,
            category: 4,
            alcoholic: false,
            image: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=400&h=400&fit=crop&crop=center'
          },
          {
            id: 15,
            name: 'Água de Coco',
            price: 4.50,
            category: 4,
            alcoholic: false,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsIq7klYivhx-yq9tKS90ak3Zmz3EB9XF05w&s'
          },
          {
            id: 16,
            name: 'Chá Gelado Limão',
            price: 6.90,
            category: 4,
            alcoholic: false,
            image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop&crop=center'
          }
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
      case 'sem álcool':
      case 'sem-alcool': categoryId = 4; break;
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