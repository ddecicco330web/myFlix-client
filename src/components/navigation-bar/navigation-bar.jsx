import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setToken } from '../../redux/reducers/user';

//import { Col } from 'react-bootstrap';

export const NavigationBar = () => {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  const dispatch = useDispatch();

  return (
    <Navbar variant="dark" bg="primary" expand="lg">
      <Container>
        <Navbar.Brand className="text-light ms-1" as={Link} to="/">
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
                  onClick={() => {
                    dispatch(setUser(null));
                    dispatch(setToken(null));
                    localStorage.clear();
                  }}
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
