import React, { useState } from 'react';

function Counter() {
	const [ counter, setCounter ] = useState(0);
	const [ hidden, setHidden ] = useState(true);

	return (
		<React.Fragment>
			{hidden ? <h1>{counter}</h1> : <h1>Count Hidden</h1>}
			<button onClick={() => setCounter(counter + 1)}>Count!</button>
			<button onClick={() => setHidden(!hidden)}>Hide/Show</button>
		</React.Fragment>
	);
}

export default Counter;
