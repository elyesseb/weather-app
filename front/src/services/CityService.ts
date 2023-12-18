import axios from 'axios';
import City from '../interfaces/City';

const API_BASE_URL = 'http://localhost:3000';

export const CityService = {
  fetchCities: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/cities`);
      return response.data as City[];
    } catch (error) {
      console.error('Error fetching city data:', error);
      throw error;
    }
  },

  filterCities: (cities: City[], searchTerm: string) => {
    return cities.filter((city) =>
      city.name.toLowerCase().includes(searchTerm)
    );
  },
};
