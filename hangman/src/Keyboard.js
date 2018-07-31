import React from 'react'
import './keyboard.css'
import {Button} from 'semantic-ui-react'
export default class Keyboard extends React.Component{
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this)
    }
    handleClick(e){
		
       if(e.target.attributes[1]){
        console.log(e.target.attributes)
        this.props.handleChar(e.target.innerText)
        e.target.attributes[1].ownerElement.disabled=true;
       }else{
		e.target.parentNode.attributes[1].ownerElement.disabled=true;
		this.props.handleChar(e.target.innerText)
	   }
       
    }
    render(){
        return([
        <div id="keyboard">
    	<ul className="cf" id="numbers">
	    	<li><Button onClick={(e)=>{this.handleClick(e)}}  className="key c49"><span>1</span></Button></li>
	    	<li><Button onClick={(e)=>{this.handleClick(e)}} className="key c50"><span>2</span></Button></li>
	    	<li><Button onClick={(e)=>{this.handleClick(e)}} className="key c51"><span>3</span></Button></li>
	    	<li><Button onClick={(e)=>{this.handleClick(e)}} className="key c52"><span>4</span></Button></li>
	    	<li><Button onClick={(e)=>{this.handleClick(e)}} className="key c53"><span>5</span></Button></li>
	    	<li><Button onClick={(e)=>{this.handleClick(e)}} className="key c54"><span>6</span></Button></li>
	    	<li><Button onClick={(e)=>{this.handleClick(e)}} className="key c55"><span>7</span></Button></li>
	    	<li><Button onClick={(e)=>{this.handleClick(e)}} className="key c56"><span>8</span></Button></li>
	    	<li><Button onClick={(e)=>{this.handleClick(e)}} className="key c57"><span>9</span></Button></li>
	    	<li><Button onClick={(e)=>{this.handleClick(e)}} className="key c48"><span>0</span></Button></li>
        </ul>
    	<ul className="cf" id="qwerty">
	    	{/* <li><a className="key c9" id="tab"><span>tab</span></a></li> */}
	    	<li><Button onClick={(e)=>{this.handleClick(e)}} className="key c81"><span>q</span></Button></li>
	    	<li><Button onClick={(e)=>{this.handleClick(e)}} className="key c87"><span>w</span></Button></li>
	    	<li><Button onClick={(e)=>{this.handleClick(e)}} className="key c69"><span>e</span></Button></li>
	    	<li><Button onClick={(e)=>{this.handleClick(e)}} className="key c82"><span>r</span></Button></li>
	    	<li><Button onClick={(e)=>{this.handleClick(e)}} className="key c84"><span>t</span></Button></li>
	    	<li><Button onClick={(e)=>{this.handleClick(e)}} className="key c89"><span>y</span></Button></li>
	    	<li><Button onClick={(e)=>{this.handleClick(e)}} className="key c85"><span>u</span></Button></li>
	    	<li><Button onClick={(e)=>{this.handleClick(e)}} className="key c73"><span>i</span></Button></li>
	    	<li><Button onClick={(e)=>{this.handleClick(e)}} className="key c79"><span>o</span></Button></li>
	    	<li><Button onClick={(e)=>{this.handleClick(e)}} className="key c80"><span>p</span></Button></li>
	    	{/* <li><a className="key c219 alt"><span>[</span></a></li>
	    	<li><a className="key c221 alt"><span>]</span></a></li>
	    	<li><a className="key c220 alt"><span>\</span></a></li> */}
        </ul>
        <ul className="cf" id="asdfg">
	    	{/* <li><a className="key c20 alt" id="caps">span>caps lock</span></a></li> */}
	    	<li><Button onClick={(e)=>{this.handleClick(e)}} className="key c65"><span>a</span></Button></li>
	    	<li><Button onClick={(e)=>{this.handleClick(e)}} className="key c83"><span>s</span></Button></li>
	    	<li><Button onClick={(e)=>{this.handleClick(e)}} className="key c68"><span>d</span></Button></li>
	    	<li><Button onClick={(e)=>{this.handleClick(e)}} className="key c70"><span>f</span></Button></li>
	    	<li><Button onClick={(e)=>{this.handleClick(e)}} className="key c71"><span>g</span></Button></li>
	    	<li><Button onClick={(e)=>{this.handleClick(e)}} className="key c72"><span>h</span></Button></li>
	    	<li><Button onClick={(e)=>{this.handleClick(e)}} className="key c74"><span>j</span></Button></li>
	    	<li><Button onClick={(e)=>{this.handleClick(e)}} className="key c75"><span>k</span></Button></li>
	    	<li><Button onClick={(e)=>{this.handleClick(e)}} className="key c76"><span>l</span></Button></li>
	    	{/* <li><a className="key c186 alt"><span>;</span></a></li>
	    	<li><a className="key c222 alt"><span>'</span></a></li>
	    	<li><a className="key c13 alt" id="enter"><span>return</span></a></li> */}
        </ul>
        <ul className="cf" id="zxcvb">
	    	{/* <li><a className="key c16 shiftleft"><span>Shift</span></a></li> */}
	    	<li><Button onClick={(e)=>{this.handleClick(e)}} className="key c90"><span>z</span></Button></li>
	    	<li><Button onClick={(e)=>{this.handleClick(e)}} className="key c88"><span>x</span></Button></li>
	    	<li><Button onClick={(e)=>{this.handleClick(e)}} className="key c67"><span>c</span></Button></li>
	    	<li><Button onClick={(e)=>{this.handleClick(e)}} className="key c86"><span>v</span></Button></li>
	    	<li><Button onClick={(e)=>{this.handleClick(e)}} className="key c66"><span>b</span></Button></li>
	    	<li><Button onClick={(e)=>{this.handleClick(e)}} className="key c78"><span>n</span></Button></li>
	    	<li><Button onClick={(e)=>{this.handleClick(e)}} className="key c77"><span>m</span></Button></li>
	    	{/* <li><a className="key c188 alt">/b><span>,</span></a></li>
	    	<li><a className="key c190 alt">/b><span>.</span></a></li>
	    	<li><a className="key c191 alt"><span>/</span></a></li>
	    	<li><a className="key c16 shiftright"><span>Shift</span></a></li> */}
        </ul>
		<ul className="cf" id="bottomrow">
	    	{/* <li><a className="key" id="fn"><span>fn</span></a></li>
	    	<li><a className="key c17" id="control"><span>control</span></a></li>
	    	<li><a className="key option" id="optionleft"><span>option</span></a></li>
	    	<li><a className="key command" id="commandleft"><span>command</span></a></li>
	    	<li><a className="key c32" id="spacebar"></a></li>
	    	<li><a className="key command" id="commandright"><span>command</span></a></li>
	    	<li><a className="key option" id="optionright"><span>option</span></a></li> */}
            <ol className="cf">
            	{/* <li><a className="key c37" id="left"><span></span></a></li>
                <li>
                	<a className="key c38" id="up"><span></span></a>
                	<a className="key c40" id="down"><span></span></a>
                </li>
            	<li><a className="key c39" id="right"><span></span></a></li> */}
            </ol>
        </ul>
    </div>
            ])
    }
}