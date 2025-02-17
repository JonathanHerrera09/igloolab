import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { Table, Button, Form, Container, Row, Col, Card, Modal, InputGroup, FormControl } from 'react-bootstrap';
import { toast } from 'react-toastify';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

const ProductList: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: 0 });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showList, setShowList] = useState(true);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      try {
        await updateProduct(editingProduct.id, newProduct);
        setEditingProduct(null); 
        toast.success('Producto actualizado correctamente');
      } catch (error) {
        console.error('Error al actualizar el producto:', error);
        toast.error('Error al actualizar el producto'); 
      }
    } else {
      try {
        await addProduct(newProduct);
        toast.success('Producto creado correctamente');
      } catch (error) {
        console.error('Error al crear el producto:', error);
        toast.error('Error al crear el producto');
      }
    }
    setNewProduct({ name: '', description: '', price: 0 });
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setNewProduct({ name: product.name, description: product.description, price: product.price });
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (productToDelete) {
      try {
        await deleteProduct(productToDelete.id);
        toast.success('Producto eliminado correctamente');
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
        toast.error('Error al eliminar el producto');
      }
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col xs={12} className="d-block d-md-none mb-3">
          <Button
            variant="primary"
            className="me-2"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Ocultar Formulario' : 'Mostrar Formulario'}
          </Button>
          <Button
            variant="secondary"
            onClick={() => setShowList(!showList)}
          >
            {showList ? 'Ocultar Lista' : 'Mostrar Lista'}
          </Button>
        </Col>

        <Col xs={12} md={4} className={`mb-4 ${showForm ? 'd-block' : 'd-none d-md-block'}`}>
          <Card className="p-3">
            <h3>{editingProduct ? 'Editar Producto' : 'Agregar Producto'}</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  placeholder="Nombre del producto"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  placeholder="Descripción del producto"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  placeholder="Precio del producto"
                />
              </Form.Group>
              <Button type="submit" variant="primary">
                {editingProduct ? 'Actualizar Producto' : 'Agregar Producto'}
              </Button>
              {editingProduct && (
                <Button
                  variant="secondary"
                  className="ms-2"
                  onClick={() => {
                    setEditingProduct(null);
                    setNewProduct({ name: '', description: '', price: 0 });
                  }}
                >
                  Cancelar
                </Button>
              )}
            </Form>
          </Card>
        </Col>

        <Col xs={12} md={8} className={`${showList ? 'd-block' : 'd-none d-md-block'}`}>
          <h2>Lista de Productos</h2>

          <InputGroup className="mb-3">
            <FormControl
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>${product.price}</td>
                  <td>
                    <Button
                      variant="warning"
                      className="me-2"
                      onClick={() => handleEdit(product)}
                    >
                      Actualizar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteClick(product)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal show={showDeleteModal} onHide={handleDeleteCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar el producto "{productToDelete?.name}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteCancel}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductList;