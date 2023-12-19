import { Box, Button } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (current: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <Box display="flex" justifyContent="center" mt={4} minW={"2xl"}>
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
        leftIcon={<ChevronLeftIcon />}
      >
        Précédent
      </Button>
      <Box
        mx={2}
        fontSize={'xs'}
        display={'flex'}
        alignItems={'center'}
        marginX={18}
      >{`Page ${currentPage} sur ${totalPages}`}</Box>
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
        rightIcon={<ChevronRightIcon />}
      >
        Suivant
      </Button>
    </Box>
  );
}

export default Pagination;