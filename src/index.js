import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'tachyons';//this overrides some bootstrap css classes
import './index.css'; 

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
