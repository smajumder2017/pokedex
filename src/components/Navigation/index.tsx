import React from 'react';
import { Navbar, Nav, Form, FormControl, NavDropdown, Button } from 'react-bootstrap';
import pokeballImage from './../../assets/pokeball.svg';

const Navigation: React.FC = () => {
  return (
    <Navbar  bg="dark" variant="dark" fixed="top" expand="lg">
      <Navbar.Brand href="#home">
        <img
          alt=""
          src={pokeballImage}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
        {' Pokedex'}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation;