import React, { ReactNode } from "react";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../../ui/sheet";
import { X } from "lucide-react";
import { Separator } from "../../ui/separator";
import Notification from "./Notification";
import { INotification } from "@/lib/actions/notification";

const NotificationSheet = ({ children, side, notifications }: { children: ReactNode; side: "left" | "bottom" | "top" | "right", notifications: INotification[] }) => {
  return (
    <Sheet>
      <SheetTrigger asChild className="cursor-pointer">
        {children}
      </SheetTrigger>
      <SheetContent side={side} className="h-screen w-screen sm:w-96 p-0">
        <div className="flex items-center justify-between p-4">
          <SheetHeader>
            <SheetTitle className="text-xl">Notification</SheetTitle>
          </SheetHeader>
          <SheetClose asChild className="cursor-pointer">
            <X />
          </SheetClose>
        </div>
        <Separator className="mb-1" />
        <div className="flex flex-col pb-4 h-[26rem] sm:h-[682px] gap-1 overflow-y-scroll px-3">
          {notifications.map((notification) => (
            <Notification key={notification.id}  username={notification.user.username} content={notification.content} createdAt={notification.createdAt} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationSheet;
