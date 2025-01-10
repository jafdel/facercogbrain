import React from 'react';
import { Tilt } from 'react-tilt';
import './Logo.css'
//import brain from 'https://static.vecteezy.com/system/resources/previews/028/635/317/non_2x/human-brain-icon-isolated-transparent-background-ai-generative-free-png.png'
//import brain from 'https://www.bing.com/images/search?view=detailV2&ccid=EvR83qyb&id=6E0069397717249712AD4BBC943EDA024C7232A6&thid=OIP.EvR83qyb33sca8sgaLn7JgHaHa&mediaurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F000%2F627%2F423%2Foriginal%2Fvector-brain-icon-symbol-sign.jpg&cdnurl=https%3A%2F%2Fth.bing.com%2Fth%2Fid%2FR.12f47cdeac9bdf7b1c6bcb2068b9fb26%3Frik%3DpjJyTALaPpS8Sw%26pid%3DImgRaw%26r%3D0&exph=5000&expw=5000&q=brain+icon&simid=608035660600071014&ck=6ED39EC058263947F173D8667849888E&selectedIndex=5&itb=0&cw=560&ch=527&mode=overlay&shtc=0&shth=OIP.EvR83qyb33sca8sgaLn7JgHaHa&shsc=idp&form=EX0050&shid=66e42b57-af68-4be4-92bb-1e93749ac052&shtp=GetUrl&shtk=QnJhaW4gaWNvbiBzeW1ib2wgc2lnbiA2Mjc0MjMgVmVjdG9yIEFydCBhdCBWZWN0ZWV6eQ%3D%3D&shdk=Rm91bmQgb24gQmluZyBmcm9tIHd3dy52ZWN0ZWV6eS5jb20%3D&shhk=JmDzN0gm0T7GSmPGPW1MBZG%2BC%2Bo0gCrRKZ7z6kRCkMM%3D';
import brain from './logo192.png';

const defaultOptions = {
	reverse:        false,  // reverse the tilt direction
	max:            80,     // max tilt rotation (degrees)
	perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
	scale:          1.1,    // 2 = 200%, 1.5 = 150%, etc..
	speed:          1000,   // Speed of the enter/exit transition
	transition:     true,   // Set a transition on enter/exit.
	axis:           null,   // What axis should be disabled. Can be X or Y.
	reset:          true,    // If the tilt effect has to be reset on exit.
	easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
}

const Logo = () => {
    return (
        <header className='ma4 mt0'>
            <Tilt options={{defaultOptions}} className='tilt br2 shadow-2' style={{ height: 80, width: 80 }}>
                <div className='tilt pa3'><img height='100%' width='100%' alt='' src='https://static.vecteezy.com/system/resources/previews/028/635/317/non_2x/human-brain-icon-isolated-transparent-background-ai-generative-free-png.png'/></div>
            </Tilt>
        </header>
    )
}

export default Logo;