import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, Switch } from 'react-router-dom';
import Guess from './SecondPage';
import { BrowserRouter } from 'react-router-dom';
import {Input,Header,Segment,Button,Divider,Icon,Step,Grid,Form,Message,Confirm,Container,TextArea,Label } from 'semantic-ui-react'
import { Redirect } from 'react-router'

/////////
export default class MainMenu extends React.Component{
  constructor(props){
    super(props)
    this.state ={player1Name:'',player2Name:'',done:false}
    this.changeP1Name = this.changeP1Name.bind(this);
    this.changeP2Name = this.changeP2Name.bind(this);
    this.submitNames = this.submitNames.bind(this);
  }
  changeP1Name(event){
    this.setState({player1Name:event.target.value});
  }
  changeP2Name(event){
    this.setState({player2Name:event.target.value});
  }
  submitNames(event){
    this.setState({done:true,})
    event.preventDefault();
  }

  render(){
    if(this.state.done){
    return (<Redirect to={{
              pathname: 'submitWord',
              state: { p1Name: this.state.player1Name,p2Name:this.state.player2Name,currentPlayer:this.state.player1Name,
                      rounds:1,p1Score:0,p2Score:0}
          }} />)
   }
    return(
    <div className='firstPage'>
    <center>
      <Header inverted className="firstPageHeader" size='huge' as='h1'>Hangman</Header>
      <Form onSubmit={this.submitNames}>
        <Label className="firstPageLabels">
          Player 1 ENTER YOUR NAME:
          <Input type="text" onChange = {this.changeP1Name} value ={this.state.player1Name}/>
        </Label>
        <Divider hidden/>
        <Label className="firstPageLabels">
          Player 2 ENTER YOUR NAME:
          <Input type="text" onChange = {this.changeP2Name} value={this.state.player2Name}/>
        </Label>
        <Divider hidden/>
        <Button basic inverted type="submit">Ok</Button>
      </Form>

    </center>
    </div>
   );

}


  }
