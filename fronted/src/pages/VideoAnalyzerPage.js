import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Container,
  Grid,
  Card,
  CardContent,
  Divider,
  Alert,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  IconButton
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VideocamIcon from '@mui/icons-material/Videocam';
import WarningIcon from '@mui/icons-material/Warning';
import SummarizeIcon from '@mui/icons-material/Summarize';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import ApiService from '../services/api';

const UploadBox = styled(Box)(({ theme }) => ({
  border: '2px dashed #ccc',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  textAlign: 'center',
  backgroundColor: '#f8f9fa',
  cursor: 'pointer',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: '#f0f1f2'
  }
}));

const VideoAnalyzerPage = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [transcript, setTranscript] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    handleFileSelection(droppedFile);
  };

  const handleFileSelection = (selectedFile) => {
    if (!selectedFile) return;

    const validTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/mpeg'];
    if (!validTypes.includes(selectedFile.type)) {
      alert('Please upload a valid video file (MP4, AVI, MOV, MPEG)');
      return;
    }

    if (selectedFile.size > 200 * 1024 * 1024) { // 200MB limit
      alert('File size must be less than 200MB');
      return;
    }

    setFile(selectedFile);
    setFileName(selectedFile.name);
    setFileSize((selectedFile.size / (1024 * 1024)).toFixed(1) + 'MB');
    setUploadSuccess(true);
    setAnalyzing(true);

    // Simulate analysis (replace with actual API call)
    setTimeout(() => {
      setTranscript('In the courtroom, in the court. The case may also be heard in front of a jury. These are 12 members of the public who have been selected at random from the electoral role. They won\'t know you or the accused. Their job is to hear all the evidence and decide beyond reasonable doubt if the person is guilty or not. In the middle of the courtroom, it\'s the bar table. This is where the Crown Prosecutor and the Defence Team sit.');
      setAnalyzing(false);
    }, 2000);
  };

  const handleBrowseClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleFileInputChange = (e) => {
    handleFileSelection(e.target.files[0]);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileName('');
    setFileSize('');
    setUploadSuccess(false);
    setTranscript('');
    setAnalyzing(false);
  };

  const handleSubmit = async () => {
    if (!file) {
      setError('Please select a file to analyze.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await ApiService.analyzeVideo(file);
      setResult(response);
      setTabValue(0); // Reset to transcript tab
    } catch (error) {
      console.error('Error analyzing video:', error);
      setError('An error occurred while analyzing the video. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const renderRiskScore = (score) => {
    let color = 'success';
    if (score > 30) color = 'warning';
    if (score > 60) color = 'error';

    return (
      <Chip 
        label={score} 
        color={color} 
        variant="outlined" 
        size="small" 
        sx={{ ml: 1 }}
      />
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          🎬 Video Content Analyzer
        </Typography>
      </Box>

      <Typography variant="h6" gutterBottom>
        📤 Upload a Video File
      </Typography>

      <input
        type="file"
        id="fileInput"
        accept="video/mp4,video/avi,video/mov,video/mpeg"
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
      />

      {!file && (
        <UploadBox
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleBrowseClick}
        >
          <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Drag and drop file here
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Limit 200MB per file • MP4, AVI, MOV, MPEG4
          </Typography>
        </UploadBox>
      )}

      {file && (
        <Paper sx={{ p: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body1">{fileName}</Typography>
              <Typography variant="body2" color="text.secondary">
                {fileSize}
              </Typography>
            </Box>
            <IconButton onClick={handleRemoveFile} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </Paper>
      )}

      {uploadSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Video uploaded successfully! {analyzing ? 'Analyzing...' : ''}
        </Alert>
      )}

      {transcript && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            📝 Video Transcript
          </Typography>
          <Paper sx={{ p: 3 }}>
            <Typography variant="body1">
              {transcript}
            </Typography>
          </Paper>
        </Box>
      )}

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Processing video... This may take several minutes depending on the file size.
          </Typography>
        </Box>
      )}

      {result && (
        <Box sx={{ mt: 4 }}>
          <Paper sx={{ mb: 3 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab icon={<TextSnippetIcon />} label="Transcript" />
              <Tab icon={<SummarizeIcon />} label="Summary" />
              <Tab icon={<WarningIcon />} label="Risk Assessment" />
            </Tabs>
            
            <Box sx={{ p: 3 }}>
              {tabValue === 0 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Video Transcript
                  </Typography>
                  <Paper 
                    variant="outlined" 
                    sx={{ 
                      p: 2, 
                      maxHeight: '400px', 
                      overflow: 'auto',
                      bgcolor: 'background.paper' 
                    }}
                  >
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                      {result.transcript || 'No transcript available.'}
                    </Typography>
                  </Paper>
                  
                  <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Task ID: {result.task_id}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Save this ID for use with the Legal Q&A feature
                    </Typography>
                  </Box>
                </Box>
              )}
              
              {tabValue === 1 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Video Summary
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {result.summary || 'No summary available.'}
                  </Typography>
                  
                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Detected Contract Clauses
                  </Typography>
                  {result.clauses_detected && result.clauses_detected.length > 0 ? (
                    <Grid container spacing={2}>
                      {result.clauses_detected.map((clause, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <Chip
                            label={`${clause.type} (${(clause.confidence * 100).toFixed(1)}%)`}
                            color="primary"
                            variant="outlined"
                            sx={{ m: 0.5 }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No significant contract clauses detected in the speech.
                    </Typography>
                  )}
                </Box>
              )}
              
              {tabValue === 2 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Risk Assessment
                  </Typography>
                  
                  <Grid container spacing={3} sx={{ mb: 3 }}>
                    {result.risk_scores && Object.entries(result.risk_scores).map(([key, value]) => (
                      <Grid item xs={12} sm={6} md={4} key={key}>
                        <Card>
                          <CardContent>
                            <Typography variant="subtitle1" gutterBottom>
                              {key}
                              {renderRiskScore(value)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {result.detailed_risk && result.detailed_risk[key] 
                                ? result.detailed_risk[key].description 
                                : 'No detailed information available.'}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                  
                  <Typography variant="h6" gutterBottom>
                    Detailed Risk Information
                  </Typography>
                  
                  {result.detailed_risk && Object.entries(result.detailed_risk).length > 0 ? (
                    Object.entries(result.detailed_risk).map(([key, info]) => (
                      <Accordion key={key}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography variant="subtitle1">{key}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography variant="body2" paragraph>
                            <strong>Description:</strong> {info.description}
                          </Typography>
                          <Typography variant="body2" paragraph>
                            <strong>Common Concerns:</strong> {info.common_concerns}
                          </Typography>
                          <Typography variant="body2" paragraph>
                            <strong>Recommendations:</strong> {info.recommendations}
                          </Typography>
                          <Divider sx={{ my: 1 }} />
                          <Typography variant="body2">
                            <strong>Context from Transcript:</strong> {info.context_summary}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No detailed risk information available.
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          </Paper>
        </Box>
      )}
    </Container>
  );
};

export default VideoAnalyzerPage; 