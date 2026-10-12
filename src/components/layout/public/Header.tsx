"use client";

import Logo from "@/assets/svg/Logo";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useUserGetMe, useUserLogout } from "@/hooks";
import { IApiError, IUserRole } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

const Header = () => {
    const routes = [
        { name: "Home", url: "/" },
        // { name: "Doctors", url: "/doctors" },
        { name: "About Us", url: "/about-us" },
    ];

    const dashboardRoute: Record<IUserRole, string> = {
        ZONE_MANAGER: "/zone",
        SUBSTATION_MANAGER: "/substation",
        TECHNICIAN: "/technician",
        CUSTOMER: "/customer",
    };

    const { data, isLoading } = useUserGetMe();
    const { mutate: logout } = useUserLogout();
    // useQueryClient() from M45V05 is not used for now, will be used later
    const queryClient = useQueryClient();

    // console.log("data: ", data);

    const role: IUserRole = data?.data.role;

    // const queryClient = useQueryClient(); // To invalidate tags to refresh cache
    // console.log("data: ", data);

    // const role: UserRole = !!data?.data && data?.data.role;

    const handleLogout = () => {
        logout(undefined, {
            onSuccess: (res) => {
                toast.add({
                    title: "Logout Successful.",
                    description: res.message || "See you next time",
                    type: "success",
                });
                // useQueryClient() is not used to remove cach data, cach token is removed on logout but working logic unknown, will implement later
                // queryClient.invalidateQueries({ queryKey: ["user"] });
                queryClient.removeQueries({ queryKey: ["user"] });
                // Calling queryClient.removeQueries({ queryKey: ["user"] }) forces React Query to immediately drop the cached user data. This instantly updates the UI state
            },

            onError: (err: IApiError) => {
                toast.add({
                    title: "Logout Failed!",
                    description: err.data?.message || "Something Went Wrong!",
                    type: "error",
                });
            },
        });
    };

    return (
        <header className="w-full h-16 border border-t">
            <div className="flex justify-between items-center h-full max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <Link href="./">
                        <Logo />
                    </Link>
                </div>
                <nav className="flex gap-5">
                    {routes.map((route) => (
                        <Link href={route.url} key={route.url}>
                            {route.name}
                        </Link>
                    ))}
                    {role && <Link href={dashboardRoute[role]}>Dashboard</Link>}
                    {/* {role && <Link href={dashboardRoute[role]}>Dashboard</Link>} */}
                </nav>
                <div>
                    {!isLoading && !data && (
                        <Button
                            variant="outline"
                            render={<Link href="/login">Login</Link>}
                            nativeButton={false}
                        >
                            Login
                        </Button>
                    )}
                    {!isLoading && data && (
                        <Button onClick={handleLogout} variant="destructive">
                            Logout
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
