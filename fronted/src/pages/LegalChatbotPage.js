import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
  Card,
  CardContent
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import GavelIcon from '@mui/icons-material/Gavel';
import ApiService from '../services/api';

const LegalChatbotPage = () => {
  const [taskId, setTaskId] = useState('');
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleTaskIdChange = (event) => {
    setTaskId(event.target.value);
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!taskId.trim()) {
      setError('Please enter a Task ID from a previous document or video analysis.');
      return;
    }

    if (!query.trim()) {
      setError('Please enter a question.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Add user message to chat history immediately
      setChatHistory(prev => [
        ...prev,
        { role: 'user', content: query }
      ]);

      const response = await ApiService.legalChatbot(query, taskId);
      
      // Add AI response to chat history
      setChatHistory(prev => [
        ...prev,
        { role: 'assistant', content: response.response }
      ]);
      
      // Clear the query input
      setQuery('');
    } catch (error) {
      console.error('Error getting chatbot response:', error);
      setError('An error occurred while processing your question. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          <ChatIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Legal Q&A Assistant
        </Typography>
        
        <Typography variant="body1" paragraph>
          Ask legal questions about your previously analyzed documents or videos.
          You'll need the Task ID from your previous analysis.
        </Typography>

        <Paper sx={{ p: 3, mb: 4 }}>
          <TextField
            fullWidth
            label="Task ID"
            variant="outlined"
            value={taskId}
            onChange={handleTaskIdChange}
            placeholder="Enter the Task ID from your document or video analysis"
            margin="normal"
            helperText="This connects your questions to the specific document or video you analyzed"
          />
          
          {error && (
            <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
              {error}
            </Alert>
          )}
        </Paper>

        <Card variant="outlined" sx={{ mb: 3 }}>
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
                <Typography variant="h6">
                  <GavelIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Legal Assistant Chat
                </Typography>
              </Box>
              
              <Box sx={{ 
                flexGrow: 1, 
                overflow: 'auto', 
                p: 2,
                bgcolor: 'background.default'
              }}>
                {chatHistory.length === 0 ? (
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    height: '100%',
                    color: 'text.secondary'
                  }}>
                    <ChatIcon sx={{ fontSize: 60, mb: 2, opacity: 0.5 }} />
                    <Typography variant="body1">
                      No messages yet. Start by asking a legal question.
                    </Typography>
                  </Box>
                ) : (
                  <List>
                    {chatHistory.map((message, index) => (
                      <React.Fragment key={index}>
                        <ListItem 
                          alignItems="flex-start"
                          sx={{ 
                            bgcolor: message.role === 'assistant' ? 'background.paper' : 'transparent',
                            borderRadius: 2,
                            mb: 1
                          }}
                        >
                          <ListItemText
                            primary={message.role === 'user' ? 'You' : 'Legal Assistant'}
                            secondary={message.content}
                            primaryTypographyProps={{
                              fontWeight: 'bold',
                              color: message.role === 'assistant' ? 'primary.main' : 'text.primary'
                            }}
                            secondaryTypographyProps={{
                              variant: 'body1',
                              color: 'text.primary',
                              whiteSpace: 'pre-line'
                            }}
                          />
                        </ListItem>
                        {index < chatHistory.length - 1 && <Divider component="li" />}
                      </React.Fragment>
                    ))}
                  </List>
                )}
              </Box>
              
              <Divider />
              
              <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
                <form onSubmit={handleSubmit}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Ask a legal question..."
                      value={query}
                      onChange={handleQueryChange}
                      disabled={isLoading || !taskId.trim()}
                      size="small"
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                      type="submit"
                      disabled={isLoading || !query.trim() || !taskId.trim()}
                    >
                      {isLoading ? 'Sending' : 'Send'}
                    </Button>
                  </Box>
                </form>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Paper sx={{ p: 3, bgcolor: 'background.paper' }}>
          <Typography variant="h6" gutterBottom>
            Example Questions
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="What are the main liability clauses in this document?" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Explain the termination conditions in simple terms." />
            </ListItem>
            <ListItem>
              <ListItemText primary="What are the payment terms mentioned in this contract?" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Are there any concerning indemnification clauses I should be aware of?" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Summarize the insurance requirements in this agreement." />
            </ListItem>
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default LegalChatbotPage; 