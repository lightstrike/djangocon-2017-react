import React, { Component } from 'react';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { postTalk } from 'website/redux/talk';

const propTypes = {
  submitTalk: PropTypes.func.isRequired,
};

const defaultProps = {};

const mapDispatchToProps = dispatch => ({
  submitTalk(body) {
    dispatch(postTalk(body));
  },
});

class AddTalkForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      speakerName: '',
      youtubeUrl: '',
      date: '',
      description: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  submitTalk = () => {
    const { submitTalk } = this.props;
    const { title, speakerName, youtubeUrl, date, description } = this.state;

    const body = {
      title,
      speakerName,
      youtubeUrl,
      date,
      description,
    };

    submitTalk(body);
  }

  validTalk = () => {
    const { title, speakerName, youtubeUrl, date, description } = this.state;
    if (!title || !speakerName || !youtubeUrl || !date || !description) {
      return false;
    }
    return true;
  }

  render() {
    const { title, speakerName, youtubeUrl, date, description } = this.state;
    return (
      <div>
        <div className="form-group row">
          <label className="col-2 col-form-label" htmlFor="title">Title</label>
          <div className="col-10">
            <input
              className="form-control"
              value={title}
              name="title"
              type="text"
              placeholder="Title"
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-2 col-form-label" htmlFor="speakerName">Speaker Name</label>
          <div className="col-10">
            <input
              className="form-control"
              value={speakerName}
              name="speakerName"
              type="text"
              placeholder="Speaker name"
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-2 col-form-label" htmlFor="youtubeUrl">YouTube URL</label>
          <div className="col-10">
            <input
              className="form-control"
              value={youtubeUrl}
              name="youtubeUrl"
              type="text"
              placeholder="YouTube URL"
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-2 col-form-label" htmlFor="date">Date</label>
          <div className="col-10">
            <input
              className="form-control"
              value={date}
              name="date"
              type="date"
              placeholder="Date"
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-2 col-form-label" htmlFor="description">Description</label>
          <div className="col-10">
            <textarea
              className="form-control"
              value={description}
              name="description"
              rows="4"
              placeholder="Description"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <button
          className="btn btn-success"
          type="submit"
          disabled={!this.validTalk()}
          onClick={this.submitTalk}
        >
          Add Talk
        </button>

      </div>
    );
  }
}

AddTalkForm.propTypes = propTypes;
AddTalkForm.defaultProps = defaultProps;

const ConnectedAddTalkForm = connect(
  null,
  mapDispatchToProps,
)(AddTalkForm);

export default ConnectedAddTalkForm;
