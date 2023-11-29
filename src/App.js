import logo from './logo.svg';
import './App.css';
import Weather from "./Weather";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>The Weather in Elizabeth is:</p>
        <Weather/>
      </header>
    </div>
  );
}

export default App;
