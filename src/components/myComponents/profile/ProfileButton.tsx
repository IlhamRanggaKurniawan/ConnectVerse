"use client";

import React, { useEffect } from "react";
import { Button } from "../../ui/button";
import { useDebouncedCallback } from "use-debounce";
import { useSession } from "next-auth/react";
import { useFollowStore } from "@/lib/store/followStore";
import Link from "next/link";

const ProfileButton = ({ userId }: { userId: number }) => {
  const followingId = userId;
  const { data: session } = useSession();

  const { isFollow, checkFollow, toggleFollow } = useFollowStore();

  useEffect(() => {
    if (session) {
      checkFollow({ followerId: session.user.id, followingId });
    }
  }, [isFollow, checkFollow, session, followingId]);

  const debouncedFollow = useDebouncedCallback(async () => {
    if (session) {
      await toggleFollow({ followerId: session.user.id, followingId });
    }
  }, 500);

  if (followingId === session?.user.id) {
    return (
      <Button>
        <Link href="/setting"> Edit Profile </Link>
      </Button>
    );
  }

  return (
    <div className="flex justify-center my-2 gap-2">
      <div>
        {isFollow && session?.user.id ? (
          <Button onClick={() => debouncedFollow()} className="bg-slate-600 py-4 px-8 max-w-24">
            unfollow
          </Button>
        ) : (
          <Button onClick={() => debouncedFollow()} className="bg-blue-400 py-4 px-8 max-w-24">
            follow
          </Button>
        )}
      </div>
        {followingId !== session?.user.id && (
          <Button className="py-4 px-8 max-w-24">Message</Button>
        )}
    </div>
  );
};

export default ProfileButton;