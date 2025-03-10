import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import VideocamIcon from '@mui/icons-material/Videocam';
import ChatIcon from '@mui/icons-material/Chat';
import InfoIcon from '@mui/icons-material/Info';
import GavelIcon from '@mui/icons-material/Gavel';

const drawerWidth = 240;

const Sidebar = ({ open }) => {
  const location = useLocation();
  
  const menuItems = [
    {
      text: 'Home',
      icon: <HomeIcon />,
      path: '/'
    },
    {
      text: 'Document Analyzer',
      icon: <DescriptionIcon />,
      path: '/document-analyzer'
    },
    {
      text: 'Video Analyzer',
      icon: <VideocamIcon />,
      path: '/video-analyzer'
    },
    {
      text: 'Legal Q&A',
      icon: <ChatIcon />,
      path: '/legal-chatbot'
    }
  ];

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <GavelIcon sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" color="primary" fontWeight="bold">
          Legal AI Assistant
        </Typography>
      </Box>
      
      <Divider />
      
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={RouterLink}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.12)',
                },
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      
      <Divider />
      
      <List>
        <ListItem button component="a" href="https://github.com/tejash-300/Doc_Vid_Analyzer" target="_blank">
          <ListItemIcon><InfoIcon /></ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar; 