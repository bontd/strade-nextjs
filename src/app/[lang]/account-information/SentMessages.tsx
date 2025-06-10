"use client";
import { useEffect, useState } from "react";
import { Message, MessageSent } from "@/types/user";
import { getMailSent } from "@/@api/user";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";

export const SentMessages = ({ dict }: { dict: any }) => {
  const [messages, setMessages] = useState<MessageSent[]>([]);
  const [messageChoice, setMessageChoice] = useState<MessageSent>();

  useEffect(() => {
    getMailSent({ order: "ASC" })
      .then((res: { data: MessageSent[] }) => {
        setMessages(res.data);
      })
      .catch(() => setMessages([]));
  }, []);

  if (messageChoice) {
    return (
      <div className="w-full">
        <div className="flex gap-x-2 w-full border-b-[1px] border-[#D9D9D9]">
          <ArrowLeftIcon
            className="w-6 h-6 text-gray cursor-pointer"
            onClick={() => setMessageChoice(undefined)}
          />
          <div className="text-gray font-bold pb-3 ">
            {messageChoice?.subject}
          </div>
        </div>
        <div
          className="text-gray text-sm w-full mt-4"
          dangerouslySetInnerHTML={{
            __html: messageChoice?.body || "",
          }}
        />
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
              {item?.subject}
            </div>
            <div
              className="text-gray text-sm w-full overflow-hidden	whitespace-nowrap	text-ellipsis"
              dangerouslySetInnerHTML={{ __html: item?.body || "" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
