"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { LinkedInLoginButton } from "@/components/linkedin-login-button";
import UnibotModal from "@/components/unibot-modal";
import { UnimadLogo } from "@/components/unimad-logo";
import { Outfit } from "next/font/google";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { register } from "swiper/element/bundle";

register();

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-primary-blue flex items-center justify-center">
      <UnimadLogo className="w-48" />
    </div>
  );
};

const SearchParamsHandler = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [errorData, setErrorData] = useState(null);

  useEffect(() => {
    const error = searchParams.get("error");
    const message = searchParams.get("message");

    if (error && message) {
      setErrorData({
        heading: error.split("_").join(" "),
        paragraph: atob(message),
      });
    }
  }, [searchParams]);

  const handleErrorModalClose = () => {
    setErrorData(null);
    router.replace("/");
  };

  return errorData ? (
    <UnibotModal
      heading={errorData.heading}
      paragraph={errorData.paragraph}
      blueButtonText="Okay"
      onBlueButtonClick={handleErrorModalClose}
      onClose={handleErrorModalClose}
    />
  ) : null;
};

const HomePage = () => {

  return (
    <>
      <Suspense fallback={<LoadingScreen />}>
        <SearchParamsHandler />
      </Suspense>

      <div className="flex h-[91vh] justify-center flex-col gap-2 md:gap-5 py-12 items-center">
        
        <div className="max-w-3xl w-full mx-auto h-[30vh] sm:h-[40vh] md:h-[50vh] overflow-hidden">
        </div>
        <LinkedInLoginButton type="hero" />
      </div>
    </>
  );
};

export default HomePage;
