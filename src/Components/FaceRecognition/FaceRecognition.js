import React from 'react';
import Tilt from 'react-tilt';
import '../../style/css/FaceRecognition.css';




const FaceRecognition = ({ imgURL, box }) => {
	return (
			<div class='center ma2'>
				<div className="absolute mt2">
					<Tilt className="Tilt" options={{ max : 15 }} style={{ height: 'auto', width: 500 }} >
	 					<div className="Tilt-inner-diff">
	 						<img id="faceRectangle" src={imgURL} alt="" width='500px' height='auto' />
	 						<div className="bounding-box" style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}>
	 						</div>
	 					</div>
					</Tilt>
				</div>
			</div>
		);
}

export default FaceRecognition;