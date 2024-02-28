import './App.css';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import {useSelector } from 'react-redux';
import EditorPage from './pages/EditorPage';
import { RecoilRoot } from "recoil";
import { ToastContainer} from 'react-toastify';
import LoginScreen from './pages/LoginScreen';
import 'react-toastify/dist/ReactToastify.css';
import SignUpScreen from './pages/SignUp';
import { useEffect } from 'react';
import { getTokenSelector } from './redux/reducers/LoginReducer';

function App() {
    const loginData = useSelector(getTokenSelector)
    const navigate = useNavigate()
    const location = useLocation();
    useEffect(() => {
        const currentPath = location.pathname ?? "/";
        console.log(currentPath, 'currentPath')
        if (!loginData) {
            navigate("/login")
        } else {
            if (!currentPath.includes("editor")) {
                navigate(currentPath !== "/" ? currentPath : "/home")
            }
        }
    }, [])
    return (
        <>
            <RecoilRoot>
                <Routes>
                    <Route path="/home" element={<Home />}></Route>
                    <Route path="/login" element={<LoginScreen />}></Route>
                    <Route path="/signup" element={<SignUpScreen />}></Route>
                    <Route
                        path="/editor/:roomId"
                        element={<EditorPage />}
                    ></Route>
                </Routes>
            </RecoilRoot>
            <ToastContainer />
        </>
    );
}

export default App;