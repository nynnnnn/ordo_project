import { create } from 'zustand';

interface postAddModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const postAddeModal = create<postAddModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default postAddeModal;