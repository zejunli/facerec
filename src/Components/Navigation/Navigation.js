import React from 'react';
import '../../style/css/Navigation.css'


const Navigation = ({ onRouteChange }) => {
	return (
		// can also use justifyContent: 'flex-end' here, same effect
			<nav style={{display: 'flex', justifyContent: 'flex-end', marginRight: '20px'}}>
				<p onClick={() => onRouteChange('signin')} className="signout">Sign Out</p>
			</nav>
		);
}

export default Navigation;