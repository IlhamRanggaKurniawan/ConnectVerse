import Content from "@/components/myComponents/content/Content";
import StraightContentInfinityScroll from "@/components/myComponents/content/StraightContentInfinityScroll";
import HeadMetaData from "@/components/myComponents/HeadMetaData";
import { getContentById, profileChainingContent } from "@/lib/actions/content";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = async ({ params }: { params: { id: string; username: string } }) => {
  const { data, error } = await getContentById({ id: +params.id });

  if (!data) {
    return <div className="mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-2 flex flex-col items-center justify-center">{error}</div>;
  }

  return (
    <>
      <HeadMetaData pathname={`/${params.username}/${params.id}`} metaDataDescription={`${params.username} content`} title={params.username}/>
      <div className="pt-12 mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-4">
        <div className="w-screen h-12 flex items-center fixed top-0 left-0 bg-secondary sm:pl-14 md:pl-16 lg:pl-56 gap-4 pr-6 z-10">
          <Link href={`/${params.username}`}>
            <ChevronLeft size={35} />
          </Link>
          <h1 className="text-lg font-medium">Post</h1>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <Content uploader={data.uploader.username} caption={data.caption} url={data.url} contentId={data.id} />
          <StraightContentInfinityScroll contentFuction={profileChainingContent} accountUsername={params.username} id={+params.id} />
        </div>
      </div>
    </>
  );
};

export default page;
