import Image from "next/image";

export const Reason = ({
  content,
  icon,
}: {
  content: string;
  icon: string;
}) => {
  return (
    <div className="sm:max-w-[260px] xl:max-w-[unset] flex flex-col items-center mx-[auto]">
      <div
        className="w-44 h-44 rounded-full flex items-center justify-center"
        style={{
          background: "linear-gradient(180deg, #7143AA 0%, #B285EB 100%)",
        }}
      >
        <div className="w-[57%] h-[57%] relative">
          <Image src={`/images/${icon}`} alt={""} fill objectFit="cover" />
        </div>
      </div>
      <p className="text-gray mt-4 leading-6 text-sm text-center px-4">
        {content}
      </p>
    </div>
  );
};
