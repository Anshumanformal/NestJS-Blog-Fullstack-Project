import './App.css';
import { Link } from 'react-router-dom';
import AppRouter from './router'; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <div id="nav">
        <Link to="/">Home</Link> |
        <Link to="/create">Create</Link>
      </div>
      <AppRouter />
      </header>
    </div>
  );
}

export default App;
