import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WeatherPage from './pages/WeatherPage';
import { Box, VStack, Heading } from '@chakra-ui/react';

function App() {
  return (
    <Router>
      <Box position="relative" h="100vh" p={4}>
        <VStack>
          <Heading as="h1" mb={4}>
            Prévisions Météo
          </Heading>
          <Routes>
            <Route path="/" element={<WeatherPage />} />
          </Routes>
        </VStack>
      </Box>
    </Router>
  );
}

export default App;
