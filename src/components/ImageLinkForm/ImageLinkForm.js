import React from 'react';
import '/ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className='f5'>
                {'This magic brain will detect faces in your pictures. Give it a try!'}
            </p>
            <div className='center'>
                <div className='form center pa4 shadow-5 br3'>
                    <input onChange={onInputChange} className='f6 pa2 w-70 center' type='text' />
                    <button onClick={onButtonSubmit} className='w-30 grow f6 link ph3 pv2 dib white bg-light-purple'>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;