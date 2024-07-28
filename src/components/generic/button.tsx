"use client";
import React from "react";
import classnames from "classnames";
import { joinClass } from "../../app/utils/base";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  btnClass?: string;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  btnClass,
  children,
  className,
  ...rest
}) => {
  return (
    <button
      className={classnames(
        "bg-[#EEEEEE] font-bold text-base text-primary tracking-wider rounded-3xl",
        "px-6 py-4 border-none outline-none cursor-pointer",
        "transition-shadow duration-200 ease-in-out",
        "shadow-neumorphism hover:shadow-neumorphismHover active:shadow-neumorphismActive",
        btnClass,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
