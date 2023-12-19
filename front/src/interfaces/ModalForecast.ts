interface ModalForecast {
  isOpen: boolean;
  onClose: () => void;
  selectedCodeInsee?: string | null;
}

export default ModalForecast;