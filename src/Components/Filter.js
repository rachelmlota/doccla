import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { BREED, SUB_BREED, IMAGE_COUNT, NO_BREED_MESSAGE, NO_IMAGE_COUNT_MESSAGE } from 'Utils/Constants';

const Filter = ({ apiData, formData, handleChange, onSubmit, validated }) => {
  const{ breeds, subBreeds } = apiData;
  const { breed } = formData;

  return (
    <Form className="my-5" noValidate validated={validated} onSubmit={(e) => onSubmit(e)}> 
      <Row>
        <Col>
          <Form.Select 
            required
            aria-label={BREED}
            name={BREED}
            label={BREED}
            value={formData[BREED]}
            onChange={(e) => handleChange(e)}
          >
            <option value="">Select Breed</option>
            {breeds.map((breed, idx) => <option value={breed} key={idx}>{breed}</option>)}
          </Form.Select>
          <Form.Control.Feedback type="invalid">{NO_BREED_MESSAGE}</Form.Control.Feedback>
        </Col>
        <Col>
          <Form.Select 
            aria-label={SUB_BREED}
            name={SUB_BREED}
            label={SUB_BREED}
            disabled={!breed}
            value={formData[SUB_BREED]}
            onChange={(e) => handleChange(e)}
          >
            <option value="">Select subBreed</option>
            {subBreeds.map((subBreed, idx) => <option value={subBreed} key={idx}>{subBreed}</option>)}
          </Form.Select>
        </Col>
        <Col>
          <Form.Select
            required 
            aria-label={IMAGE_COUNT} 
            name={IMAGE_COUNT}
            label={IMAGE_COUNT}
            value={formData[IMAGE_COUNT]}
            onChange={(e) => handleChange(e)}
          >
            <option value=''>Select Num. of Images</option>
            {[...Array(10).keys()].map((num) => <option value={num + 1} key={num}>{num + 1}</option>)}
          </Form.Select>
          <Form.Control.Feedback type="invalid">{NO_IMAGE_COUNT_MESSAGE}</Form.Control.Feedback>
        </Col>
        <Col>
          <Button aria-label="Search" name="Search" type="submit">View Images</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default Filter;