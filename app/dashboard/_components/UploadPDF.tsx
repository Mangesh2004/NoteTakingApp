import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function UploadPDF({children}:any) {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription asChild>
                <div className="p-1 ">
                    <div className="p-3 shadow-lg ">
                        <h2 className="pb-1">Select the file to upload</h2>
                        <input type="file" accept="application/pdf" />
                    </div>
                    <div className="pt-3 shadow-lg ">
                        <label > FileName</label>
                        <Input placeholder="Enter the name of the file" />

                    </div>
                </div>
              
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button>Upload</Button>
        </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
