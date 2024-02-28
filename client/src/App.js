import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import EditorPage from './pages/EditorPage';
import { RecoilRoot } from "recoil";
import { ToastContainer, toast } from 'react-toastify';
import { store, persistor, history } from './redux/store';
import LoginScreen from './pages/LoginScreen';
import 'react-toastify/dist/ReactToastify.css';
import SignUpScreen from './pages/SignUp';

function App() {
    return (
        <>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <BrowserRouter>
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
                    </BrowserRouter>
                </PersistGate>
                <ToastContainer />
            </Provider>
        </>
    );
}

export default App;