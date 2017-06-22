import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Container from './maps/Container';

import './index.css';

// ...

ReactDOM.render(

<Container google={window.google} />,
  document.getElementById('root')
);
