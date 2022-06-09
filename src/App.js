import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './Context/authProvider';
import CampaignAdmin from './Pages/Admin/CampaignAdmin';
import Campaign from './Pages/Campaign/Campaign';
import CampaignDetail from './Pages/Campaign/CampaignDetail';
import CampaignProgress from './Pages/Campaign/CampaignProgress';
import CampaignResult from './Pages/Campaign/CampaignResult';
import Login from './Pages/Login/Login';
import PreLogin from './Pages/Login/PreLogin';
import SignUp from './Pages/SignUp/SignUp';
import PrivateRoute from './PrivateRoute';


const App = () => { 
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PreLogin/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route exact path='/campaign' element={
            <PrivateRoute>
              <Campaign/>
            </PrivateRoute>
          } />
          <Route path='/campaign/:id' element={
            <PrivateRoute>
              <CampaignDetail />
            </PrivateRoute>
          }>
            <Route path='progress' element={<CampaignProgress/>}/>
            <Route path='result' element={<CampaignResult/>}/>
          </Route>
          <Route path='/campaign-admin' element={
            <PrivateRoute>
              <CampaignAdmin/>
            </PrivateRoute> 
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
