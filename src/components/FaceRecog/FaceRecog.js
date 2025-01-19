import React, { useEffect, useState } from 'react';

const FaceRecog = ({ input, display }) => {
    //const [imgUrl, setImgUrl] = useState('');
    //useEffect(onImageLoad);
    let str = '';
    //str = (str===props.onImageLoad) ? 

    return (
        <div className='center'>
            <img alt='' src={input} style={{display: display}} />
        </div>
    );
}

export default FaceRecog;