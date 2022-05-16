import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Navigate, useNavigate } from 'react-router-dom';
import Upload from '../upload/Upload';


const drawerWidth = 240;

export default function ClippedDrawer() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [userData, setUserData] = useState("")

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    }

    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('user'));
        setUserData(data);
    }, [])

    return (
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Arthmate
                            {/* <img src="/images/arthmate.jpeg"></img> */}
                        </Typography>
                        <div>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer', p: 1 }} onClick={handleMenu}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                {userData.username ? (userData.username.split('@')[0]) : ""}
                            </Typography>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                    }}
                >
                    <Toolbar />
                    <Box sx={{ overflow: 'auto' }}>
                        <List>
                            <ListItem button key='upload' >
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary="Upload" />
                            </ListItem>
                        </List>
                        <Divider />
                    </Box>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <Upload />
                </Box>
            </Box>
            );
}
