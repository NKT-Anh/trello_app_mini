import Box from '@mui/material/Box';
import AssessmentIcon from '@mui/icons-material/Assessment';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';

export const HomePage = () => {
    return(
        <div style={{display:'flex', flexDirection:'column', top:'35%' }}>
            <nav style={{display:'flex', gap:'20px', marginBottom:'20px'}}>
                <a href="/home">Home</a>
                <a href="/profile">Profile</a>
                <a href="/settings">Settings</a>
            </nav>

           <div style={{display:'flex',marginTop:'2%', gap:'20px',flexDirection:'row', alignItems:'center', justifyContent:'center' }}>
               <div style={{width:'30%', backgroundColor:'#f0f0f0', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',gap:'20px'}}>
                            
                    <Box component="section" sx={{ p: 5, border: '1px dashed grey' }}>
                        <AssessmentIcon color="primary" />
                        <span style={{ marginLeft: '10px' ,fontSize:'28px'}}>Boards</span>
                    </Box>
                    <span>All members</span>
                    <ul>
                        <li>Member 1</li>
                        <li>Member 2</li>
                        <li>Member 3</li>
                    </ul>
                    
               </div>
               <div style={{width:'70%', backgroundColor:'#f0f0f0', display:'flex', 
                flexDirection:'row',flexWrap:'wrap', alignItems:'center', justifyContent:'flex-start',minHeight:'300px', gap:'20px'}}>
                   <Card>
                       <CardHeader title="mytrello boards" />
                       <CardContent>
                          
                       </CardContent>
                   </Card>
                   <Card>
                       <CardHeader title="mytrello boards" />
                       <CardContent>
                          
                       </CardContent>
                   </Card>
                   <Card>
                       <CardHeader title="mytrello boards" />
                       <CardContent>
                          
                       </CardContent>
                   </Card>
                   <Card>
                       <CardHeader title="mytrello boards" />
                       <CardContent>
                          
                       </CardContent>
                   </Card>
                   <Card>
                       <CardHeader title="mytrello boards" />
                       <CardContent>
                          
                       </CardContent>
                   </Card>
                   
                    <Button variant="outlined" style={{height:'50px', width:'150px', backgroundColor:'#0079bf', color:'white', borderRadius:'5px'}}>
                        + Create new board
                    </Button>


               </div>
           </div>
        </div>
    )
}