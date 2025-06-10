"use client";
import { useEffect, useRef, useState } from "react";
import { getInboxes, replayMes } from "@/@api/user";
import { Message } from "@/types/user";
import Image from "next/image";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { toast, ToastContainer } from "react-toastify";

export const Inbox = ({ dict }: { dict: any }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageChoice, setMessageChoice] = useState<Message>();
  const [replyMessage, setReply] = useState<string>("");

  useEffect(() => {
    getInboxes({ order: "ASC" })
      .then((res: { data: Message[] }) => {
        setMessages(res.data);
      })
      .catch(() => setMessages([]));
  }, []);

  function submitReply() {
    replayMes(messageChoice?.messageId?._id || "", replyMessage)
      .then((res: any) => {
        setReply("");
        toast.success(dict.success, {
          position: "top-right",
        });
      })
      .catch((e: any) => {
        console.log(e);
        toast.error(dict.infoWrong, {
          position: "top-right",
        });
      });
  }

  if (messageChoice) {
    return (
      <div className="w-full">
        <ToastContainer />
        <div className="flex gap-x-2 w-full border-b-[1px] border-[#D9D9D9]">
          <ArrowLeftIcon
            className="w-6 h-6 text-gray cursor-pointer"
            onClick={() => setMessageChoice(undefined)}
          />
          <div className="text-gray font-bold pb-3 ">
            {messageChoice.messageId?.subject}
          </div>
        </div>
        <div
          className="text-gray text-sm w-full mt-4"
          dangerouslySetInnerHTML={{
            __html: messageChoice.messageId?.body || "",
          }}
        />
        <textarea
          value={replyMessage}
          //@ts-ignore
          onChange={(e) => setReply(e.target.value)}
          className="input h-64 mt-4"
        />
        <div className="flex justify-end">
          <div
            onClick={submitReply}
            className="flex gap-x-2 bg-primary font-bold px-4 py-2 rounded-3xl mt-2 cursor-pointer"
          >
            <Image src={"/images/send.svg"} alt={""} width={24} height={24} />
            {dict.answer}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {messages.map((item, index) => (
        <div
          onClick={() => setMessageChoice(item)}
          key={index}
          className="border-b-[1px] border-[#D9D9D9] mt-4 pb-4 cursor-pointer"
        >
          <div className="flex gap-x-4 h-6">
            <div className="w-1/4 text-gray font-bold text-sm overflow-hidden	whitespace-nowrap	text-ellipsis	">
              {item.messageId?.subject}
            </div>
            <div
              className="text-gray text-sm w-full overflow-hidden	whitespace-nowrap	text-ellipsis"
              dangerouslySetInnerHTML={{ __html: item.messageId?.body || "" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
