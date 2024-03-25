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

          <Route path='/' element={"hello word"} />
          <Route path='/api/auth/login' element={<Auth />} />
          <Route path='/api/auth/signup' element={<Auth />} />
          <Route path='/api/auth/chat' element={authUser?<Chat />:<Navigate to="/api/auth/login"/>}/>
         

        </Routes>
      
      
    </>
  )
}

export default App
