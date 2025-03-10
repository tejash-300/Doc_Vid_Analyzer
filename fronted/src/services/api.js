import axios from 'axios';
import { API_ENDPOINTS } from '../config';

// Create axios instance with default config
const apiClient = axios.create({
  timeout: 300000, // 5 minutes timeout for large files
  headers: {
    'Content-Type': 'multipart/form-data',
  }
});

// API Service functions
const ApiService = {
  // Document Analysis
  analyzeDocument: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await apiClient.post(API_ENDPOINTS.ANALYZE_DOCUMENT, formData);
      return response.data;
    } catch (error) {
      console.error('Error analyzing document:', error);
      throw error;
    }
  },
  
  // Video Analysis
  analyzeVideo: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await apiClient.post(API_ENDPOINTS.ANALYZE_VIDEO, formData);
      return response.data;
    } catch (error) {
      console.error('Error analyzing video:', error);
      throw error;
    }
  },
  
  // Audio Analysis
  analyzeAudio: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await apiClient.post(API_ENDPOINTS.ANALYZE_AUDIO, formData);
      return response.data;
    } catch (error) {
      console.error('Error analyzing audio:', error);
      throw error;
    }
  },
  
  // Legal Chatbot
  legalChatbot: async (query, taskId) => {
    const formData = new FormData();
    formData.append('query', query);
    formData.append('task_id', taskId);
    
    try {
      const response = await apiClient.post(API_ENDPOINTS.LEGAL_CHATBOT, formData);
      return response.data;
    } catch (error) {
      console.error('Error getting chatbot response:', error);
      throw error;
    }
  },
  
  // Get Risk Chart
  getRiskChart: (chartType = 'bar') => {
    let endpoint;
    
    switch (chartType) {
      case 'pie':
        endpoint = API_ENDPOINTS.RISK_PIE_CHART;
        break;
      case 'radar':
        endpoint = API_ENDPOINTS.RISK_RADAR_CHART;
        break;
      case 'trend':
        endpoint = API_ENDPOINTS.RISK_TREND_CHART;
        break;
      case 'interactive':
        endpoint = API_ENDPOINTS.INTERACTIVE_RISK_CHART;
        break;
      default:
        endpoint = API_ENDPOINTS.RISK_BAR_CHART;
    }
    
    return endpoint;
  },
  
  // Health Check
  checkHealth: async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.HEALTH_CHECK);
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }
};

export default ApiService; 