import './App.css';
import { Home } from './components/Home';
import { Navbar } from './components/Navbar';
import { About } from './components/About';
// import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './context/notes/Notestate';
import SignUp from './components/SignUp';
import Login from './components/Login';

function App() {
  return (

    <NoteState>
      <BrowserRouter>
        <Navbar />

        <Routes>

          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/about" element={<About />}></Route>
          <Route exact path="/signup" element={<SignUp/>}></Route>
          <Route exact path="/login" element={<Login/>}></Route>


        </Routes>

      </BrowserRouter>
    </NoteState>


  );
}

export default App;
