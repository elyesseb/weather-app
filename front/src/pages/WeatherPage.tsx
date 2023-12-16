import { useEffect, useState } from 'react';
import axios from 'axios';
import City from '../interfaces/City';
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from '@chakra-ui/react';
import Forecast from '../components/Forecast';
import Pagination from '../components/Pagination';

function WeatherPage() {
  const [weatherData, setWeatherData] = useState<City[]>([]);
  const [filteredData, setFilteredData] = useState<City[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCodeInsee, setSelectedCodeInsee] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cities');
        setWeatherData(response.data);
        setFilteredData(response.data); // Initialise filteredData avec toutes les données
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, []);

  const handleForecastClick = (codeInsee: string) => {
    setSelectedCodeInsee(codeInsee);
    onOpen();
  };

  useEffect(() => {
    // Filtrer les données en fonction du terme de recherche
    const searchTermLower = searchTerm.toLowerCase();
    if (searchTermLower.trim() === '') {
      setFilteredData(weatherData);
    } else {
      const filteredCities = weatherData.filter((city) =>
        city.name.toLowerCase().includes(searchTermLower)
      );
      setFilteredData(filteredCities);
    }
  }, [searchTerm, weatherData]);

  // Calculez l'indice de début et de fin pour les éléments de la page actuelle
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Calculez le nombre total de pages
  const pageNumbers = Math.ceil(filteredData.length / itemsPerPage);

  // Créez une liste de numéros de page
  const pages = [];
  for (let i = 1; i <= pageNumbers; i++) {
    pages.push(i);
  }

  // Met à jour l'état currentPage lorsqu'un changement de page est déclenché
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {/* Barre de recherche */}
      <Input
        placeholder="Rechercher par ville..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        marginBottom={4}
        maxW={'sm'}
      />
      <Box borderWidth={1} borderRadius={12} padding={3} minW={'2xl'}>
        {filteredData && (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Code Insee</Th>
                  <Th>City</Th>
                  <Th>Population</Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentItems.map((city) => (
                  <Tr
                    key={city.id}
                    onClick={() => handleForecastClick(city.insee)}
                    _hover={{
                      background: 'gray.100',
                      cursor: 'pointer',
                    }}
                  >
                    <Td>{city.insee}</Td>
                    <Td>{city.name}</Td>
                    <Td>{city.population}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Affichez le composant de pagination en bas de votre contenu */}
      <Pagination
        currentPage={currentPage}
        totalPages={pageNumbers}
        onPageChange={handlePageChange}
      />

      {/* Modal pour afficher les détails de la prévision */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Prévision</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedCodeInsee && <Forecast codeInsee={selectedCodeInsee} />}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Fermer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default WeatherPage;
