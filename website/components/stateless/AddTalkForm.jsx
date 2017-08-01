import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

const propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
};

const defaultProps = {
  handleSubmit: null,
  submitting: false,
};

function AddTalkForm({ handleSubmit, submitting }) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <div>
          <Field
            id="title"
            name="title"
            component="input"
            type="text"
            placeholder="Title"
          />
        </div>
      </div>
      <div>
        <label htmlFor="speakerName">Speaker Name</label>
        <div>
          <Field
            id="speakerName"
            name="speakerName"
            component="input"
            type="text"
            placeholder="Speaker Name"
          />
        </div>
      </div>
      <div>
        <label htmlFor="youtubeUrl">Youtube URL</label>
        <div>
          <Field
            id="youtubeUrl"
            name="youtubeUrl"
            component="input"
            type="url"
            placeholder="Youtube URL"
          />
        </div>
      </div>
      <div>
        <label htmlFor="date">Date</label>
        <div>
          <Field
            id="date"
            name="date"
            component="input"
            type="date"
            placeholder="Date"
          />
        </div>
      </div>
      <div>
        <label htmlFor="Description">Description</label>
        <div>
          <Field
            id="description"
            name="description"
            component="textarea"
            type="text"
            placeholder="Description"
          />
        </div>
      </div>
      <button type="submit" disabled={submitting}>Add Talk</button>
    </form>
  );
}

AddTalkForm.propTypes = propTypes;
AddTalkForm.defaultProps = defaultProps;

export default reduxForm({
  form: 'AddTalkForm',
})(AddTalkForm);

