import React from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Box, 
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link } from 'react-router-dom';
import DescriptionIcon from '@mui/icons-material/Description';
import VideocamIcon from '@mui/icons-material/Videocam';
import ChatIcon from '@mui/icons-material/Chat';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { styled, keyframes } from '@mui/material/styles';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(98, 0, 234, 0.1) 0%, rgba(3, 218, 198, 0.1) 100%)',
  borderRadius: '24px',
  padding: theme.spacing(8, 4),
  marginBottom: theme.spacing(6),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 10% 20%, rgba(98, 0, 234, 0.05) 0%, transparent 50%)',
    zIndex: 0,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 90% 80%, rgba(3, 218, 198, 0.05) 0%, transparent 50%)',
    zIndex: 0,
  },
  animation: `${fadeIn} 0.8s ease-out`,
}));

const ToolCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
  },
  animation: `${fadeIn} 0.8s ease-out`,
  animationFillMode: 'both',
  overflow: 'visible',
}));

const IconWrapper = styled(Box)(({ color }) => ({
  backgroundColor: color,
  borderRadius: '16px',
  padding: '16px',
  display: 'inline-flex',
  marginBottom: '16px',
  boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    animation: `${pulse} 1s infinite ease-in-out`,
  },
}));

const CardButton = styled(Button)(({ theme, color }) => ({
  marginTop: 'auto',
  background: `linear-gradient(45deg, ${color} 30%, ${color}99 90%)`,
  color: 'white',
  '&:hover': {
    background: `linear-gradient(45deg, ${color} 30%, ${color}CC 90%)`,
  },
}));

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const tools = [
    {
      title: 'Document Analyzer',
      description: 'Upload and analyze legal documents, contracts, and agreements with our AI-powered system for quick insights and summaries.',
      icon: <DescriptionIcon sx={{ color: 'white', fontSize: 36 }} />,
      path: '/document-analyzer',
      color: '#6200EA', // Purple
      delay: 0,
    },
    {
      title: 'Video Analyzer',
      description: 'Analyze video content with AI-powered transcription, sentiment analysis, and key point extraction for legal proceedings.',
      icon: <VideocamIcon sx={{ color: 'white', fontSize: 36 }} />,
      path: '/video-analyzer',
      color: '#03DAC6', // Teal
      delay: 0.1,
    },
    {
      title: 'Legal Chatbot',
      description: 'Get instant answers to your legal questions about analyzed documents with our advanced AI assistant trained on legal precedents.',
      icon: <ChatIcon sx={{ color: 'white', fontSize: 36 }} />,
      path: '/legal-chatbot',
      color: '#FF9800', // Orange
      delay: 0.2,
    },
    {
      title: 'Video Chatbot',
      description: 'Ask questions about analyzed video content and get AI-powered responses that reference specific moments in your videos.',
      icon: <VideoLibraryIcon sx={{ color: 'white', fontSize: 36 }} />,
      path: '/video-chatbot',
      color: '#F50057', // Pink
      delay: 0.3,
    },
  ];

  return (
    <Box sx={{ width: '100%', overflowX: 'hidden' }}>
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <HeroSection>
          <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'left', maxWidth: '800px' }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 3 }}>
              AI-Powered Legal Analysis Tools
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              Streamline your legal workflow with our suite of AI-powered tools designed to analyze documents and videos with unprecedented accuracy and speed.
            </Typography>
            <Button 
              variant="contained" 
              size="large" 
              endIcon={<ArrowForwardIcon />}
              component={Link}
              to="/document-analyzer"
              sx={{ px: 4, py: 1.5 }}
            >
              Get Started
            </Button>
          </Box>
        </HeroSection>

        <Box sx={{ mb: 4, textAlign: 'left' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Our Tools
          </Typography>
          <Divider sx={{ mb: 4, width: '80px', borderWidth: '2px', borderColor: 'primary.main' }} />
        </Box>

        <Grid container spacing={4} alignItems="stretch">
          {tools.map((tool, index) => (
            <Grid item xs={12} sm={6} md={6} key={tool.path}>
              <ToolCard sx={{ animationDelay: `${tool.delay}s` }}>
                <CardContent sx={{ p: 4, flexGrow: 1 }}>
                  <IconWrapper color={tool.color}>
                    {tool.icon}
                  </IconWrapper>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {tool.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    {tool.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 3, pt: 0 }}>
                  <CardButton 
                    variant="contained" 
                    endIcon={<ArrowForwardIcon />}
                    component={Link}
                    to={tool.path}
                    color={tool.color}
                    fullWidth
                  >
                    Explore
                  </CardButton>
                </CardActions>
              </ToolCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage; 