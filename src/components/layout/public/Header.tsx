"use client";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Logo from "@/assets/svg/Logo";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useLogoutHandler, useUserGetMe } from "@/hooks";
import type { IUserRole } from "@/types";

const routes = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: "About Us", url: "/about" },
    { name: "FAQ", url: "/faq" },
    { name: "Contact", url: "/contact" },
];

const dashboardRoute: Record<IUserRole, string> = {
    ZONE_MANAGER: "/zone",
    SUBSTATION_MANAGER: "/substation",
    TECHNICIAN: "/technician",
    CUSTOMER: "/customer",
};

const Header = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { data, isLoading } = useUserGetMe();
    const { handleLogout, isPending } = useLogoutHandler();
    const role = data?.data?.role ?? null;

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
                <Link href="/" aria-label="Home">
                    <Logo width={170} height={50} />
                </Link>

                <nav className="hidden items-center gap-6 md:flex">
                    {routes.map((route) => (
                        <Link
                            key={route.url}
                            href={route.url}
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {route.name}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    {!isLoading && !data && (
                        <>
                            <Button
                                variant="ghost"
                                nativeButton={false}
                                render={<Link href="/register">Register</Link>}
                            />
                            <Button
                                variant="outline"
                                nativeButton={false}
                                render={<Link href="/login">Login</Link>}
                            />
                        </>
                    )}
                    {!isLoading && data && role && (
                        <>
                            <Button
                                variant="outline"
                                nativeButton={false}
                                render={
                                    <Link href={dashboardRoute[role]}>
                                        Dashboard
                                    </Link>
                                }
                            />
                            <Button
                                variant="destructive"
                                onClick={handleLogout}
                                disabled={isPending}
                            >
                                Logout
                            </Button>
                        </>
                    )}

                    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                        <Button
                            variant="outline"
                            size="icon"
                            className="md:hidden"
                            aria-label="Open navigation menu"
                            render={<SheetTrigger />}
                        >
                            <Menu className="size-4" />
                        </Button>
                        <SheetContent side="right" className="w-64">
                            <SheetTitle className="sr-only">
                                Navigation
                            </SheetTitle>
                            <nav className="mt-6 flex flex-col gap-4">
                                {routes.map((route) => (
                                    <Link
                                        key={route.url}
                                        href={route.url}
                                        onClick={() => setMobileOpen(false)}
                                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        {route.name}
                                    </Link>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
};

export default Header;
