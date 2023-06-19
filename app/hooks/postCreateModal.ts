import { create } from 'zustand';

interface postCreateModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const postCreateModal = create<postCreateModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default postCreateModal;