import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import EditorPage from './pages/EditorPage';
import { RecoilRoot } from "recoil";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <>
            <BrowserRouter>
                <RecoilRoot>
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route
                            path="/editor/:roomId"
                            element={<EditorPage />}
                        ></Route>
                    </Routes>
                </RecoilRoot>
            </BrowserRouter>
            <ToastContainer />
        </>
    );
}

export default App;