import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';

const AppNavigator = () =>{
    return(
        <Routes>
            <Route path="/" element={<HomePage />} />
        </Routes>
    )
}
export default AppNavigator;