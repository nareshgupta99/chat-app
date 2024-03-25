import Auth from './component/Auth'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Chat from './component/Chat';
import { ToastContainer } from 'react-toastify';
import { AuthContextProvider, userAuthContext } from './context/AuthContext';
// import Logout from './component/Logout';


function App() {

const {authUser}=userAuthContext();
  return (
    <>
        

        <Routes>
          <Route path='/' element={<Auth />} />
          

        </Routes>
      
      
    </>
  )
}

export default App
