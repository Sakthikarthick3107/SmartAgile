import './App.css';

function App() {
  return (
    <div className="App">
      {isElectron && <p>Running in Electron!</p>}
    </div>
  );
}

export default App;
