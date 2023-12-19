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
import ModalForecast from '../../interfaces/ModalForecast';

function ModalForecast({ isOpen, onClose, selectedCodeInsee }: ModalForecast) {
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
