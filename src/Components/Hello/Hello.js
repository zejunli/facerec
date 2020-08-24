import React from 'react';
import '../../style/css/Hello.css';


class Hello extends React.Component {
	constructor() {
		super();
		this.charIndex = 0;
		this.helloElement = null;
		this.len = 0;
		this.timer = null;
	}

	// this method will be called every 50 mili-secs.
	onTick = () => {
		// when a single span gets picked, new animation class will be added.
		const span = this.helloElement.querySelectorAll('span')[this.charIndex];
		span.classList.add('come-in');
		this.charIndex ++;
		if (this.charIndex === this.len) {
			this.complete();
			return ;
		}
	}

	complete = () => {
		// closes the timer.
		clearInterval(this.timer);
		this.timer = null;
	}

	componentDidMount() {
		// splits hello, there! into an array of single chars.
		this.helloElement = document.querySelector('.welcome-p');
		this.len = this.helloElement.textContent.length;
		let content = this.helloElement.textContent;
		let textArr = content.split("");
		// clears inner text.
		this.helloElement.textContent = '';
		// inserts an array of span elements containing a single char.
		for (let i = 0; i < textArr.length; ++ i) {
			this.helloElement.innerHTML += `<span>${textArr[i]}</span>`
		}
		// calls onTick every 50 mili-secs.
		this.timer = setInterval(this.onTick, 50);
	}

	render() {
		return (
			<div>
				<nav style={{display: 'flex', justifyContent: 'flex-end', marginRight: '20px'}}>
					<p onClick={() => this.props.onRouteChange('signin')} className="signout">Sign In</p>
				</nav>
				<div class='welcome-div'>
					<p class='welcome-p'>Hello,&nbsp;there!</p>
				</div>
			</div>
			)
	}
}


export default Hello;