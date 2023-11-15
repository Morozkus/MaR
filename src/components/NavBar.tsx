import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';

export default function DenseAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar variant="dense" >
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div" sx={{flexGrow: 1}}>
                        M&R
                    </Typography>
                    <Stack direction={'row'} spacing={2} color='inherit'>
                    <Link to={'/'} color='inherit'>Главная</Link>
                    <Link to={'/repeat'} color='inherit'>Игра на память</Link>
                    <Link to={'/touch'} color='inherit'>Игра на моторику</Link>
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    );
}