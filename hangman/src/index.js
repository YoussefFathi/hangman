import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainMenu from './FirstPage';
import SecondPage from './SecondPage';
import PlayingPage from './PlayingPage';
import {Header,Label,Input,Button,Form} from 'semantic-ui-react';
import { BrowserRouter } from 'react-router-dom';
import { Link, Route, Switch } from 'react-router-dom';
////
class Entry extends React.Component{
  constructor(props){
    super(props);
    //this.state=({p1Name:'Test',p2Name:''})
  }



  render(){
    return(
    <BrowserRouter>
      <div>
      <Route exact path="/" component={MainMenu}></Route>
      <Route exact path="/submitWord" component={SecondPage}></Route>
      <Route exact path="/Game" component={PlayingPage}></Route>
      </div>
    </BrowserRouter>

  )
  }

}
ReactDOM.render(<Entry />
  , document.getElementById('root'));
