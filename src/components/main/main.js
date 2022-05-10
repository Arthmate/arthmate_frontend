import React from 'react'

function Main() {
    return (
        <div>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {/* <Routes>
                    <Route path="/upload" component={<Upload />}></Route>
                </Routes> */}
                <Upload />
            </Box>
        </div>
    )
}

export default Main
