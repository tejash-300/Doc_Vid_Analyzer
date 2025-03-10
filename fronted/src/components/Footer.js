import React from 'react';
import { Box, Typography, Link, Container, Grid, IconButton, Divider, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import GavelIcon from '@mui/icons-material/Gavel';

const FooterWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0),
  marginTop: 'auto',
  background: 'linear-gradient(180deg, rgba(248, 249, 253, 0) 0%, rgba(248, 249, 253, 1) 100%)',
  borderTop: '1px solid',
  borderColor: 'rgba(0, 0, 0, 0.05)',
}));

const GradientText = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(90deg, #6200EA 0%, #03DAC6 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    background: 'rgba(98, 0, 234, 0.1)',
  },
}));

const LogoIcon = styled(GavelIcon)(({ theme }) => ({
  fontSize: '24px',
  background: 'linear-gradient(90deg, #6200EA 0%, #03DAC6 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginRight: theme.spacing(1),
}));

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <FooterWrapper component="footer">
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={5} lg={4}>
            <GradientText variant="h6" gutterBottom>
              <LogoIcon />
              Legal Document & Video Analyzer
            </GradientText>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, pr: { md: 4 } }}>
              Powered by advanced AI to help legal professionals analyze documents and videos efficiently. Our tools provide insights, summaries, and answers to complex legal questions.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={3} lg={3}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Quick Links
            </Typography>
            <Divider sx={{ width: 40, mb: 2, borderWidth: 2, borderColor: 'primary.main' }} />
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {['Home', 'Document Analyzer', 'Video Analyzer', 'Legal Chatbot'].map((item) => (
                <Box component="li" key={item} sx={{ mb: 1 }}>
                  <Link 
                    href={`/${item === 'Home' ? '' : item.toLowerCase().replace(' ', '-')}`}
                    sx={{ 
                      color: 'text.primary',
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                      display: 'inline-block',
                      '&:hover': {
                        color: 'primary.main',
                        transform: 'translateX(4px)'
                      }
                    }}
                  >
                    {item}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4} lg={5}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Connect With Us
            </Typography>
            <Divider sx={{ width: 40, mb: 2, borderWidth: 2, borderColor: 'primary.main' }} />
            <Box sx={{ mb: 2 }}>
              <SocialButton color="primary" aria-label="github" component="a" href="https://github.com/tejash-300/Doc_Vid_Analyzer" target="_blank">
                <GitHubIcon />
              </SocialButton>
              <SocialButton color="primary" aria-label="linkedin" component="a" href="https://github.com/tejash-300" target="_blank">
                <LinkedInIcon />
              </SocialButton>
              <SocialButton color="primary" aria-label="twitter" component="a" href="https://github.com/tejash-300" target="_blank">
                <TwitterIcon />
              </SocialButton>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Have questions or feedback? Feel free to reach out to us on social media or via email at <Link href="mailto:contact@legalanalyzer.com" sx={{ color: 'primary.main' }}>contact@legalanalyzer.com</Link>
            </Typography>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Legal Document & Video Analyzer. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', mt: isMobile ? 2 : 0 }}>
            <Link href="#" sx={{ color: 'text.secondary', mr: 3, textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
              Privacy Policy
            </Link>
            <Link href="#" sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </FooterWrapper>
  );
};

export default Footer; 