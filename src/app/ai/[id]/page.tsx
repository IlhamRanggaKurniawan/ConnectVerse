import AIConversation from '@/components/myComponents/ai/AIConversation'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Connect Verse",
  description: "Welcome to the Connect Verse AI page",
  keywords:"connect, verse, social media",
  authors: [{name: "Connect Verse team"}],
  openGraph: {
    title: "Connect Verse",
    description: "Welcome to the Connect Verse AI page",
    url: "https://ConnectVerse.com/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Connect Verse",
    description: "Welcome to the Connect Verse AI page",
  },
};

const page = ({params} : {params: {id : string}}) => {

  return (
    <div className="mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-0 overflow-hidden">
        <AIConversation id={+params.id}/>
    </div>
  )
}

export default page