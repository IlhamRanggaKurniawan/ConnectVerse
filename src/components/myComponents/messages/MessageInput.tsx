"use client";

import { Input } from "@/components/ui/input";
import { sendMessage } from "@/lib/actions/messaging";
import { Send } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { FormEvent, useState } from "react";

const MessageInput = ({ id, group }: { id: number; group: boolean }) => {
  const [text, setText] = useState("");
  const { data: session } = useSession();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!session) return;

      if (group) {
        await sendMessage({ groupId: id, message: text, senderId: session.user.id });
        return setText("");
      }

      await sendMessage({ directMessageId: id, message: text, senderId: session.user.id });
      setText("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-16 fixed bottom-0 left-0 w-screen z-50 px-2 items-center flex bg-background sm:pl-16 md:pl-20 lg:pl-60 pr-4 py-2">
      <form className="flex gap-2 w-screen" onSubmit={handleSubmit}>
        <Input placeholder="Message..." type="text" required className="rounded-full" onChange={(e) => setText(e.target.value)} value={text} />
        <button>
          <Send size={25} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
