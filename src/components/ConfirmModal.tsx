import ReactModal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const ConfirmModal = ({
  closeModal,
  dict,
  confirm,
  isOpen,
  title,
}: {
  closeModal: () => void;
  dict: any;
  confirm: () => void;
  isOpen: boolean;
  title: string;
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onAfterClose={() => {
        closeModal();
      }}
      onRequestClose={() => closeModal()}
      style={customStyles}
    >
      <div>
        <h2 className="text-primary">{title}</h2>
      </div>
      <div className="flex items-center justify-end gap-4 mt-8">
        <button
          type="button"
          onClick={closeModal}
          className="w-full lg:w-[158px] bg-[#868686] text-[12px] lg:text-[14px] text-[#ffffff] font-medium text-center uppercase py-2 px-2 lg:px-4 hover:opacity-70"
        >
          {dict.cancel}
        </button>
        <button
          onClick={confirm}
          className="w-full lg:w-[158px] bg-[#FF8900] text-[12px] lg:text-[14px] text-[#ffffff] font-medium text-center uppercase py-2 px-2 lg:px-4 hover:opacity-70"
        >
          {dict.confirm}
        </button>
      </div>
    </ReactModal>
  );
};
