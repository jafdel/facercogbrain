import React from 'react';
import 'tachyons';

const Navigation = ({ onRouteChange, isIn }) => {
    if (isIn) {
        return (<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={() => onRouteChange('signIn')} className='f5 link dim black underline pa3 pointer'>
                Sign out
            </p>
        </nav>)
    } else {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={() => onRouteChange('signIn')} className='f5 link dim black underline pa3 pointer'>
                Sign in
            </p>
            <p onClick={() => onRouteChange('register')} className='f5 link dim black underline pa3 pointer'>
                Register
            </p>
            </nav>
        );
    }
}

export default Navigation;