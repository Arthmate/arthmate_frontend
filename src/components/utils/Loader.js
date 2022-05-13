import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {Box} from '@mui/material';

function Loader() {
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "80vh",width: "80%",opacity: "1",position: "absolute",zIndex: "1" }} >
                <CircularProgress      
                />
            </Box>
        </>
    )
}

export default Loader
