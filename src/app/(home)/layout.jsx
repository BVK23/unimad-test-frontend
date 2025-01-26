import Navbar from "./navbar";

const HomeLayout = ({ children }) => {
  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden">
      <Navbar />
      <div className="flex-grow">{children}</div>
      <div className="absolute w-full flex items-center justify-center select-none -bottom-[170rem] z-[-1]">
        <div className="w-[200rem] h-[180rem] flex-shrink-0 rounded-full bg-primary-blue bg-opacity-50 filter blur-[400px]" />
      </div>
    </div>
  );
};

export default HomeLayout;
