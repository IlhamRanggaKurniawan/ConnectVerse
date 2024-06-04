"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { deleteComment } from "@/lib/actions/comment";
import React from "react";

const CommentDialog = ({ children, commentId }: { children: React.ReactNode; commentId: number }) => {
  const handleClick = async () => {
    await deleteComment({ commentId });
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogClose className="flex flex-col gap-2">
          <Button variant={"destructive"} className="w-full" onClick={handleClick}>
            Delete
          </Button>
          <Button className="w-full" variant={"secondary"}>
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
