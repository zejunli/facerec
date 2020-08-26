import React from 'react';



const Rank = ({ name, entry}) => {
	return (
			<div>
				<div className="f3 rank">
				{`${name}, your current entry count is`}
				</div>
				<div className="f1 rank-num">
					{`${entry}`}
				</div>
			</div>
		);
}

export default Rank;