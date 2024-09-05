import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import api from './services/api';

type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const response = await api.get('/products');
    setProducts(response.data);
  };

  const handleEditProduct = async () => {
    // Função de placeholder, a edição é gerenciada dentro do ProductList
    await loadProducts();
  };

  return (
    <div className="App">
      <AddProduct onAddProduct={loadProducts} />
      <ProductList
        products={products}
        onDeleteProduct={loadProducts}
        onEditProduct={handleEditProduct} // Adiciona a função de edição
      />
    </div>
  );
};

export default App;
