import { LinkButton } from "./LinkButton";

const headerLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "#about",
  },
  {
    name: "Projects",
    href: "#projects",
  },
  {
    name: "Blog",
    href: "#blog",
  },
  {
    name: "Contact",
    href: "#contact",
  },
];

export const Header = () => {
  return (
    <div id="header" className="sticky top-0 bg-white z-50">
      <nav className="flex justify-center md:justify-end mb-8 p-2">
        <ul className="flex flex-row space-y-2 md:space-y-0 md:space-x-4">
          {headerLinks.map(({ name, href }) => (
            <LinkButton key={name} href={href}>
              {name}
            </LinkButton>
          ))}
        </ul>
      </nav>
    </div>
  );
};
