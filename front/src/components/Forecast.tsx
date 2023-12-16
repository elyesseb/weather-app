import { useEffect, useState } from 'react';
import ForecastData from '../interfaces/Forecast';
import axios from 'axios';
import { Box, Flex, Text } from '@chakra-ui/react';

interface ForecastProps {
  codeInsee: string;
}

function Forecast({ codeInsee }: ForecastProps) {
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/cities/${codeInsee}/forecast`
        );
        setForecastData(response.data);
      } catch (error) {
        console.error('Error fetching forecast data:', error);
      }
    };

    fetchData();
  }, [codeInsee]);

  return (
    <>
      {forecastData ? (
        <Box minW={'sm'}>
          <Box>
            <Flex justifyContent={'center'}>
              <i
                className={`bi bi-${forecastData.icon}`}
                style={{ fontSize: '60px' }}
              ></i>
            </Flex>
            <Flex flexDir={'column'} alignItems={'center'} mt="6">
              <Text>Probabilité de pluie</Text>
              <Box mt={'6'}>
                <Text fontSize="2xl" as={'b'}>
                  {forecastData.forecast.probarain}
                  {'\n%'}
                </Text>
              </Box>
            </Flex>
            <Flex justifyContent={'space-around'} mt="6">
              <Flex flexDir={'column'}>
                <Text fontSize="sm" as={'b'} align={'center'}>
                  Min
                </Text>
                <Text fontSize="2xl" as={'b'}>
                  {forecastData.forecast.tmin}
                  {'\n°C'}
                </Text>
              </Flex>
              <Flex flexDir={'column'}>
                <Text fontSize="sm" as={'b'} align={'center'}>
                  Max
                </Text>
                <Text fontSize="2xl" as={'b'}>
                  {forecastData.forecast.tmax}
                  {'\n°C'}
                </Text>
              </Flex>
            </Flex>
          </Box>
        </Box>
      ) : (
        <Text>Chargement des prévisions...</Text>
      )}
    </>
  );
}

export default Forecast;
