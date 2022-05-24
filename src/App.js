import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CampaignAdmin from './Pages/Admin/CampaignAdmin';
import Campaign from './Pages/Campaign/Campaign';
import Login from './Pages/Login/Login';
import PreLogin from './Pages/Login/PreLogin';
import SignUp from './Pages/SignUp/SignUp';


const App = () => { 
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PreLogin/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path='/campaign' element={<Campaign/>} />
        <Route path='/campaign-admin' element={<CampaignAdmin/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
