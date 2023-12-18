import axios from 'axios';
import ForecastData from '../interfaces/Forecast';

const API_BASE_URL = 'http://localhost:3000';

export const ForecastService = {
  fetchForecastData: async (codeInsee: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/cities/${codeInsee}/forecast`);
      return response.data as ForecastData;
    } catch (error) {
      console.error('Error fetching forecast data:', error);
      throw error;
    }
  },
};