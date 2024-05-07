import './App.css';
import Header from './components/Header/Header';
import Project from './components/Project/Project';
import Sidebar from './components/SideBar/Sidebar';


function App() {
  return (
    <div className="App">
      {isElectron && <p>Running in Electron!</p>}
    </div>
  );
}

export default App;
