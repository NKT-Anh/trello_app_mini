import { Routes, Route } from 'react-router-dom';
import {HomePage} from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { VerifyCodePage } from '../pages/VerifyCodePage';

const AppNavigator = () =>{
    return(
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/verify" element={<VerifyCodePage />} />
        </Routes>
    )
}
export default AppNavigator;