// WorkspaceHeader.tsx
import React from "react";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

export default function WorkspaceHeader({fileName, notes, fileId}: {
  fileName: string;
  notes: string;
  fileId: string;
}) {
  const saveNotes = useMutation(api.notes.Addnotes);
  const { user } = useUser();

  const handleSave = async () => {
    try {
      await saveNotes({
        notes: notes,
        fileId: fileId,
        createdBy: user?.primaryEmailAddress?.emailAddress || ''
      });
      toast("Notes saved successfully!");
    } catch (error) {
      toast("Error saving notes");
    }
  };

  return (
    <div className=" sticky top-0 z-50 bg-white flex justify-between items-center text-2xl shadow-lg p-2">
      <Link href="/dashboard"><Image src={"/logo.png"} alt="logo" height={60} width={60} /></Link>
      <h2 className="font-bold">{fileName}</h2>
      <div className="flex gap-3">
        <Button onClick={handleSave} className="text-lg">Save</Button>
        <UserButton/>
      </div>
    </div>
  );
}