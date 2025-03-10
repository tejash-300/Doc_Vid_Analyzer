import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import theme from './theme';
import Typography from '@mui/material/Typography';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DocumentAnalyzerPage from './pages/DocumentAnalyzerPage';
import VideoAnalyzerPage from './pages/VideoAnalyzerPage';
import LegalChatbotPage from './pages/LegalChatbotPage';

// Services
import ApiService from './services/api';

function App() {
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'info'
  });
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Check backend connection
    checkBackendConnection();

    return () => clearTimeout(timer);
  }, []);

  const checkBackendConnection = async () => {
    try {
      await ApiService.checkHealth();
      setIsBackendConnected(true);
    } catch (error) {
      console.error('Backend connection failed:', error);
      setNotification({
        open: true,
        message: 'Could not connect to backend server. Some features may not work.',
        severity: 'warning'
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh',
            background: 'linear-gradient(135deg, rgba(98, 0, 234, 0.05) 0%, rgba(3, 218, 198, 0.05) 100%)',
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              animation: 'pulse 1.5s infinite ease-in-out',
              '@keyframes pulse': {
                '0%': { opacity: 0.6 },
                '50%': { opacity: 1 },
                '100%': { opacity: 0.6 }
              }
            }}
          >
            <CircularProgress size={60} thickness={4} />
            <Typography 
              variant="h6" 
              sx={{ 
                mt: 2, 
                background: 'linear-gradient(90deg, #6200EA 0%, #03DAC6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 600
              }}
            >
              Loading...
            </Typography>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <Box component="main" sx={{ flexGrow: 1, width: '100%' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/document-analyzer" element={<DocumentAnalyzerPage />} />
              <Route path="/video-analyzer" element={<VideoAnalyzerPage />} />
              <Route path="/legal-chatbot" element={<LegalChatbotPage />} />
              <Route path="/video-chatbot" element={<VideoAnalyzerPage />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
