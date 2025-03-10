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
  CardHeader,
  Divider,
  Alert,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DescriptionIcon from '@mui/icons-material/Description';
import WarningIcon from '@mui/icons-material/Warning';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ApiService from '../services/api';
import { API_ENDPOINTS } from '../config';

const DocumentAnalyzerPage = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [chartType, setChartType] = useState('bar');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setError('');
    } else {
      setFile(null);
      setFileName('');
      setError('Please select a valid PDF file.');
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setError('Please select a file to analyze.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await ApiService.analyzeDocument(file);
      setResult(response);
      setTabValue(0); // Reset to summary tab
    } catch (error) {
      console.error('Error analyzing document:', error);
      setError('An error occurred while analyzing the document. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
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
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          <DescriptionIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Legal Document Analyzer
        </Typography>
        
        <Typography variant="body1" paragraph>
          Upload a legal document (PDF) for AI-powered analysis. Our system will extract key information,
          identify potential risks, and provide a summary of the document.
        </Typography>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Button
              variant="contained"
              component="label"
              startIcon={<UploadFileIcon />}
            >
              Select PDF
              <input
                type="file"
                accept=".pdf"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            
            {fileName && (
              <Typography variant="body2">
                Selected: {fileName}
              </Typography>
            )}
            
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={!file || isLoading}
              sx={{ ml: 'auto' }}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Analyze Document'}
            </Button>
          </Box>
          
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Paper>

        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
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
                <Tab icon={<SummarizeIcon />} label="Summary" />
                <Tab icon={<WarningIcon />} label="Risk Assessment" />
                <Tab icon={<AssessmentIcon />} label="Visualizations" />
              </Tabs>
              
              <Box sx={{ p: 3 }}>
                {tabValue === 0 && (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Document Summary
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {result.summary}
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
                        No significant contract clauses detected.
                      </Typography>
                    )}
                    
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
                      Risk Assessment
                    </Typography>
                    
                    <Grid container spacing={3} sx={{ mb: 3 }}>
                      {result.risk_scores && Object.entries(result.risk_scores).map(([key, value]) => (
                        <Grid item xs={12} sm={6} md={4} key={key}>
                          <Card>
                            <CardHeader
                              title={key}
                              subheader={`Risk Score: ${renderRiskScore(value)}`}
                              titleTypographyProps={{ variant: 'subtitle1' }}
                              sx={{ pb: 0 }}
                            />
                            <CardContent>
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
                            <Typography variant="body2" paragraph>
                              <strong>Example:</strong> {info.example}
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="body2">
                              <strong>Context from Document:</strong> {info.context_summary}
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
                
                {tabValue === 2 && (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Risk Visualizations
                    </Typography>
                    
                    <FormControl sx={{ mb: 3, minWidth: 200 }}>
                      <InputLabel>Chart Type</InputLabel>
                      <Select
                        value={chartType}
                        label="Chart Type"
                        onChange={handleChartTypeChange}
                      >
                        <MenuItem value="bar">Bar Chart</MenuItem>
                        <MenuItem value="pie">Pie Chart</MenuItem>
                        <MenuItem value="radar">Radar Chart</MenuItem>
                        <MenuItem value="trend">Trend Chart</MenuItem>
                      </Select>
                    </FormControl>
                    
                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                      {chartType === 'interactive' ? (
                        <iframe
                          src={ApiService.getRiskChart(chartType)}
                          width="100%"
                          height="500"
                          title="Interactive Risk Chart"
                          frameBorder="0"
                        />
                      ) : (
                        <img
                          src={ApiService.getRiskChart(chartType)}
                          alt={`${chartType} Risk Chart`}
                          style={{ maxWidth: '100%', height: 'auto', maxHeight: '500px' }}
                        />
                      )}
                    </Box>
                  </Box>
                )}
              </Box>
            </Paper>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default DocumentAnalyzerPage; 