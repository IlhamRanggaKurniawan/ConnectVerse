"use client";

/* eslint-disable react/no-unescaped-entities */
import React, { ReactNode, useEffect, useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Input } from "../ui/input";
import { X } from "lucide-react";
import { Separator } from "../ui/separator";
import AccountPreview from "./AccountPreview";
import { ScrollArea } from "../ui/scroll-area";
import { findUser } from "@/lib/actions/user";
import { useDebounce } from "use-debounce"

type user  = {
  username: string
}

const SearchSheet = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState<string>("")
  const [users, setUsers] = useState<user[]>([])

  const [debouncedSearch] = useDebounce(search, 1000)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUsers = async() => {
    if(search.length > 0 ) {
      setUsers(await findUser(debouncedSearch))
    }
  }

  useEffect(() => {
    getUsers()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side={"bottom"} className="h-screen w-screen sm:w-96">
        <div className="flex items-center justify-between">
          <SheetHeader>
            <SheetTitle className="text-xl">Search</SheetTitle>
          </SheetHeader>
          <SheetClose asChild className="cursor-pointer">
            <X />
          </SheetClose>
        </div>
        <Input type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />

        <Separator className="my-1" />
        <ScrollArea className="h-full pb-[70px] flex flex-col gap-2 pr-2">
        {users.length > 0 ? (
            users.map((user) => (
              <AccountPreview key={user.username} username={user.username} />
            ))
          ) : (
            <div className="text-center"></div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default SearchSheet;