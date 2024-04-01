import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <div id="nav">
        <Link to="/">Home</Link> |
        <Link to="/create">Create</Link>
      </div>
      </header>
    </div>
  );
}

export default App;
