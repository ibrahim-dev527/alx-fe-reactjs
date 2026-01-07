import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // initialize state

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h2>Counter Application</h2>
      <p style={{ fontSize: '18px' }}>Current Count: {count}</p>
      <div>
        <button 
          onClick={() => setCount(count + 1)}
          style={{ margin: '5px', padding: '10px' }}
        >
          Increment
        </button>
        <button 
          onClick={() => setCount(count - 1)}
          style={{ margin: '5px', padding: '10px' }}
        >
          Decrement
        </button>
        <button 
          onClick={() => setCount(0)}
          style={{ margin: '5px', padding: '10px' }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Counter;
