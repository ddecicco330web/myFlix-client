import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="primary" expand="lg">
      <Container>
        <Navbar.Brand className="text-light" as={Link} to="/">
          myFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link className="text-light" as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link className="text-light" as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link className="text-light" as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link
                  className="text-light"
                  as={Link}
                  to={`/users/${encodeURIComponent(user.Username)}`}
                >
                  Profile
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/login"
                  className="text-light"
                  onClick={onLoggedOut}
                >
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
