import React from 'react';
import ReactDOM from 'react-dom';
import {Header,Label,Input,Button,Form,Divider,Image,Message,Icon,Modal} from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';
import './index.css'
import Keyboard from './Keyboard.js'
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
      playAgain:false,
      isHintHidden:false,
      isHintDone:false,
      isSuperHintDone:false,
      superHintMessage:false
    }
    this.generateHidden=this.generateHidden.bind(this);
    this.changeGuess=this.changeGuess.bind(this);
    this.validateGuess=this.validateGuess.bind(this);
    this.generateHiddenChar=this.generateHiddenChar.bind(this);
    this.checkEnd=this.checkEnd.bind(this);
    this.setCurrentPlayer=this.setCurrentPlayer.bind(this);
    this.playAgain=this.playAgain.bind(this);
    this.endGame=this.endGame.bind(this);
    this.dispHint=this.dispHint.bind(this);
    this.handleChar=this.handleChar.bind(this);
    this.dispSuperHint=this.dispSuperHint.bind(this);
    this.closeSuperHint=this.closeSuperHint.bind(this);
  }
  handleChar(char){
    this.setState({guessedChar:char})
    console.log(char,"Hennaaa")
    this.validateGuess(char);
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



  validateGuess(char){
      let word =this.props.location.state.word;
      let hidden =this.state.hiddenWord;
      if(word.toUpperCase().includes(char[0].toUpperCase())){
          hidden =this.generateHiddenChar(char[0],hidden);
          this.setState({hiddenWord:hidden});
          this.checkEnd('w',0,hidden);
        }
      else {
          this.setState({livesWasted:this.state.livesWasted+1})
          this.checkEnd('l',this.state.livesWasted+1);
        }

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
    if(lives==9){
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
dispHint(){
  if(this.state.livesWasted==8)
    return;
  if(this.state.isHintHidden)
    this.setState({isHintHidden:false});
  else {
    this.setState({isHintHidden:true});
  }
  if(!this.state.isHintDone){
    this.setState({isHintDone:true,livesWasted:this.state.livesWasted+1});
}
}
dispSuperHint(){
  if(this.state.livesWasted>=7){
    this.setState({superHintMessage:true,isSuperHintDone:true});
    return;
  }
  let wordPointer =0;
  let word=this.props.location.state.word.replace(/\s/g, '');
  let result = [];
  for(let i =0;i<this.state.hiddenWord.length;i++){
    if(this.state.hiddenWord.charAt(i)=='_'){
      result.push(word.charAt(wordPointer));
    }
    if(this.state.hiddenWord.charAt(i)!=' '&&this.state.hiddenWord.charAt(i)!='\xa0')
      wordPointer=wordPointer+1;
    }

  let char=result[Math.floor((Math.random() * (result.length-1)))];
  this.validateGuess(''+char);
  this.setState({livesWasted:this.state.livesWasted+2,isSuperHintDone:true});


  }
  closeSuperHint(){
    this.setState({superHintMessage:false});
  }

  render(){
    if(!this.props.location.state){
        return(<Redirect to={{
                pathname: '/'
                  }} />
        )
    }
    let trials = this.state.livesWasted;
    var image=require('./images/hangman-'+trials+'.png');
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
            <center>
            <div className="content">
              {this.props.location.state.currentPlayer},You {this.state.result} this round.
              <Divider hidden />
              {this.props.location.state.p1Name} Score:{this.state.p1Score}
              <Divider hidden />
              {this.props.location.state.p2Name} Score:{this.state.p2Score}
              <Divider hidden />
              <div style={{'margin-bottom':'100px'}}>
              The word was :
              <Divider hidden/>
                <Header inverted className="hiddenWord">
                                {this.props.location.state.word}
                              </Header>
              </div>
              <Divider hidden/>
                <div className="images">
                      <Image fluid src={image} />
                </div>
              <Divider hidden/>
              <Button basic inverted  onClick={this.playAgain}>Play Again</Button>
              <Button basic inverted onClick={this.endGame}>End Game</Button>
          </div>
          </center>
        )
      }else{

    return([
      <div>
      <div className="content">
        <Header style={{'font-family':'mario'}} inverted>Rounds:{this.state.rounds}</Header>
        <Divider fitted hidden/>
        Category:{this.props.location.state.category}
        <Divider fitted hidden />
        {this.props.location.state.p1Name}:{this.state.p1Score}
        <Divider fitted hidden />
        {this.props.location.state.p2Name}:{this.state.p2Score}
        <Divider hidden/>
        <Modal open={this.state.isHintHidden}  basic size='mini'>
          <Modal.Content id="modal-content">
          <Header id="modal-header" inverted>Hint:</Header>
          {this.props.location.state.hint}
          <Divider hidden fitted/>
          <Button  id="modal-button" basic size='huge' compact onClick={this.dispHint} color='teal'>OK</Button>
          </Modal.Content>
      </Modal>
      <Modal open={this.state.superHintMessage}  basic size='huge'>
        <Modal.Content id="modal-content">
          You can only use the super Hint if you have more than 2 lives left!
        <Divider hidden fitted/>
        <Button style={{'margin-left':'40%'}}  basic size='huge' compact onClick={this.closeSuperHint} color='teal'>OK</Button>
    </Modal.Content>
    </Modal>

      </div>
      <center>
      <div>

          <div className="images">
            <Image fluid src={image} />
          </div></div>
      </center>

    </div>,

        <div>
        <div className="content">
        <center>
        <Divider hidden fitted/>
        <Header inverted className="hiddenWord">
        {this.state.hiddenWord}
        </Header>
        <Keyboard handleChar={this.handleChar}/>
        <Divider hidden/>
        <Button data-tooltip="Generates a hint (cost:1 trial)" basic inverted onClick={this.dispHint}>Hint</Button>
        <Button data-tooltip="Generates a missing letter (cost: 2 trials)" basic inverted disabled={this.state.isSuperHintDone} onClick={this.dispSuperHint}>Super Hint</Button>
          </center>
        </div>
        </div>

    ])
  }
}
}
