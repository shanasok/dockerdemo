import './App.css';
import Main from './components/Main';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>A Little Weather App</h1>
        <h2>Select a location on the map to see its weather.</h2>
      </header>
      <Main />
    </div>
  );
}

export default App;
