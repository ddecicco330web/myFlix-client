export const login = (username, password, onLoggedIn) => {
  fetch(
    'https://my-flix330.herokuapp.com/login?' +
      new URLSearchParams({
        Username: username,
        Password: password
      }),
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log('Login response: ', data);
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        onLoggedIn(data.user, data.token);
      } else {
        alert('No such user');
      }
    })
    .catch((e) => {
      alert('Something went wrong');
    });
};

export const signup = (data) => {
  fetch('https://my-flix330.herokuapp.com/users', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    if (response.ok) {
      alert('Signup successful');
      window.location.reload();
    } else {
      alert('Signup failed');
    }
  });
};
