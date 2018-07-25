import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
///
class Main extends React.Component{
  constructor(props){
    super(props)
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
