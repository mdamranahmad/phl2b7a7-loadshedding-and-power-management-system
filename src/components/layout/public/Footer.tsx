import Link from "next/link";
import Logo from "@/assets/svg/Logo";

const footerLinks = [
  { name: "Services", url: "/services" },
  { name: "About Us", url: "/about" },
  { name: "FAQ", url: "/faq" },
  { name: "Contact", url: "/contact" },
];

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <Logo width={150} height={44} />
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {footerLinks.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Load Shedding & Power Management System
        </p>
      </div>
    </footer>
  );
};

export default Footer;
