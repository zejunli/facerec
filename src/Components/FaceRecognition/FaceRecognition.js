import React from 'react';
import Tilt from 'react-tilt';
import '../../style/css/FaceRecognition.css';




const FaceRecognition = ({ imgURL }) => {
	return (
			<div className='center ma2'>
				<div className="absolute mt2">
					<Tilt className="Tilt-pic" options={{ max : 15 }} style={{ height: 'auto', width: 500 }} >
	 					<div className="Tilt-inner-diff">
	 						<img id="faceRectangle" src={imgURL} alt="" width='500px' height='auto' />
	 					</div>
					</Tilt>
				</div>
			</div>
		);
}

export default FaceRecognition;