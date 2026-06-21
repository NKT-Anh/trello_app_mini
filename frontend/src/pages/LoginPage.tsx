import Button from "@mui/material/Button"
import OutlinedInput from "@mui/material/OutlinedInput"
import {useNavigate} from 'react-router-dom'
export const LoginPage = () => {
    const navigator = useNavigate();
    const handleLogin = () =>{
        navigator('/verify');
    }
    return(
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', top:'35%' }}>
            <h1 >Login to continue </h1>
            <OutlinedInput
            type="email"
            placeholder="Enter your email"

            />
            
            <Button style={{ marginTop: '20px' }} variant="contained" color="primary" onClick={handleLogin}>
                continue
            </Button>
        </div>
    )
}

