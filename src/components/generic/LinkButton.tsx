import Link from "next/link";
import classnames from "classnames";
import { FC } from "react";


interface LinkButtonProps {
  href: string;
  classNames?: string;
  onClick?: () => void;
  children: React.ReactNode;
}
export const LinkButton: FC<LinkButtonProps> = ({ href, classNames, onClick, children }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={classnames(
        classNames,
        "transition-shadow duration-200 ease-in-out",
        "shadow-neumorphism hover:shadow-neumorphismHover active:shadow-neumorphismActive"
      )}
    >
      {children}
    </Link>
  );
};