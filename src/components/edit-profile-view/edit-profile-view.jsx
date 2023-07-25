import { useParams, useNavigate } from 'react-router';
import { Card, Button, Form, Row } from 'react-bootstrap';
import { UpdateUser } from '../../services/api-calls';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setUsername,
  setPassword,
  setBirthday,
  setEmail
} from '../../redux/reducers/updatedUserInfo';
import { setUser } from '../../redux/reducers/user';

export const EditProfileView = () => {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  const newUsername = useSelector((state) => state.updatedUserInfo.username);
  const newPassword = useSelector((state) => state.updatedUserInfo.password);
  const newEmail = useSelector((state) => state.updatedUserInfo.email);
  const newBirthday = useSelector((state) => state.updatedUserInfo.birthday);

  const { username } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!user) {
    return;
  }

  useEffect(() => {
    dispatch(setUsername(user.Username));
    dispatch(setPassword(''));
    dispatch(setEmail(user.Email));
    dispatch(setBirthday(user.Birthday));
  }, []);

  if (newBirthday === '') {
    return;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      Username: newUsername,
      Password: newPassword,
      Email: newEmail,
      Birthday: newBirthday
    };

    UpdateUser(user, userData, token).then((data) => {
      localStorage.setItem('user', JSON.stringify(data));
      dispatch(setUser(data));
    });

    navigate(`../users/${encodeURIComponent(userData.Username)}`, {
      replace: true
    });
  };

  let date = new Date(newBirthday);

  let dateString = new Date(date.getTime()).toISOString().split('T')[0];

  return username === user.Username ? (
    <Card bg="secondary" className="custom-card">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={newUsername}
              onChange={(e) => dispatch(setUsername(e.target.value))}
              required
              minLength={5}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={newPassword}
              onChange={(e) => dispatch(setPassword(e.target.value))}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={newEmail}
              onChange={(e) => dispatch(setEmail(e.target.value))}
              required
            />
          </Form.Group>

          <Form.Group className="mb-1" controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              type="date"
              value={dateString}
              onChange={(e) => dispatch(setBirthday(e.target.value))}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Card.Body>
    </Card>
  ) : (
    <Row>Invalid username</Row>
  );
};
