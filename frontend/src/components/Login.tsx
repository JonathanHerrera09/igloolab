// src/components/Login.tsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import '../css/Login.css';

const Login: React.FC = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      alert('Usuario registrado correctamente');
      setIsRegistering(false);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Error al registrar usuario');
    }
  };

  return (
    <Container fluid className="login-container">
      <Row className="h-100">
        <Col md={6} className="d-none d-md-block image-column">
          <div className="image-overlay">
            <h1>Bienvenido</h1>
            <p>Gestiona tus productos de manera eficiente.</p>
          </div>
        </Col>
        <Col md={6} className="form-column d-flex align-items-center justify-content-center">
          <Card className="form-card">
            <Card.Body>
              <h2 className="text-center mb-4">
                {isRegistering ? 'Registrarme' : 'Iniciar Sesión'}
              </h2>
              <Form onSubmit={isRegistering ? handleRegister : handleLogin}>
                {isRegistering && (
                  <Form.Group className="mb-3">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingresa tu usuario"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </Form.Group>
                )}
                <Form.Group className="mb-3">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingresa tu correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mb-3">
                  {isRegistering ? 'Registrarme' : 'Iniciar Sesión'}
                </Button>
                <p className="text-center">
                  {isRegistering ? (
                    <>
                      ¿Ya tienes una cuenta?{' '}
                      <Button variant="link" onClick={() => setIsRegistering(false)}>
                        Iniciar Sesión
                      </Button>
                    </>
                  ) : (
                    <>
                      ¿No tienes una cuenta?{' '}
                      <Button variant="link" onClick={() => setIsRegistering(true)}>
                        Registrarme
                      </Button>
                    </>
                  )}
                </p>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;