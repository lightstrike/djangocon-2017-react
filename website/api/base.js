// @flow
import fetch from 'isomorphic-fetch';

function getCsrfToken() {
  /**
   * Returns the 'csrftoken' or an empty string
   */
  const value = `; ${document.cookie}`;
  const parts = value.split('; csrftoken=');
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  return '';
}

export function get(url) {
  return fetch(url, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

export function post(url, body) {
  const formData = new FormData();
  Object.keys(body).map(key => formData.append(key, body[key]));
  return fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'X-CSRFToken': getCsrfToken(),
    },
    body: formData,
  });
}

export function xdelete(url: string) {
  /**
   * Called 'xdelete' rather than 'delete' because 'delete' is a reserved
   * keyword
   */
  return fetch(url, {
    method: 'DELETE',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': getCsrfToken(),
    },
  });
}
