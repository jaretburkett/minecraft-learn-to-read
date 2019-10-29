import React, {Component} from 'react';
import './style.scss';
import words from './words';
import Mousetrap from 'mousetrap';
import cloudBg from './img/sky.png'
import ProgressBlock from './components/ProgressBlock'

const fonts = [
    "'Open Sans', sans-serif",
    "'Quicksand', sans-serif",
    "'arcadepixregular', monospace",
];

function randomWord(){
    return words[Math.floor(Math.random()*words.length)];
}
function randomFont(){
    return fonts[Math.floor(Math.random()*fonts.length)];
}

const headStart = 5;
const blocksAcross = 30;



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word:randomWord(),
            font:randomFont(),
            numRight:0,
            numWrong:0,
            didWin:false,
            didLose:false
        };
        this.updateWord = this.updateWord.bind(this);
        this.updateWinLose = this.updateWinLose.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }

    updateWord(){
        let newWord = this.state.word;
        while(newWord === this.state.word){
            newWord = randomWord();
        }

        this.setState({
           word:newWord,
            font:randomFont()
        });
    };

    updateWinLose(){
        const {numRight, numWrong} = this.state;
        if(numRight + headStart <= numWrong){
            this.setState({
                didLose:true
            })
        } else if (numRight + headStart >= blocksAcross){
            this.setState({
                didWin:true
            })
        }
    }

    resetGame(){
        this.setState({
            word:randomWord(),
            font:randomFont(),
            numRight:0,
            numWrong:0,
            didWin:false,
            didLose:false
        });
    }

    componentDidMount(){
        const self = this;
        Mousetrap.bind('enter', () => {
            self.resetGame();
        });
        Mousetrap.bind('space', () => {
            self.updateWord();
        });
        Mousetrap.bind('up', () => {
            if(self.state.didLose || self.state.didWin){
                self.resetGame()
            } else {
                this.setState({
                    numRight: self.state.numRight + 1
                });
                self.updateWinLose();
                self.updateWord();
            }
        });
        Mousetrap.bind('down', () => {
            if(self.state.didLose || self.state.didWin){
                self.resetGame()
            } else {
                self.setState({
                    numWrong: self.state.numWrong + 1
                });
                self.updateWinLose();
                self.updateWord();
            }
        });
    }

    render() {
        const style = {
            fontFamily:this.state.font,
            background: `url(${cloudBg}) no-repeat center center fixed`,
            backgroundSize: 'cover'

    };
        const {numWrong, numRight, didLose, didWin} = this.state;
        const numTotal = numWrong + numRight;
        let percentRight;
        // if(numTotal === 0){
        //     percentRight = 50;
        // } else {
        //     percentRight = 100 / numTotal * numRight;
        // }
        return (
            <div className="App" style={style}>
                <div className="instructions">
                    <table>
                        <tr>
                            <td align="right">Correct:</td>
                            <td>Up Arrow</td>
                        </tr>
                        <tr>
                            <td align="right">Incorrect:</td>
                            <td>Down Arrow</td>
                        </tr>
                        <tr>
                            <td align="right">Skip:</td>
                            <td>Spacebar</td>
                        </tr>
                        <tr>
                            <td align="right">Reset:</td>
                            <td>Enter</td>
                        </tr>
                    </table>

                </div>
                <div className="word" style={{
                    display:didWin || didLose ? 'none' : 'block'
                }}>
                    <span className="word-box">{this.state.word}</span>
                </div>
                <ProgressBlock numWrong={numWrong}
                               numRight={numRight}
                               headStart={headStart}
                               blocksAcross={blocksAcross}
                               didWin={didWin}
                               didLose={didLose}
                />
                <div className="win-lose" style={{
                    display:didWin || didLose ? 'block' : 'none'
                }}>
                    <span className="you-win" style={{
                        display:didWin ? 'block' : 'none'
                    }}>
                        YOU WIN!!
                    </span>
                    <span className="you-lose" style={{
                        display:didLose ? 'block' : 'none'
                    }}>
                        YOU DIED
                    </span>
                </div>

            </div>
        );
    }
}

export default App;
