import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Col, Row, Card } from 'react-bootstrap';
import { setFilter } from '../../redux/reducers/movies';

export const MoviesFilter = () => {
  const filter = useSelector((state) => state.movies.filter);
  const dispatch = useDispatch();

  return (
    <Row className="justify-content-md-center">
      <Col md={8}>
        <Card className="mb-2 custom-card">
          <Form.Control
            type="text"
            placeholder="Search"
            value={filter}
            onChange={(e) => dispatch(setFilter(e.target.value))}
          />
        </Card>
      </Col>
    </Row>
  );
};
