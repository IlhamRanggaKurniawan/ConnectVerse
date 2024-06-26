import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import AccountPreview from "../AccountPreview";
import { useSession } from "next-auth/react";
import { getMutualFollowers, IUserPreview } from "@/lib/actions/user";
import { addMembers, getGroupMembers } from "@/lib/actions/messaging";
import { SheetClose } from "@/components/ui/sheet";

const InviteMembersDialog = ({ children, id }: { children: React.ReactNode; id?: number }) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<IUserPreview[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<IUserPreview[]>([]);
  const [debouncedSearch] = useDebounce(search, 500);
  const [groupMembers, setGroupMembers] = useState<IUserPreview[]>([]);

  const { data: session } = useSession();

  const getUsers = async () => {
    try {
      if (!session) return;

      const { data } = await getMutualFollowers({ username: search, id: session.user.id });

      if (!data) return;

      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getMembers = async () => {
    try {
      if (!id) return;
      const { data } = await getGroupMembers({ id });

      if (!data) return;

      setGroupMembers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectUser = (user: IUserPreview) => {
    if (selectedUsers.find((prev) => prev.id === user.id)) {
      return setSelectedUsers(selectedUsers.filter((prev) => prev.id !== user.id));
    }

    setSelectedUsers([...selectedUsers, user]);
  };

  const addPeople = async () => {
    try {
      if (!id) return;

      await addMembers({ groupId: id, members: selectedUsers });

      getMembers();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
    getMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <div className="flex justify-between">
          <DialogHeader className=" font-medium">Invite users</DialogHeader>
          <DialogClose className="flex flex-col gap-2">
            <X />
          </DialogClose>
        </div>
        <Separator className=" bg-black" />
        <Input type="text" placeholder="Add members" onChange={(e) => setSearch(e.target.value)} />
        <div className="h-96 overflow-y-auto">
          {users.map((user) => {
            if (groupMembers.some((member) => member.id === user.id)) return;
            const isSelected = selectedUsers.some((selectedUser) => selectedUser.id === user.id);
            return (
              <button className={`w-full text-left rounded-md ${isSelected ? "bg-gray-200" : ""}`} key={user.id} onClick={() => handleSelectUser(user)}>
                <AccountPreview username={user.username} profilePicture={user.profileUrl} />
              </button>
            );
          })}
        </div>
        {selectedUsers.length === 0 ? (
          <Button className="w-full" variant={"secondary"} disabled>
            Invite users
          </Button>
        ) : (
          <SheetClose>
            <Button className="w-full" onClick={addPeople}>
              Invite users
            </Button>
          </SheetClose>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default InviteMembersDialog;
