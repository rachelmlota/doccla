import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

const Nav = () => <Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="/">Dogs CEO</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
  </Container>
</Navbar>

export default Nav;