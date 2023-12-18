import { useEffect, useState } from 'react';
import { useDisclosure, Input } from '@chakra-ui/react';
import Pagination from '../components/Pagination';
import ModalForecast from '../components/Forecast/ModalForecast';
import CityList from '../components/CityList';
import { CityService } from '../services/CityService';
import City from '../interfaces/City';

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
        const data = await CityService.fetchCities();
        setWeatherData(data);
        setFilteredData(data);
      } catch (error) {
        console.error('Error fetching cities data:', error);
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
      const filteredCities = CityService.filterCities(weatherData, searchTermLower);
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
      {/* Tableau des données des villes  */}
      <CityList cities={currentItems} onCityClick={handleForecastClick} />
      {/* Affichez le composant de pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={pageNumbers}
        onPageChange={handlePageChange}
      />
      {/* Modal pour afficher les détails de la prévision */}
      <ModalForecast
        isOpen={isOpen}
        onClose={onClose}
        selectedCodeInsee={selectedCodeInsee}
      />
    </>
  );
}

export default WeatherPage;