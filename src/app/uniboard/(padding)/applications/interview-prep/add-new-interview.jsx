"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Button } from "@/components/button";
import Chip from "@/components/chip";
import Input from "@/components/input";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [isOpen, setIsOpen] = useState(false);
  const [applicationRound, setApplicationRound] = useState("Applied");
  const router = useRouter();

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <Button onClick={open} variant="ghost" className="w-full md:w-80 h-16" icon={<FaPlus />}>
        Start new Interview
      </Button>

      <Dialog open={isOpen} as="div" className="relative z-[99] focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-xl rounded-xl bg-white p-4 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="font-semibold text-center text-primary-blue text-base"
              >
                Interview Prep
              </DialogTitle>
              <div className="mt-4">
                <div className="flex gap-4">
                  <Input label="Role" name="role" required className="flex-1" />
                  <Input label="Company" name="company" required className="flex-1" />
                </div>
                <div>
                  <Input
                    label="Job Description"
                    textarea
                    name="job-description"
                    required
                    rows={8}
                  />
                </div>
              </div>
              <label htmlFor="application-round" className="text-xs mt-6 text-[#808080]">
                Round
              </label>
              <div className="flex flex-wrap gap-2 h-min mt-2" id="application-round">
                <Chip
                  className="cursor-pointer"
                  state={applicationRound === "Question Type 1" ? "default" : "gray"}
                  onClick={() => setApplicationRound("Question Type 1")}
                >
                  Question Type 1
                </Chip>
                <Chip
                  className="cursor-pointer"
                  state={applicationRound === "Question Type 2" ? "default" : "gray"}
                  onClick={() => setApplicationRound("Question Type 2")}
                >
                  Question Type 2
                </Chip>
                <Chip
                  className="cursor-pointer"
                  state={applicationRound === "Question Type 3" ? "default" : "gray"}
                  onClick={() => setApplicationRound("Question Type 3")}
                >
                  Question Type 3
                </Chip>
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  className=""
                  onClick={() => {
                    router.push("/uniboard/applications/interview-prep/new/questions");
                  }}
                  icon={<FaPlus />}
                >
                  Start Interview
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default AddNewInterview;
