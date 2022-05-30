import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Sample output..
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>

        <div className="flex flex-row">
          <div className="basis-1/4">01</div>
          <div className="basis-1/4">02</div>
          <div className="basis-1/2">03</div>
        </div>

      </header>
    </div>
  );
}

export default App;
