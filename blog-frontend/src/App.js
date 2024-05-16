import './App.css';
import SignIn from './components/Authentication/SignIn';
import SignUp from './components/Authentication/SignUp';
import SignOut from './components/Authentication/SignOut';
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
            <Route path="/edit/:id/:authorID" element={<EditPost />} />
            <Route path="/post/:id/:authorID" element={<PostDetail />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signout" element={<SignOut />} />
          </Routes>
        </Router>
  );
}

export default App;

