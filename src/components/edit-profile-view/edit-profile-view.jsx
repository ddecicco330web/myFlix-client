import { useParams } from 'react-router';
import { Card, Button, Form } from 'react-bootstrap';
import { UpdateUser } from '../../services/api-calls';

export const EditProfileView = ({
  users,
  newUsername,
  setNewUsername,
  newPassword,
  setNewPassword,
  newEmail,
  setNewEmail,
  newBirthday,
  setNewBirthday,
  token,
  setUser
}) => {
  if (users.length === 0) {
    return;
  }
  const { username } = useParams();
  const user = users.find((arrUser) => arrUser.username === username);

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      Username: newUsername,
      Password: newPassword,
      Email: newEmail,
      Birthday: newBirthday
    };

    UpdateUser(user, userData, token, setUser);
  };

  let date = new Date(newBirthday);

  let dateString = new Date(date.getTime()).toISOString().split('T')[0];

  return (
    <Card bg="secondary" className="custom-card">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              required
              minLength={5}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-1" controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              type="date"
              value={dateString}
              onChange={(e) => setNewBirthday(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
