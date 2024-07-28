import { LinkButton } from "./LinkButton";

const headerLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Projects",
    href: "/projects",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];
export const Header = () => {
  return (
    <div id="header">
      <div className="px-12 py-8">
        <div className="flex justify-end">
          <div>
            <ul className="flex space-x-4 ">
              {headerLinks.map((link) => (
                <li key={link.name}>
                  <LinkButton href={link.href}>{link.name}</LinkButton>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
