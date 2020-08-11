import React from 'react';
import '../../style/css/ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
	return (
			<div>
				<p className="desc">Detect faces in your pictures</p>
				<div className="center">
					<div className="formwrapper center">
						<input type='text' className="inputForm" onChange={onInputChange}/>
						<button className="Detect" onClick={onSubmit}>Detect</button>
					</div>
				</div>
			</div>

		);
}

export default ImageLinkForm;