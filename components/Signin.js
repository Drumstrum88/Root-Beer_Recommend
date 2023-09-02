import React from 'react';
import { Button, Container, Image } from 'react-bootstrap'; // Import Image and Container
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      id="Sign-in"
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <Container className="signIn">
        <Image
          id="sign-in-logo"
          src="/CommunityLogo.png"
          alt="Root Beer Logo"
          width={75}
          height={75}
          className="d-inline-block align-top"
        />
        <Button id="signInBtn" type="button" size="lg" className="copy-btn" onClick={signIn}>
          Sign In
        </Button>
      </Container>
    </div>
  );
}

export default Signin;
