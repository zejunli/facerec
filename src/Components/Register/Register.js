import React from 'react';
import '../../style/css/SignIn.css';


const Register = ({ onRouteChange }) => {
	return (
			<div className="WrapCard">
				<div>
					<fieldset className="fs">
						<legend className="f1 fw6">Register</legend>
						<div className='mv lh'>
							<label htmlFor='email' className="db">Username</label>
							<input type='email' id='email' className='w-100 text-field' />
						</div>
						<div className='mv lh'>
							<label htmlFor='email' className="db">Email</label>
							<input type='email' id='email' className='w-100 text-field' />
						</div>
						<div className='mv lh'>
							<label htmlFor='pw' className='db'>Password</label>
							<input type='password' id='pw' name='pw' className='w-100 text-field' />
						</div>
						<div className='mv lh'>
							<label htmlFor='pw' className='db'>Repeat Password</label>
							<input type='password' id='pw' name='repeat_pw' className='w-100 text-field' />
						</div>
						<div className='mv'>
							<input onClick={() => onRouteChange('signin')} type='submit' value="Register" className="submit-btn" />
						</div>
					</fieldset>
				</div>
			</div>
		);
}

export default Register;