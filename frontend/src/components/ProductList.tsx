import React, { useState } from 'react';
import api from '../services/api';
import EditProduct from './EditProduct';

type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type ProductListProps = {
  products: Product[];
  onDeleteProduct: () => void;
  onEditProduct: () => void;
};

const ProductList: React.FC<ProductListProps> = ({ products, onDeleteProduct, onEditProduct }) => {
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  const deleteProduct = async (id: number) => {
    await api.delete(`/products/${id}`);
    onDeleteProduct(); // Recarrega os produtos após a exclusão
  };

  const startEditing = (id: number) => {
    setEditingProductId(id); // Define qual produto está sendo editado
  };

  const cancelEditing = () => {
    setEditingProductId(null); // Cancela a edição
  };

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {editingProductId === product.id ? (
              <EditProduct
                product={product}
                onEditProduct={() => {
                  onEditProduct(); // Atualiza a lista após editar
                  setEditingProductId(null); // Volta para a lista após editar
                }}
                onCancelEdit={cancelEditing}
              />
            ) : (
              <div>
                {product.name} - ${product.price} ({product.quantity} available)
                <button onClick={() => deleteProduct(product.id)}>Delete</button>
                <button onClick={() => startEditing(product.id)}>Edit</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
