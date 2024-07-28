import Link from "next/link";
import classnames from "classnames";

export const LinkButton = ({ href, children }) => {
  return (
    <Link
      href={href}
      className={classnames(
        "bg-[#EEEEEE] font-bold text-base text-primary tracking-wider rounded-3xl",
        "px-6 py-4 border-none outline-none cursor-pointer",
        "transition-shadow duration-200 ease-in-out",
        "shadow-neumorphism hover:shadow-neumorphismHover active:shadow-neumorphismActive"
      )}
    >
      {children}
    </Link>
  );
};
