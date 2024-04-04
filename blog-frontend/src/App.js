import './App.css';
import CreatePost from "./components/Post/Create"
import EditPost from "./components/Post/Edit"
import PostDetail from "./components/Post/PostDetail"
import BlogList from "./views/Home"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<BlogList />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/post/:id" element={<PostDetail />} />
          </Routes>
        </Router>
  );
}

export default App;

