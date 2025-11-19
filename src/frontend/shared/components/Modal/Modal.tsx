type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-50 flex items-center justify-center z-20"
        onClick={onClose}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center z-30 p-6">
        <div className="bg-white rounded-lg shadow-lg p-6 size-5/6">
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
