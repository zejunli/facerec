import React, { Component } from 'react';
import '../../style/css/SignIn.css';


class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: '',
		}
		this.notShown = true;
	}

	// detects the user input email and update it into state.
	onEmailChange = (event) => {
		this.setState({ signInEmail: event.target.value });
	}

	// detects the user input pw and update it into state.
	onPasswordChange = (event) => {
		this.setState({ signInPassword: event.target.value });
	}

	// evaluates if the input email & pw are valid.
	isValidEmail = () => {
		// generic regex email matching pattern
		let pattern = /^[\w.]{1,20}@[\w]{1,10}\.[a-zA-Z]{2,4}$/;
		// pattern.test() returns true if match is found, false otherwise.
		if (pattern.test(this.state.signInEmail)) {
			return true;
		}
		return false;
	}

	isPasswordEmpty = () => {
		return (this.state.signInPassword === '');
	}

	isEmailEmpty = () => {
		return (this.state.signInEmail === '');
	}

	// toggles the animation of prompting error message
	changeText = (content, flag) => {
		try {
			document.querySelector(flag).innerText = content;
			// prevents from spamming clicking and showing the error message
			if (!document.querySelector(flag).classList.contains('show')) {
				document.querySelector(flag).classList.add('show');
				this.notShown = true;
			}
		} catch (error) {
			;
		}

		if (this.notShown) {
			setTimeout(() => {
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

	// displays customized error prompt.
	displayErrorBox = () => {
		// email is empty
		if (this.isEmailEmpty()) {
			this.changeText('Email is required', '#signin-mail');
		}
		else if (!this.isValidEmail()) {
			console.log('entered');
			this.changeText('invalid email', '#signin-mail');
		}
		else if (this.isPasswordEmpty()) {
			this.changeText('Password is required', '#signin-password');
		}
	}

	// handles -- clicks on the sign in button
	onSubmitSignIn = () => {
		// checks the validation of email and password
		if (this.isValidEmail() && !this.isPasswordEmpty()) {
			fetch("http://10.0.0.178:8200/signin", {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					email: this.state.signInEmail,
					password: this.state.signInPassword,
				}),
			})
			.then(response => response.json())
			.then(user => {
				if (user.id) {
					this.props.loadUser(user);
					this.props.onRouteChange('home');
				} else {
					this.changeText('Non-existent Combination', '.tri');
				}
		}).catch(console.log) // prompt corresponding error message
		} else {
			this.displayErrorBox();
		}
	}

	// implement pressing enter to sign in and add to onPressKey
	// for some reason event.keyCode is not working, charCode might work.
	onPressEnter = (event) => {
		if (event.key === 'Enter')
			this.onSubmitSignIn();
	}

	render() { 
		return (
			<>
				<div style={{position:'relative'}}>
					<nav style={{display: 'flex', justifyContent: 'flex-end', marginRight: '20px'}}>
						<p onClick={() => this.props.onRouteChange('hello')} className="signout">Go Back</p>
					</nav>
				</div>
					<div className="WrapCard">
						<div>
							<fieldset className="fs">
								<legend className="f1 fw6">Sign In</legend>
								<div className='mv lh'>
									<label htmlFor='email' className="db">Email</label>
									<input 
									onKeyPress={this.onPressEnter}
									onChange={this.onEmailChange}
									type='text' 
									id='email' 
									className='w-100 text-field' 
									autoComplete='off' />
									<div id='signin-mail' className='tri'>Email is required</div>
								</div>
								<div className='mv lh'>
									<label htmlFor='pw' className='db'>Password</label>
									<input 
									onKeyPress={this.onPressEnter}
									onChange={this.onPasswordChange}
									type='password' 
									id='pw' 
									className='w-100 text-field' />
									<div id='signin-password' className='tri'>Password is required</div>
								</div>
								<div className='mv'>
									<input 
									onClick={this.onSubmitSignIn} 
									type='submit' 
									value="Sign In" 
									className="submit-btn" />
								</div>
								<div className='mv-less register-btn'>
									<p onClick={() => this.props.onRouteChange('Register')}
									id='register'>{'Register'}</p>
								</div>
							</fieldset>
						</div>
					</div>
			</>
		);
	}
}

export default SignIn;