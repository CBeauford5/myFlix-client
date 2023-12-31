import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, setUser, movies }) => {
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthDate);
  const [showModal, setShowModal] = useState(false);
  const favoriteMovies = movies.filter((movie) => {
    return user.favoriteMovies.includes(movie._id)
  });

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email,
      birthDate: birthday
    };

    fetch(`https://my-movie-database-api-b1811320c6f7.herokuapp.com/users/${user.username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert("Update failed.")
      }
    }).then((data) => {
      alert("Successfully updated user!");
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    })
  };

  const handleDeleteUser = () => {
    fetch(`https://my-movie-database-api-b1811320c6f7.herokuapp.com/users/${user.username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
      } else {
        alert("something went wrong.")
      }
    }).then ( ()=> {
      setShowModal(false);
      alert("Your account has successfully been deleted")
    })
  }

  return (
    <>
      
      <h1>Profile</h1>
      <Row>
        <Col>
          <div>Username: {user.username}</div>
          <div>Email: {user.email}</div>
          <br />
        </Col>
      </Row>
      <Row>
      <Row>
        <h3>Favorite movies:</h3>
        {favoriteMovies.map((movie) => (
          <Col className="mb-5" key={movie._id} md={2}>
            <MovieCard movie={movie}></MovieCard>
          </Col>
        ))}
      </Row>

        <h2>Update your profile information here:</h2>
        <br />

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="5"
            />
          </Form.Group>
          <br />

          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="5"
            />
          </Form.Group>
          <br />

          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <br />

          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </Form.Group>
          <br />

          <Button className="mb-4 mt-1" variant="primary" type="submit">Save changes</Button>
        </Form>
      </Row>
      
      <Button variant="primary" className=" mb-5" onClick={handleShowModal}>
        Delete my account
      </Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete account</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your account permanantly?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleDeleteUser}>Yes</Button>
          <Button variant="secondary" onClick={handleCloseModal}>No</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
