"use client";

import { IoIosClose } from "react-icons/io";
import { Button } from "@/components/button";
import { UniBotIcon } from "@/components/icons";
import { Dialog, DialogPanel } from "@headlessui/react";

// Adjust the path as needed

function UnibotModal({
  isOpen = true,
  heading = "",
  paragraph = "",
  redButtonText = "",
  onRedButtonClick = null,
  blueButtonText = "",
  onBlueButtonClick = null,
  greyButtonText = "",
  onGreyButtonClick = null,
  onClose = null,
}) {
  return (
    <Dialog open={isOpen} as="div" className="relative z-[99]" onClose={onClose || (() => {})}>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/10 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-lg transition-all duration-300 ease-out transform-gpu">
            {/* Close Button */}
            {onClose && (
              <button
                className="absolute top-4 right-4 text-lg hover:text-red-500"
                onClick={onClose}
              >
                <IoIosClose className="h-6 w-6" />
              </button>
            )}

            <div className="my-4 flex flex-col items-center gap-4">
              {/* Heading */}
              {heading && <h2 className="font-semibold text-lg">{heading}</h2>}

              {/* Paragraph */}
              {paragraph && <p className="text-gray-500 mt-2">{paragraph}</p>}

              {/* Action Buttons */}
              <div className="flex justify-center gap-2 mt-4">
                {/* Red Button */}
                {redButtonText && onRedButtonClick && (
                  <Button
                    onClick={onRedButtonClick}
                    className="bg-red-500 text-white hover:bg-red-600"
                  >
                    {redButtonText}
                  </Button>
                )}

                {/* Blue Button */}
                {blueButtonText && onBlueButtonClick && (
                  <Button
                    onClick={onBlueButtonClick}
                    className="bg-blue-500 text-white hover:bg-blue-600"
                  >
                    {blueButtonText}
                  </Button>
                )}

                {/* Grey Button */}
                {greyButtonText && onGreyButtonClick && (
                  <Button
                    onClick={onGreyButtonClick}
                    className="bg-gray-300 text-black hover:bg-gray-600"
                  >
                    {greyButtonText}
                  </Button>
                )}
              </div>
            </div>
            <div className="absolute bottom-[-20px] left-[-20px] bg-primary-blue rounded-full h-16 w-16 flex items-center justify-center">
              <UniBotIcon className="w-12 h-12" />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default UnibotModal;
