import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';

const MyNavbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Mi prueba tecnica</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated && <Nav.Link href="/">Productos</Nav.Link>}
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <Nav.Link onClick={logout}>Cerrar Sesión</Nav.Link>
            ) : (
              <Nav.Link href="/login">Iniciar Sesión</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;