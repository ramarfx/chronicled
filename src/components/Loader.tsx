import Image from "next/image";

const Loader = () => {
  return (
    <>
      <div className="absolute top-0 left-0 bg-primary/50 backdrop-blur-sm w-screen h-dvh flex z-10 flex-row items-center justify-between">
        <Image
          src="/gemini.svg"
          alt="gemini icon"
          width={20}
          height={20}
          className="size-[150px] mx-auto animate-spin"
          style={{ animationDuration: "3s" }}
        />
      </div>
    </>
  );
};

export default Loader;
