// API Configuration
const API_BASE_URL = "https://1963-35-185-253-183.ngrok-free.app"; // Replace with your actual backend URL

export const API_ENDPOINTS = {
  // Document Analysis
  ANALYZE_DOCUMENT: `${API_BASE_URL}/analyze_legal_document`,
  
  // Video Analysis
  ANALYZE_VIDEO: `${API_BASE_URL}/analyze_legal_video`,
  
  // Audio Analysis
  ANALYZE_AUDIO: `${API_BASE_URL}/analyze_legal_audio`,
  
  // Legal Chatbot
  LEGAL_CHATBOT: `${API_BASE_URL}/legal_chatbot`,
  
  // Risk Visualizations
  RISK_BAR_CHART: `${API_BASE_URL}/download_risk_chart`,
  RISK_PIE_CHART: `${API_BASE_URL}/download_risk_pie_chart`,
  RISK_RADAR_CHART: `${API_BASE_URL}/download_risk_radar_chart`,
  RISK_TREND_CHART: `${API_BASE_URL}/download_risk_trend_chart`,
  INTERACTIVE_RISK_CHART: `${API_BASE_URL}/interactive_risk_chart`,
  
  // Health Check
  HEALTH_CHECK: `${API_BASE_URL}/health`
};

export default API_ENDPOINTS; 