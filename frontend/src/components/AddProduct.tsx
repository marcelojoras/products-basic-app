import React, { useState } from 'react';
import api from '../services/api';

type AddProductProps = {
  onAddProduct: () => void; // Função para recarregar produtos
};

const AddProduct: React.FC<AddProductProps> = ({ onAddProduct }) => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);

  const addProduct = async () => {
    await api.post('/products', { name, price, quantity });
    setName('');
    setPrice(0);
    setQuantity(0);
    onAddProduct(); // Recarrega os produtos após adicionar
  };

  return (
    <div>
      <h1>Add Product</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(parseFloat(e.target.value))}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
      />
      <button onClick={addProduct}>Add</button>
    </div>
  );
};

export default AddProduct;
