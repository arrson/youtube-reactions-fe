import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from '@chakra-ui/react';

import AddReactionForm from './AddReactionForm';

interface ModalProps {
  isOpen: boolean;
  onToggle: () => void;
  onSubmit?: () => void;
}

const AddReactionModal = ({ isOpen, onToggle, onSubmit }: ModalProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onToggle} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Reaction</ModalHeader>
          <ModalCloseButton />
          <AddReactionForm onSubmit={onSubmit} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddReactionModal;
