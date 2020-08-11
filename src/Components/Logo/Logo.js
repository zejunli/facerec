import React from 'react';
import '../../style/css/Logo.css';
import brain from '../../style/image/brain.png';
import Tilt from 'react-tilt';



const Logo = () => {
	return (
			<div className="picDiv">
				<Tilt className="Tilt" options={{ max : 60 }} style={{ height: 250, width: 250 }} >
 					<div className="Tilt-inner"><img src={brain} alt="brain logo" /></div>
				</Tilt>
			</div>
		);
}

export default Logo;