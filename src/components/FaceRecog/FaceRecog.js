import React, { useEffect, useState } from 'react';

const FaceRecog = ({ input, display, box }) => {
    let square = {};
    let cssObj = {};
    if (JSON.stringify(box).includes("faceAnnotations")) {
        if (box.responses[0].faceAnnotations.length > 0) {
            square = box.responses[0].faceAnnotations[0].fdBoundingPoly.vertices;
            console.log(box);
            cssObj = {
                zIndex: 99999999,
                border: "2px solid blue",
                top: square[0].y,
                left: square[0].x,
                width: square[1].x - square[0].x,
                height: square[2].y - square[1].y,
                display: display,
                transform: 'scaleY(-1)'
            }
        }
    }
    const height = 720;
    const width = 720;
    return (
        <div className='center ma'>
            <div className="absolute mt2">
                <div className="absolute" style={cssObj}></div>
                <img id='inputimage' alt='' height={height} width={width} src={input} style={{zIndex: 1, display: display}} />
            </div>
        </div>
    );
}

export default FaceRecog;