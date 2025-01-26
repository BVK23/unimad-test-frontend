import { useEffect, useState } from "react";
import { LuDot } from "react-icons/lu";
import { UniBotIcon } from "@/components/icons";
import { Dialog, DialogPanel } from "@headlessui/react";

const UnibotLoadingModal = ({ loadingMessage }) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    // Create a loading effect with dots
    const interval = setInterval(() => {
      setDots(prevDots => (prevDots.length < 3 ? prevDots + "." : ""));
    }, 500); // Adjust timing for smoother effect

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <Dialog open={true} as="div" className="relative z-[99]" onClose={() => {}}>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/30 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="relative w-full max-w-md rounded-xl bg-white p-4 shadow-lg transition-all duration-300 ease-out transform-gpu">
            <div className="my-4 flex flex-col items-center gap-4">
              {/* Main content */}
              <div className="text-center">
                <h2 className="font-semibold text-lg">
                  {loadingMessage} {dots}
                </h2>
              </div>
            </div>
            <div className="absolute bottom-[-20px] left-[-20px] bg-primary-blue rounded-full h-16 w-16 flex items-center justify-center">
              <UniBotIcon className="w-12 h-12 custom-spin" />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default UnibotLoadingModal;
