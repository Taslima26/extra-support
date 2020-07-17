import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { getCategories, createSession } from '../../Redux/Actions';
import CategoryModal from '../../Components/Category/CategoryModal';
import Spinner from '../../Components/Spinner';

function mapStateToProps(state) {
  return {
    categories: state.categories.categories,
    isLoading: state.ActionController.isLoading,
  };
}

const SessionForm = ({ categories, getCategories, createSession, isLoading }) => {
  const [values, setValues] = React.useState({
    categoryId: '',
    title: '',
    description: '',
    requirements: '',
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    createSession(values);
  };

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <div style={{ width: '75%', marginLeft: '10%', marginTop: '5%' }}>
      <Spinner isLoading={isLoading} style={{width: '200px', height: '200px'}}/>
      <h1 style={{ margin: '5% 0 ' }}>Volunteers Session Form</h1>
      <hr />
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="categorySelect">Categories</Label>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Input
              type="select"
              name="categoryId"
              onChange={handleChange}
              value={values.categoryId}
              id="categorySelect"
              style={{ marginRight: '20px' }}
            >
              <option>Select here</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </Input>
            <CategoryModal />
          </div>
        </FormGroup>

        <FormGroup>
          <Label for="titleText">Title</Label>
          <Input
            type="text"
            name="title"
            onChange={handleChange}
            value={values.title}
            id="titleText"
            placeholder="Title"
          />
        </FormGroup>
        <FormGroup>
          <Label for="descriptionText">Description</Label>
          <Input
            type="textarea"
            name="description"
            onChange={handleChange}
            value={values.description}
            id="descriptionText"
            placeholder="Description"
          />
        </FormGroup>
        <FormGroup>
          <Label for="requirementsText">Requirements</Label>
          <Input
            type="textarea"
            name="requirements"
            onChange={handleChange}
            value={values.requirements}
            id="requirementsText"
            placeholder="Requirements"
          />
        </FormGroup>

        <Button disabled={isLoading} type="submit" color="primary">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default connect(
  mapStateToProps,
  { getCategories, createSession }
)(SessionForm);
