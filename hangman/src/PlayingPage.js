import React from 'react';
import ReactDOM from 'react-dom';
import {Header,Label,Input,Button,Form,Divider,Image} from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';
import './index.css'
import teezi from './images/hangman-0.png'
////
function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

export default class Game extends React.Component{
  constructor(props){
    super(props);
    this.state={
      rounds:this.props.location.state.rounds,
      p1Score:this.props.location.state.p1Score,
      p2Score:this.props.location.state.p2Score,
      hiddenWord:'',
      livesWasted:0,
      guessedChar:'',
      isRoundDone:false,
      result:'',
      playAgain:false
    }
    this.generateHidden=this.generateHidden.bind(this);
    this.changeGuess=this.changeGuess.bind(this);
    this.validateGuess=this.validateGuess.bind(this);
    this.generateHiddenChar=this.generateHiddenChar.bind(this);
    this.checkEnd=this.checkEnd.bind(this);
    this.setCurrentPlayer=this.setCurrentPlayer.bind(this);
    this.playAgain=this.playAgain.bind(this);
    this.endGame=this.endGame.bind(this);
  }
  generateHidden(){
    let hidden='';
    let word=this.props.location.state.word
    for(let i=0;i<word.length;i++){
      if(word.charAt(i)==' ')
          hidden+='\xa0\xa0\xa0\xa0\xa0'
      else
        hidden+='_ ';
    }
    this.setState({hiddenWord:hidden});
  }
  componentDidMount(){
    this.generateHidden();
  }
  changeGuess(event){
    this.setState({guessedChar:event.target.value})
   
  }
  generateHiddenChar(ch,str){
    let hidden=str;
    let word=this.props.location.state.word.replace(/\s/g, '');
    let pointer =0;
    for(let i=0;i<hidden.length;i++){
        if(hidden.charAt(i)=='_'){
          if(word.charAt(pointer).toUpperCase()==ch.toUpperCase())
            hidden = setCharAt(hidden,i,word.charAt(pointer));
        }
        if(str.charAt(i)!=' '&&str.charAt(i)!='\xa0')
          pointer=pointer+1;
        }

return hidden;
  }



  validateGuess(){
      let word =this.props.location.state.word;
      let hidden =this.state.hiddenWord;
      if(word.toUpperCase().includes(this.state.guessedChar.toUpperCase())){
          hidden =this.generateHiddenChar(this.state.guessedChar,hidden);
          this.setState({hiddenWord:hidden});
          this.checkEnd('w',0,hidden);
        }
      else {
          this.setState({livesWasted:this.state.livesWasted+1})
          this.checkEnd('l',this.state.livesWasted+1);
        }
        console.log(this.input);
        this.input.inputRef.value='';
        this.input.inputRef.placeholder='Enter Letter';
  }
  checkEnd(str,lives,hidden){
    let p1score=this.state.p1Score;
    let p2score=this.state.p2Score;
    let changeW ='';
    if(this.props.location.state.currentPlayer==this.props.location.state.p1Name){
        changeW='p1';
      }
      else{
        changeW='p2';
      }

    if(str=='w'){
      if(!hidden.includes('_')){
        if(changeW=='p1')
          p1score++;
        else
          p2score++;
        this.setState({isRoundDone:true,p1Score:p1score,p2Score:p2score,result:'won',rounds:this.state.rounds+1});}
      return;
    }
    if(lives==8){
      if(changeW=='p1')
        p2score++;
      else
        p1score++;
      this.setState({isRoundDone:true,p1Score:p1score,p2Score:p2score,result:'lost',rounds:this.state.rounds+1});
    }
  }
  setCurrentPlayer(){
    if(this.props.location.state.currentPlayer==this.props.location.state.p1Name)
      return this.props.location.state.p2Name;
    return this.props.location.state.p1Name;
  }
playAgain(){
  this.setState({playAgain:true});
}
endGame(){
  this.setState({endGame:true})
}
  render(){
    if(!this.props.location.state){
        return(<Redirect to={{
                pathname: '/'
                  }} />
        )
    }else 
    if(this.state.endGame){
      return(
        <Redirect to={{
                pathname: '/Winscreen',
                state:{p1Name:this.props.location.state.p1Name,
                       p2Name:this.props.location.state.p2Name,
                       rounds:this.props.location.state.rounds,
                       p1Score:this.state.p1Score,
                       p2Score:this.state.p2Score

                }
                  }} />
            )
          }else
    if(this.state.playAgain){
      return(  <Redirect to={{
                pathname: 'submitWord',
                state: { p1Name: this.props.location.state.p1Name,p2Name:this.props.location.state.p2Name,currentPlayer:this.setCurrentPlayer(),
                         rounds:this.state.rounds,p1Score:this.state.p1Score,p2Score:this.state.p2Score}
            }} />


      )

    }else
    if(this.state.isRoundDone){
      return(
          <div>
            {this.props.location.state.currentPlayer},You {this.state.result} this round.
            <Divider hidden fitted/>
            {this.props.location.state.p1Name} Score:{this.state.p1Score}
            <Divider hidden fitted/>
            {this.props.location.state.p2Name} Score:{this.state.p2Score}
            <Divider hidden fitted/>
            <Button primary onClick={this.playAgain}>Play Again</Button>
            <Button secondary onClick={this.endGame}>End Game</Button>
          </div>
        )
      }else{
    return([
    <div className="content">
     
        <Header>Rounds:{this.state.rounds}</Header>
        <Divider hidden fitted/>
        {this.props.location.state.p1Name}:{this.state.p1Score}
        <Divider hidden fitted/>
        {this.props.location.state.p2Name}:{this.state.p2Score}
        <Divider hidden fitted/>
        TrialsWasted:{this.state.livesWasted}
        <Divider hidden fitted/>
        Category:{this.props.location.state.category}
        <Divider hidden fitted/>
        {this.state.hiddenWord}
        <Divider hidden fitted/>
        <Input compact maxLength='1' type="text" placeholder='Enter Letter' ref={(a)=>{this.input=a}} onChange={this.changeGuess}/>
        <Button primary onClick={this.validateGuess}>Ok</Button>
     
    </div>,
    <div className="images">
      <Image fluid src={teezi} />
    </div>
    ])
  }
}
}

