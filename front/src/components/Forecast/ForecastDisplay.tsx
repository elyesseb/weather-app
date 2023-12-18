import { Box, Flex, Text } from '@chakra-ui/react';
import Forecast from '../../interfaces/Forecast';

interface ForecastDisplayProps {
    forecastData: Forecast | null;
  }

  function ForecastDisplay({ forecastData }: ForecastDisplayProps) {
  return (
    <Box minW={'sm'}>
      <Box>
        <Flex justifyContent={'center'}>
          <i className={`bi bi-${forecastData?.icon}`} style={{ fontSize: '60px' }}></i>
        </Flex>
        <Flex flexDir={'column'} alignItems={'center'} mt="6">
          <Text>Probabilité de pluie</Text>
          <Box mt={'6'}>
            <Text fontSize="2xl" as={'b'}>
              {forecastData?.forecast.probarain}
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
              {forecastData?.forecast.tmin}
              {'\n°C'}
            </Text>
          </Flex>
          <Flex flexDir={'column'}>
            <Text fontSize="sm" as={'b'} align={'center'}>
              Max
            </Text>
            <Text fontSize="2xl" as={'b'}>
              {forecastData?.forecast.tmax}
              {'\n°C'}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}

export default ForecastDisplay;