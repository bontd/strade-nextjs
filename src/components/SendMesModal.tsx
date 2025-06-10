import { ProductRequestType, ProductType } from "@/types/product";
import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { sendMes } from "@/@api/user";
import { toast, ToastContainer } from "react-toastify";
import ReactModal from "react-modal";
import LimitErrorModal from "@/components/LimitErrorModal";

export const SendMesModal = ({
  openSendMes,
  closeModal,
  dict,
  product,
  type,
  memberUrl,
}: {
  openSendMes: boolean;
  closeModal: () => void;
  dict: any;
  product: ProductType | ProductRequestType;
  type: "PRODUCT" | "REQUIREMENT";
  memberUrl: string;
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [isErrorLimit, setErrorLimit] = useState(false);

  const schema = yup
    .object({
      subject: yup.string().required("Please fill title"),
      body: yup.string().required("Please fill content"),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const onSubmit = async (data: any) => {
    setSubmitting(true);
    try {
      await sendMes({
        ...data,
        postSlug: product.slug,
        referType: type,
      });
      toast.success(dict.success, {
        position: "top-right",
      });
      closeModal();
    } catch (e: any) {
      console.log(e.message);
      if (e.message?.includes("reached your limit")) {
        setErrorLimit(true);
      } else {
        toast.error(e.message, {
          position: "top-right",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <ReactModal
      isOpen={openSendMes}
      onAfterClose={() => {
        closeModal();
        reset();
      }}
      onRequestClose={() => closeModal()}
      style={{
        content: { inset: "20vh 30vw 20vh 30vw" },
        overlay: { backgroundColor: "transparent" },
      }}
    >
      <form id="send-form" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-primary text-center uppercase">{dict.sendMes}</p>
        <div className="flex gap-x-4 items-center mt-8">
          <p className="text-primary w-1/4">{dict.title}: </p>
          <input className="input" {...register("subject")} />
        </div>
        <div className="flex gap-x-4 items-center mt-8">
          <p className="text-primary w-1/4">{dict.content}: </p>
          <textarea className="input h-64" {...register("body")} />
        </div>
        <div className="flex justify-center">
          <button
            disabled={submitting}
            type="submit"
            className="btn mt-4 w-32 rounded-2xl"
          >
            {dict.send}
          </button>
        </div>
      </form>
      <ToastContainer />
      <LimitErrorModal
        closeModal={() => setErrorLimit(false)}
        dict={dict}
        isOpen={isErrorLimit}
      />
    </ReactModal>
  );
};
