/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button, Image,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBarAuth() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Image
          src="/Rootbeer.png"
          alt="Root Beer Logo"
          width={75}
          height={75}
          className="d-inline-block align-top"
        />
        <Link passHref href="/">
          <Navbar.Brand>Root Beer Recommend</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link href="/rootBeer/new" passHref>
              <Nav.Link>Recommend</Nav.Link>
            </Link>
            <Link href="/Stores/stores" passHref>
              <Nav.Link>Stores</Nav.Link>
            </Link>
            <Link href="/Stores/new" passHref>
              <Nav.Link>Add Store</Nav.Link>
            </Link>
            <Link href="/user/user" passHref>
              <Nav.Link>My Recommends</Nav.Link>
            </Link>
            <Link href="/user/favorites" passHref>
              <Nav.Link>My Favorites</Nav.Link>
            </Link>
            <Button variant="danger" onClick={signOut}>Sign Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
