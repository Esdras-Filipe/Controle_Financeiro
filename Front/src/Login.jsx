import { TextField, Grid, Button } from '@mui/material';
import React from 'react';
import './Login.css';

export default props => {

    return (
        <>
            <div className='container-items'>
                <div className='box-login'>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField id="outlined-basic" label="Login" variant="outlined" fullWidth
                                size="small" />
                        </Grid>
                        <Grid item xs={12} sx={{ marginTop: 5 }}>
                            <TextField id="outlined-basic" label="Senha" variant="outlined" fullWidth
                                size="small" />
                        </Grid>
                        <Grid item xs={12} sx={{ marginTop: 5 }}>
                            <Button variant="contained" color="success" fullWidth>
                                Logar
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    );

}