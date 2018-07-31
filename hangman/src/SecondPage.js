import React from 'react';
import ReactDOM from 'react-dom';
import {Header,Label,Input,Button,Form,Dropdown} from 'semantic-ui-react';
import { Link, Route, Switch } from 'react-router-dom';
import PlayingPage from './PlayingPage';
import { BrowserRouter } from 'react-router-dom';
import { Redirect } from 'react-router'
import './index.css'
////
const categoryOptions = [
  {key:'movTV', text:'Movies&Tv',value:'Movies&Tv'},
  {key:'games', text:'Games',value:'Games'},
  {key:'food' ,text:'Food',value:'Food'}];
///
export default class Guess extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      word:'',
      hint:'',
      done:false,
      category:''
      }
  this.guess = this.guess.bind(this);
  this.changeWord = this.changeWord.bind(this);
  this.changeHint = this.changeHint.bind(this);
  this.changeCategory = this.changeCategory.bind(this);
  }
  guess(event){

    this.setState({done:true});
  }
  changeWord(event){
    this.setState({word:event.target.value});
  }
  changeHint(event){
    this.setState({hint:event.target.value});
  }
  changeCategory = (e, { value }) => this.setState({ category:value })





  render(){
    if(!this.props.location.state){
        return(<Redirect to={{
                pathname: '/'
                  }} />
        )
    }
    if(this.state.done){
      return(<Redirect to={{
              pathname: '/Game',
              state:{p1Name:this.props.location.state.p1Name,
                     p2Name:this.props.location.state.p2Name,
                     word:this.state.word,
                     hint:this.state.hint,
                     category:this.state.category,
                     currentPlayer:this.props.location.state.currentPlayer,
                     rounds:this.props.location.state.rounds,
                     p1Score:this.props.location.state.p1Score,
                     p2Score:this.props.location.state.p2Score

              }
                }} />
      )
    }
    return(
      <div style={{'margin-top':'50px'}}className="content">
        <center>
        <Header inverted className="secondPageHeader">It's {this.props.location.state.currentPlayer}'s turn</Header>
        <Header as='h2' inverted className="secondPageHeader" style={{'font-size':'45px'}}>Now Enter Your Word</Header>

        <Form  vertical onSubmit={this.guess}>
          <Form.Field width='5' compact>
          <Input type="text" placeholder="Enter a word" value={this.state.word} onChange={this.changeWord}/>
          </Form.Field>
          <Form.Field  width='5'>
          <Dropdown placeholder='Select a category'   onChange={this.changeCategory} compact selection value={this.state.category} options={categoryOptions} />
          </Form.Field>
          <Form.Field  width='5'>
          <Input type="text" placeholder="Hint" value={this.state.hint} onChange={this.changeHint}/>
          </Form.Field>
          <Button basic inverted type = "submit">OK</Button>
        </Form>
        </center>
      </div>

    )


  }
}
