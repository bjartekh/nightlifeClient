import React from 'react';
import ReactDOM from 'react-dom';
import Container from './maps/Container';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

// ...

ReactDOM.render(

<Container google={window.google} />,
  document.getElementById('root')
);
