import React from 'react';
import '../../style/css/Navigation.css'


const Navigation = ({ onRouteChange }) => {
	return (
		// can also use justifyContent: 'flex-end' here, same effect
			<nav style={{display: 'flex'}}>
				<p onClick={() => onRouteChange('signin')}className="signout" style={{marginLeft: 'auto', paddingRight: '1.5rem'}}>Sign Out</p>
			</nav>
		);
}

export default Navigation;