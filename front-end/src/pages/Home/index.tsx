import React, {
    useContext,
} from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { Notify } from '../../components/Notify';
import { Context } from '../../Context/AuthContext';



export function Home() {

    const navigate = useNavigate();

    const { handleLogout } = useContext(Context);

    async function handleSignOut() {
        try {
            await handleLogout();
            navigate('/login');
        } catch (error: any) {
            console.log(error)
            Notify({ message: error.message, type: 'error' });
        }
    }
    
    return (
        <div>
            <button onClick={() => handleSignOut()}>SignOut</button>
            <Toaster />
        </div>
    )
}