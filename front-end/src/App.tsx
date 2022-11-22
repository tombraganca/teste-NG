import { AuthProvider } from "./Context/AuthContext";
import { Routes } from './Routes/Routes'
import './index.css';
import { Toaster } from "react-hot-toast";


export function App() {

    return (
        <AuthProvider>
            <Routes />
            <Toaster />
        </AuthProvider>
    );
}