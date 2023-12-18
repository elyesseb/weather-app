import React from 'react';
import {
  Box,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import City from '../interfaces/City';

interface CityListProps {
  cities: City[];
  onCityClick: (codeInsee: string) => void;
}

const CityList: React.FC<CityListProps> = ({ cities, onCityClick }) => {
  return (
    <Box borderWidth={1} borderRadius={12} padding={3} minW={'2xl'}>
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
            {cities.map((city, i) => (
              <Tr
                key={i}
                onClick={() => onCityClick(city.insee)}
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
    </Box>
  );
};

export default CityList;
