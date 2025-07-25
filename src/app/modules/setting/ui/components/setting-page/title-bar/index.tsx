"use client";

interface TitleBarProps {
  title?: string;
}

export const TitleBar = ({ title }: TitleBarProps) => {
  return (
    <>
      <h1 className="text-xl font-semibold text-gray-800 transition-all duration-300 ease-in-out">
        {title}
      </h1>
    </>
  );
};
