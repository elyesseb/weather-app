import {
  Modal,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import Forecast from './Forecast';

interface ModalForecastProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCodeInsee: string | null;
}

function ModalForecast({ isOpen, onClose, selectedCodeInsee }: ModalForecastProps) {

  return (
<>
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

export default ModalForecast;
