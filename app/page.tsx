// app/page.tsx
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 bg-gradient-to-r from-gray-100 to-blue-50 h-screen">
      <h1 className="text-4xl md:text-5xl font-bold">
        Upload your <span className="text-red-500">PDF</span> and take  <span className="text-blue-500">Notes</span> with Gemini-AI
      </h1>
      <p className="mt-4 text-lg md:text-xl max-w-2xl text-gray-600">
        Elevate your note-taking experience with our AI-powered PDF app. Seamlessly extract key insights, summaries, and annotations from any PDF with just a few clicks.
      </p>
      <div className="mt-8 flex space-x-4">
       <Link href={'/dashboard'}>
       <Button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 " variant={'destructive'}>
          Get started
        </Button></Link>
       
      </div>
     
    </div>
  );
}