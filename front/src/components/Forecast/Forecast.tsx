import { useEffect, useState } from 'react';
import LoadingIndicator from './LoadingIndicator';
import ForecastDisplay from './ForecastDisplay';
import ForecastData from '../../interfaces/Forecast';
import { ForecastService } from '../../services/forecastService';

interface ForecastProps {
  codeInsee: string;
}

function Forecast({ codeInsee }: ForecastProps) {
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ForecastService.fetchForecastData(codeInsee);
        setForecastData(data);
      } catch (error) {
        console.error('Error fetching forecast data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [codeInsee]);

  return <>{loading ? <LoadingIndicator /> : <ForecastDisplay forecastData={forecastData} />}</>;
}

export default Forecast;