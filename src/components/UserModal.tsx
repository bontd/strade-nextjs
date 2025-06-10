"use client";
import ReactModal from "react-modal";
import { User } from "@/types/user";
import { countries } from "@/constant/countries";

export default function UserModal({
  isOpen,
  closeModal,
  dict,
  user,
}: {
  isOpen: boolean;
  closeModal: () => void;
  dict: any;
  user?: User;
}) {
  return (
    <ReactModal
      isOpen={isOpen}
      onAfterClose={() => closeModal()}
      onRequestClose={() => closeModal()}
      style={{
        content: { inset: "20vh 30vw 20vh 30vw" },
        overlay: { backgroundColor: "transparent" },
      }}
    >
      {user ? (
        <>
          <h3 className="text-center text-primary font-bold">
            {dict.userInfo}
          </h3>
          <p className="text-primary font-semibold mt-2">
            {dict.name}:{" "}
            <span className="text-primary font-normal">{user.name}</span>
          </p>
          <p className="text-primary font-semibold mt-2">
            Email:{" "}
            <span className="text-primary font-normal">{user.email}</span>
          </p>
          <p className="text-primary font-semibold mt-2">
            {dict.phoneNumber}:{" "}
            <span className="text-primary font-normal">{user.phone}</span>
          </p>
          <p className="text-primary font-semibold mt-2">
            {dict.country}:{" "}
            <span className="text-primary font-normal">
              {countries.find((i) => i.value === user.countryCode)?.label || ""}
            </span>
          </p>
          <p className="text-primary font-semibold mt-2">
            {dict.address}:{" "}
            <span className="text-primary font-normal">{user.address}</span>
          </p>
        </>
      ) : null}
    </ReactModal>
  );
}
