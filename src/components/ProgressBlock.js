import React from 'react';
import lavaBlockImg from '../img/lava.gif'
import fireBlockImg from '../img/fire.gif'
import grassBlockImg from '../img/grassBlock.png'
import alexImg from '../img/alex.png'
import creeperImg from '../img/creeper.png'

function ProgressBlock(props) {
    const screenWidth =  window.innerWidth;
    const {numWrong, numRight, headStart, blocksAcross, didWin, didLose} = props;
    const blockSize = screenWidth / blocksAcross;

    const styleBlock = {
        width:blockSize,
        height:blockSize,
        position:'inline-block'
    };
    const styleBlockImg = {
        width:blockSize,
        height:blockSize,
    };


    let lavaBlocks = [];
    let grassBlocks = [];
    for(let i = 0; i < blocksAcross; i++){
        lavaBlocks.push(
            <div className="block" style={styleBlock}><img src={lavaBlockImg} style={styleBlockImg}/></div>
        );
        if(i < headStart + numRight){
            grassBlocks.push(
                <div className="block" style={styleBlock}><img src={grassBlockImg} style={styleBlockImg}/></div>
            );
        }
    }
    let alexStyle = {
        position:'absolute',
        bottom:2 * blockSize,
        left:(headStart + numRight - 1) * blockSize,
        zIndex:75,
        transition:'all 1s ease'
    };
    if(didLose){
        alexStyle = {
            position:'absolute',
            bottom:0,
            left:(headStart + numRight +0.5) * blockSize,
            zIndex:75,
            transition:'all 1s ease'
        };
    }

    return (
        <div className="ProgressBlock">
            <div className={didLose ? 'alex dying' : 'alex'} style={alexStyle}>
                <img src={alexImg} style={{
                    height:blockSize*2.5,
                    width:'auto',
                    marginBottom:-blockSize*0.3,
                    marginLeft:-blockSize*0.1
                }}/>
                <img src={fireBlockImg} style={{
                    height:blockSize*2.5,
                    width:'auto',
                    marginBottom:-blockSize*0.3,
                    marginLeft:-blockSize * 0.8,
                    display:didLose ? 'block': 'none',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    opacity: 0.8
                }}/>
            </div>

            <div className="creeper" style={{
                position:'absolute',
                bottom:2 * blockSize,
                left:(numWrong - 1) * blockSize,
                transition:'all 1s ease',
                zIndex:80,
            }}>
                <img src={creeperImg} style={{
                    height:blockSize*2.3,
                    width:'auto',
                    marginBottom:-blockSize*0.2
                }}/>
            </div>

            <div className="block-row" style={{
                position:'absolute',
                bottom:blockSize,
                left:0,
                right:0,
                zIndex:50
            }}>
                {grassBlocks}
            </div>
            <div className="block-row" style={{
                position:'absolute',
                bottom:0,
                left:0,
                right:0,
                zIndex:100
            }}>
                {lavaBlocks}
            </div>
        </div>
    );
}
export default ProgressBlock;