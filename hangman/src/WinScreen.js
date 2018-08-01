import React from 'react';
import ReactDOM from 'react-dom';
import {Header,Label,Input,Button,Form,Divider} from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';
////
export default class WinScreen extends React.Component{
  constructor(props){
    super(props);
    this.state={menuFlag:false};
    this.setWinner = this.setWinner.bind(this);
    this.goBack = this.goBack.bind(this);
  }
  setWinner(){
    if(this.props.location.state.p1Score>this.props.location.state.p2Score)
      return ( "Congratulations " + this.props.location.state.p1Name +". You Won")

  if(this.props.location.state.p1Score==this.props.location.state.p2Score)
    return "It is a tie";
  return ("Congratulations " + this.props.location.state.p2Name +". You Won")
  }
  goBack(){
    this.setState({menuFlag:true});
  }

  render(){
    if(!this.props.location.state){
        return(<Redirect to={{
                pathname: '/'
                  }} />
        )
    }
    if(this.state.menuFlag){
    return(<Redirect to={{
            pathname: '/'
              }} />)
    }
    return(
      <center>
      <div className="win-screen">
        {this.setWinner()}
        <Divider hidden/>
        <Button basic inverted onClick={this.goBack}>Back to menu</Button>
     </div>
     </center>
    )
    }
  }
