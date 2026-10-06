import Link from "next/link";

const Header = () => {
    const routes = [
        { name: "Home", url: "/" },
        { name: "About Us", url: "/about-us" },
    ];
    return (
        <header className="w-full h-16 border border-t flex justify-center items-center">
            <nav className="flex gap-5">
                {routes.map((route) => (
                    <Link href={route.url} key={route.url}>
                        {route.name}
                    </Link>
                ))}
            </nav>
        </header>
    );
};

export default Header;
