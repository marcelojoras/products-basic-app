import React, { useState } from 'react';
import api from '../services/api';

type EditProductProps = {
  product: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  };
  onEditProduct: () => void; // Função para recarregar os produtos após editar
  onCancelEdit: () => void;  // Função para cancelar a edição
};

const EditProduct: React.FC<EditProductProps> = ({ product, onEditProduct, onCancelEdit }) => {
  const [name, setName] = useState<string>(product.name);
  const [price, setPrice] = useState<number>(product.price);
  const [quantity, setQuantity] = useState<number>(product.quantity);

  const updateProduct = async () => {
    await api.put(`/products/${product.id}`, { name, price, quantity });
    onEditProduct(); // Recarrega a lista após editar
  };

  return (
    <div>
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
      <button onClick={updateProduct}>Save</button>
      <button onClick={onCancelEdit}>Cancel</button>
    </div>
  );
};

export default EditProduct;
