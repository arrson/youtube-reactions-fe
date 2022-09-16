import Panel from './Panel';
import AddReactionForm from './AddReactionForm';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const AddReactionPanel = ({ isOpen, onClose, onSubmit }: ModalProps) => {
  return (
    <Panel isOpen={isOpen} onClose={onClose} title="Add Reaction">
      <AddReactionForm onSubmit={onSubmit} />
    </Panel>
  );
};

export default AddReactionPanel;
