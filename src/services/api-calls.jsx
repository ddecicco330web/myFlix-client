export const Login = (username, password) => {
  return fetch(
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
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        return data;
      } else {
        alert('No such user');
      }
    })
    .catch((e) => {
      alert('Something went wrong: ' + e);
    });
};

export const Signup = (data) => {
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

export const GetMovies = (token) => {
  return fetch('https://my-flix330.herokuapp.com/movies', {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => {
      alert('Unable to get movies');
    });
};

export const UpdateUser = (user, userData, token) => {
  return fetch(
    `https://my-flix330.herokuapp.com/users/${encodeURIComponent(
      user.Username
    )}`,
    {
      method: 'PUT',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  )
    .then((response) => {
      if (response.ok) {
        alert('Update successful');
        return response.json();
      } else {
        alert('Update failed');
      }
    })
    .catch((e) => {
      alert(e);
    });
};

export const DeleteUser = (username, token) => {
  fetch(
    `https://my-flix330.herokuapp.com/users/${encodeURIComponent(username)}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
    .then((response) => {
      if (response.ok) {
        alert('Deletion successful');
      } else {
        alert('Deletion failed');
      }
    })
    .catch((e) => alert(e));
};

export const AddFavoriteMovie = (user, movie, token) => {
  return fetch(
    `https://my-flix330.herokuapp.com/users/${encodeURIComponent(
      user.Username
    )}/movies/${encodeURIComponent(movie.id)}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
    .then((response) => {
      if (response.ok) {
        alert('Added to favorites');
        return response.json();
      } else {
        alert('Unable to add to favorites');
      }
    })
    .catch((e) => alert(e));
};

export const RemoveFromFavorites = (user, movie, token) => {
  return fetch(
    `https://my-flix330.herokuapp.com/users/${encodeURIComponent(
      user.Username
    )}/movies/${encodeURIComponent(movie.id)}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
    .then((response) => {
      if (response.ok) {
        alert('Movie removed');
        return response.json();
      } else {
        alert('Failed to remove movie');
      }
    })
    .catch((e) => alert(e));
};
