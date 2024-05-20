import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Importing your main App component

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Rendering the App component into the element with id 'root'
);
