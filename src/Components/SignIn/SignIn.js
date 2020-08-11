import React from 'react';
import '../../style/css/SignIn.css';


const SignIn = ({ onRouteChange }) => {
	return (
			<div className="WrapCard">
				<div>
					<fieldset className="fs">
						<legend className="f1 fw6">Sign In</legend>
						<div className='mv lh'>
							<label htmlFor='email' className="db">Email</label>
							<input type='email' id='email' className='w-100 text-field' />
						</div>
						<div className='mv lh'>
							<label htmlFor='pw' className='db'>Password</label>
							<input type='password' id='pw' className='w-100 text-field' />
						</div>
						<div className='mv'>
							<input onClick={() => onRouteChange('home')} type='submit' value="Sign In" className="submit-btn" />
						</div>
						<div className='mv-less register-btn'>
							<p onClick={() => onRouteChange('register')} id='register'>{'Register'}</p>
						</div>
					</fieldset>
				</div>
			</div>
		);
}

export default SignIn;