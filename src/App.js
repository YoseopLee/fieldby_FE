import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login/Login';
import PreLogin from './Login/PreLogin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PreLogin/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
