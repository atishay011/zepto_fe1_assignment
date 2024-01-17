import React from 'react';
import ChipInput from './components/ChipInput';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header title="Pick Users" />
      <ChipInput />
    </div>
  );
}

export default App;