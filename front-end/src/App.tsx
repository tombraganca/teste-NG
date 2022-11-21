import './index.css';
import { AuthProvider } from "./Context/AuthContext";
import { Routes } from './Routes/Routes'


export function App() {

    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    );
}