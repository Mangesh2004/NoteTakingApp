import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import {Layout} from 'lucide-react'
import UploadPDF from "./UploadPDF";

export default function Sidebar() {
  return <div className="shadow-sm h-screen p-5">
    <Image src={'/logo.png'} alt="logo" height={50} width={50} />
    <div className="pt-4">
      <UploadPDF>
      <Button className="w-full">Upload PDF</Button>
      </UploadPDF>
      <div className="flex gap-2 items-center p-3 mt-5 hover:bg-black hover:text-white rounded-md cursor-pointer">

       <Layout/>
       <h2>Workspace</h2>
      </div>
    </div>
  </div>;
}
