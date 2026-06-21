import Button from "@mui/material/Button"
import OutlinedInput from "@mui/material/OutlinedInput"
import {useNavigate} from 'react-router-dom'
export const VerifyCodePage = () => {
    const navigator = useNavigate();
    const handleSubmit = () =>{
        navigator('/home');
    }
    return(
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', top:'35%' }}>
            <h1 >Verify Code</h1>
            <OutlinedInput
            type="code"
            placeholder="Enter code verification"

            />
            
            <Button style={{ marginTop: '20px' }} variant="contained" color="primary" onClick={handleSubmit}>
                Submit
            </Button>
        </div>
    )
}

