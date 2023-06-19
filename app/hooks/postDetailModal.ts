import { create } from 'zustand';

interface postDetailModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const postCreateModal = create<postDetailModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default postCreateModal;