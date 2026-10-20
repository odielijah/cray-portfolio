"use client";

type ComingSoonProps = {
  title?: string;
};

const ComingSoon = ({ title = "Coming soon" }: ComingSoonProps) => {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
      <h1 className="header-text">{title}</h1>
    </div>
  );
};

export default ComingSoon;
