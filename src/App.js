import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoggedInRoute from './LoggedInRoute';
import CampaignAdmin from './Pages/Admin/CampaignAdmin';
import Campaign from './Pages/Campaign/Campaign';
import CampaignComplete from './Pages/Campaign/CampaignComplete';
import CampaignDetail from './Pages/Campaign/CampaignDetail';
import CampaignProgress from './Pages/Campaign/CampaignProgress';
import CampaignReport from './Pages/Campaign/CampaignReport';
import CampaignResult from './Pages/Campaign/CampaignResult';
import FindPassword from './Pages/Login/FindPassword';
import Login from './Pages/Login/Login';
import Policy from './Pages/Login/Policy';
import Privacy from './Pages/Login/Privacy';
import PreLogin from './Pages/Login/PreLogin';
import SignUp from './Pages/SignUp/SignUp';
import PrivateRoute from './PrivateRoute';


const App = () => { 
  return (
    <BrowserRouter>      
        <Routes>
          <Route path="/" element={
            <LoggedInRoute>
              <PreLogin/>
            </LoggedInRoute>
          }/>
          <Route path="/login" element={
            <LoggedInRoute>
              <Login/>
            </LoggedInRoute>            
          }/>
          <Route path="/sign-up" element={
            <LoggedInRoute>
              <SignUp/>
            </LoggedInRoute>            
          }/>
          <Route path="/find-pw" element={
            <LoggedInRoute>
              <FindPassword />
            </LoggedInRoute>
          }/>
          <Route path="/policy" element={<Policy />} />
          <Route path='/privacy' element={<Privacy />}/>
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
            <Route path='complete' element={<CampaignComplete/>}/>
            <Route path='report' element={<CampaignReport/>}/>
          </Route>
          <Route path='/campaign-admin' element={
            <PrivateRoute>
              <CampaignAdmin/>
            </PrivateRoute> 
          } />
        </Routes>      
    </BrowserRouter>    
  );
}

export default App;
