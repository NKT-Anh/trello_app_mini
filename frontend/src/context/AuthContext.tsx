import react, { createContext,useState ,useEffect} from 'react';
import axios from "axios";
import type { User } from '../schemas/User.ts';


interface AuthContextType{
    currentUser : User | null;
    token: string | null;
    loading: boolean;
    requestCode: (email: string,) => Promise<void>;
    verifyCode: (email: string, code: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined >(undefined);

export const AuthProvider = ({children}: {children: React.ReactNode}) =>{
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        const savedToken = localStorage.getItem('token');
        if(savedUser && savedToken){
            setUser(JSON.parse(savedUser));
            setToken(savedToken);
        }
        setLoading(false);

    }, []);
    const requestCode = async (email: string) => {
        await axios.post("/auth/signup", { email });
    };
    const verifyCode = async (email: string, code: string) => {
        const response = await axios.post("/auth/verify", { email, code });
        const { user, token } = response.data;
        setUser(user);
        setToken(token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
    };
    const logout =() =>{
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }

    return (
        <AuthContext.Provider value={{ currentUser: user, token, loading, requestCode, verifyCode, logout }}>
              {!loading && children}
        </AuthContext.Provider>
    );
};