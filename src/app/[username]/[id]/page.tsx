import Content from "@/components/myComponents/content/Content";
import { getContentById } from "@/lib/actions/content";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = async ({ params }: { params: { id: string; username: string } }) => {
  const id = parseInt(params.id);

  if(isNaN(id)) {
    return
  }

  const content = await getContentById(id);



  return (
    <div className="pt-12 mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-4">
      <div className="w-screen h-12 flex items-center fixed top-0 left-0 bg-secondary sm:pl-14 md:pl-16 lg:pl-56 gap-4 pr-6 z-10">
        <Link href={`/${params.username}`}>
          <ChevronLeft size={35} />
        </Link>
        <h1 className="text-lg font-medium">Post</h1>
      </div>
      <div className="flex flex-col gap-4 items-center">
        {content ? 
        <Content uploader={content.uploader.username} caption={content.caption} url={content.url} />
         : 
         <div>no content available</div>}
      </div>
    </div>
  );
};

export default page;