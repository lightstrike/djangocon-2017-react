import React from 'react';
import ReactDOM from 'react-dom';

import App from 'website/App';

const AppRoot = () => (
  <App />
);

ReactDOM.render(
  <AppRoot />,
  document.getElementById('root'),
);
