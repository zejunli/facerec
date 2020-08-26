import React, { Component } from 'react';
import '../../style/css/SignIn.css';


class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			rEmail: '',
			password: '',
			rPassword: '',
			username: '',
		}
		// if the error is shown, don't trigger new error message
		this.notShown = true;
	}

	// detects the user input username and update it into state.
	onUsernameChange = (event) => {
		this.setState({ username: event.target.value })
	}

	// detects the user input email and update it into state.
	onEmailChange = (event) => {
		this.setState({ email: event.target.value });
	}

	onRepeatEmailChange = (event) => {
		this.setState({ rEmail: event.target.value });
	}

	// detects the user input pw and update it into state.
	onPasswordChange = (event) => {
		this.setState({ password: event.target.value });
	}

	onRepeatPasswordChange = (event) => {
		this.setState({ rPassword: event.target.value });
	}

	// evaluates if the input email & pw are valid.
	isValidEmail = () => {
		// generic regex email matching pattern
		let pattern = /^[\w.]{1,20}@[\w]{1,10}\.[a-zA-Z]{2,4}$/;
		// pattern.test() returns true if match is found, false otherwise.
		if (pattern.test(this.state.email)) {
			return true;
		}
		return false;
	}

	isUsernameEmpty = () => {
		return (this.state.username === '');
	}

	isPasswordEmpty = () => {
		return (this.state.password === '');
	}

	isPasswordLongEnough = () => {
		return (this.state.password.length >= 6);
	}

	isRepeatPasswordEmpty = () => {
		return (this.state.rPassword === '');
	}

	isEmailEmpty = () => {
		return (this.state.email === '');
	}

	isRepeatEmailEmpty = () => {
		return (this.state.rEmail === '');
	}

	isEqualEmail = () => {
		return (this.state.rEmail === this.state.email);
	}

	isEqualPassword = () => {
		return (this.state.rPassword === this.state.password);
	}

	// toggles the animation of prompting error message
	changeText = (content, flag) => {
		document.querySelector(flag).innerText = content;
		// prevents from spamming clicking and showing the error message
		if (!document.querySelector(flag).classList.contains('show')) {
			document.querySelector(flag).classList.add('show');
			this.notShown = true;
		}
		if (this.notShown) {
			setTimeout(() => {
				// resolves the bug jumping back and forth in between sign in
				// and register form with the error message left un-handled.
				// because querySelector won't be able to find the element.
				// can use try...catch... here also.
					new Promise((resolve, reject) => {
						if (document.querySelector(flag) !== null) {
							resolve('success');
						}
						else {
							reject('fail');
						}
					})
					.then(success => {
						document.querySelector(flag).classList.remove('show');
					}, fail => {
						return ;
					})
					.catch(err => {console.log(err)})
				}, 2500);
			this.notShown = !this.notShown;
		}
	}

	// displays prompt of invalid input/empty fields
	displayErrorBox = () => {
		if (this.isUsernameEmpty()) {
			this.changeText('Username is required', '#name');
		}
		else if (this.isEmailEmpty()) {
			this.changeText('Email is required', '#mail');
		}
		else if (!this.isValidEmail()) {
			this.changeText('invalid email', '#mail');
		}
		else if (this.isRepeatEmailEmpty()) {
			this.changeText('Please repeat email', '#rmail');
		}
		else if (!this.isEqualEmail()) {
			this.changeText("Email doesn't match", '#rmail');
		}
		else if (this.isPasswordEmpty()) {
			this.changeText("Password is required", '#password');
		}
		else if (!this.isPasswordLongEnough()) {
			this.changeText('At least 6-digit', '#password');
		}
		else if (this.isRepeatPasswordEmpty()) {
			this.changeText("Please repeat password", '#rpassword');
		}
		else if (!this.isEqualPassword()) {
			this.changeText("Password doesn't match", '#rpassword');
		}
	}

	// implement pressing enter to sign in and add to onPressKey
	// for some reason event.keyCode is not working, charCode might work.
	onPressEnter = (event) => {
		if (event.key === 'Enter')
			this.onClickRegister();
	}

	// this happens on clicking button Register
	onClickRegister = () => {
		if (this.isValidEmail()
			&& !this.isUsernameEmpty()
			&& !this.isEmailEmpty()
			&& !this.isRepeatEmailEmpty()
			&& !this.isPasswordEmpty()
			&& !this.isRepeatPasswordEmpty()
			&& this.isEqualEmail()
			&& this.isEqualPassword()
			&& this.isPasswordLongEnough()) {
				fetch('https://smart-brain-zejun.herokuapp.com/register', {
					method: 'post',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						name: this.state.username,
						email: this.state.email,
						password: this.state.password,
					}),
				})
				.then(resp => resp.json())
				// returning 'transaction failed' -> repetitive email address.
				.then(data => {
					if (data === 'unable to register') {
						this.changeText('Email already registered', '#mail');
					}
					else {
						this.props.loadUser(data);
						this.props.onRouteChange('signin');
					}
				})
		} else {
			this.displayErrorBox();
		}
	}

	render() {
		return (
			<div className="WrapCard">
				<div>
					<fieldset className="fs">
						<legend className="f1 fw6 m-bottom">Register</legend>
						<div className='mv lh'>
							<label htmlFor='email' className="db">Username</label>
							<input 
							type='text' 
							id='username' 
							className='w-100 text-field'
							onChange={this.onUsernameChange}
							onKeyPress={this.onPressEnter}
							autoComplete='off' />
							<div id='name' className='tri'></div>
						</div>
						<div className='mv lh'>
							<label htmlFor='email' className="db">Email</label>
							<input 
							type='text' 
							id='email' 
							className='w-100 text-field'
							onChange={this.onEmailChange}
							onKeyPress={this.onPressEnter}
							autoComplete='off' />
							<div id='mail' className='tri'></div>
						</div>
						<div className='mv lh'>
							<label htmlFor='email' className="db">Repeat Email</label>
							<input 
							type='text' 
							id='repeat-email' 
							className='w-100 text-field'
							onChange={this.onRepeatEmailChange}
							onKeyPress={this.onPressEnter} />
							<div id='rmail' className='tri'></div>
						</div>
						<div className='mv lh'>
							<label htmlFor='pw' className='db'>Password</label>
							<input 
							type='password' 
							id='pw' 
							name='pw' 
							className='w-100 text-field'
							onChange={this.onPasswordChange}
							onKeyPress={this.onPressEnter} />
							<div id='password' className='tri'></div>
						</div>
						<div className='mv lh'>
							<label htmlFor='pw' className='db'>Repeat Password</label>
							<input 
							type='password' 
							id='repeat-pw' 
							name='repeat_pw' 
							className='w-100 text-field'
							onChange={this.onRepeatPasswordChange}
							onKeyPress={this.onPressEnter} />
							<div id='rpassword' className='tri'></div>
						</div>
						<div className='mv'>
							<input onClick={this.onClickRegister} type='submit' value="Register" className="submit-btn" />
						</div>
						<div className='mv-less register-btn'>
							<p onClick={() => this.props.onRouteChange('signin')}
							id='register'>{'Sign In'}</p>
						</div>
					</fieldset>
				</div>
			</div>
		);
	}
}

export default Register;