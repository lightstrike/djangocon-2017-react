import React from 'react';

const djangoLogo = require('website/build/django-logo-negative.png');

function Footer() {
  return (
    <footer>
      <img src={djangoLogo} alt="Django logo" />
      <h3>Made with Love</h3>
    </footer>
  );
}

export default Footer;
