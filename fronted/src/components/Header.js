import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import GavelIcon from '@mui/icons-material/Gavel';
import DescriptionIcon from '@mui/icons-material/Description';
import VideocamIcon from '@mui/icons-material/Videocam';
import ChatIcon from '@mui/icons-material/Chat';
import HomeIcon from '@mui/icons-material/Home';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  color: theme.palette.text.primary,
  transition: 'all 0.3s ease',
}));

const LogoText = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(90deg, #6200EA 0%, #03DAC6 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 700,
  letterSpacing: '0.5px',
}));

const LogoIcon = styled(GavelIcon)(({ theme }) => ({
  fontSize: '28px',
  background: 'linear-gradient(90deg, #6200EA 0%, #03DAC6 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginRight: theme.spacing(1),
}));

const NavButton = styled(Button)(({ theme, active }) => ({
  margin: theme.spacing(0, 1),
  borderRadius: '12px',
  padding: theme.spacing(1, 2),
  position: 'relative',
  fontWeight: 600,
  transition: 'all 0.3s ease',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '6px',
    left: '50%',
    width: active ? '30%' : '0%',
    height: '3px',
    background: 'linear-gradient(90deg, #6200EA 0%, #03DAC6 100%)',
    transition: 'all 0.3s ease',
    transform: 'translateX(-50%)',
    borderRadius: '10px',
  },
  '&:hover': {
    backgroundColor: 'rgba(98, 0, 234, 0.05)',
    '&::after': {
      width: '30%',
    },
  },
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  justifyContent: 'space-between',
  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
}));

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Document Analyzer', icon: <DescriptionIcon />, path: '/document-analyzer' },
    { text: 'Video Analyzer', icon: <VideocamIcon />, path: '/video-analyzer' },
    { text: 'Legal Chatbot', icon: <ChatIcon />, path: '/legal-chatbot' },
  ];

  const drawer = (
    <Box sx={{ width: 280 }} role="presentation">
      <DrawerHeader>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LogoIcon />
          <LogoText variant="h6">Legal Analyzer</LogoText>
        </Box>
        <IconButton onClick={handleDrawerToggle}>
          <ChevronRightIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            component={RouterLink} 
            to={item.path}
            selected={isActive(item.path)}
            sx={{
              my: 0.5,
              mx: 1,
              borderRadius: 2,
              '&.Mui-selected': {
                backgroundColor: 'rgba(98, 0, 234, 0.08)',
                '&:hover': {
                  backgroundColor: 'rgba(98, 0, 234, 0.12)',
                },
              },
              '&:hover': {
                backgroundColor: 'rgba(98, 0, 234, 0.05)',
              },
            }}
          >
            <ListItemIcon sx={{ 
              color: isActive(item.path) ? 'primary.main' : 'inherit',
              minWidth: '40px'
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{ 
                fontWeight: isActive(item.path) ? 600 : 400,
                color: isActive(item.path) ? 'primary.main' : 'inherit'
              }} 
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <StyledAppBar position="sticky" elevation={scrolled ? 4 : 0}>
        <Container maxWidth="xl" disableGutters>
          <Toolbar sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
            <IconButton
              edge="start"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon color="primary" />
            </IconButton>
            
            <Box component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <LogoIcon />
              <LogoText
                variant="h6"
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                Legal Document & Video Analyzer
              </LogoText>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {!isMobile && (
              <Box sx={{ display: 'flex' }}>
                {menuItems.map((item) => (
                  <NavButton
                    key={item.text}
                    component={RouterLink}
                    to={item.path}
                    startIcon={item.icon}
                    active={isActive(item.path)}
                  >
                    {item.text}
                  </NavButton>
                ))}
              </Box>
            )}
          </Toolbar>
        </Container>
      </StyledAppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box' },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header; 