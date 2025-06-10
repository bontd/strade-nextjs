"use client";
import ReactModal from "react-modal";
import Link from "next/link";

const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "70vw",
    maxWidth: "600px",
    borderRadius: "8px"
  },
  overlay: {
    backgroundColor: "rgb(0 0 0 / 75%)"
  }
};

export default function LimitErrorModal({
  isOpen,
  closeModal,
  lang,
  dict,
}: {
  isOpen: boolean;
  closeModal: () => void;
  lang?: string;
  dict: any;
}) {
  return (
    <ReactModal
      isOpen={isOpen}
      onAfterClose={closeModal}
      onRequestClose={closeModal}
      style={customModalStyles}
    >
      <p className="text-primary mb-2">
        Bạn đã đạt tới giới hạn lượt xem thông tin người mua của ngày hôm nay.
        Vui lòng quay lại sau 24h. Bạn có thể đăng tải sản
        phẩm tại {" "}
        <Link href="/account-information">
          <strong className="underline">đây</strong>
        </Link>
      </p>
      <p className="text-primary">
        Để tăng giới hạn lượt xem trên ngày vui lòng liên hệ bộ phận CSKH để
        được hỗ trợ. Hotline: <strong><a href="tel:0982727425">0982 727 425</a></strong>
      </p>
      <div className="flex justify-end mt-8">
        <button onClick={closeModal} className="btn w-32 rounded-2xl">
          OK
        </button>
      </div>
    </ReactModal>
  );
}
