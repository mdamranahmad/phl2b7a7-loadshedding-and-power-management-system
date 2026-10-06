import Logo from "@/assets/svg/Logo";
import { Button } from "@/components/ui/button";
import { IUserRole } from "@/types";
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

    // While mutation, we were mutating data, and destructured mutation from useMutation, in case of Query, data and isLoading will be enough to use
    // Header will be a client component as fetching data is a dynamic process (static shell, dynamic item/island)
    // const { data, isLoading } = useGetMe(); // Hook call to check if user exists
    // const { mutate: logout } = useLogout(); // Mutate for post method to mutate the data
    // const queryClient = useQueryClient(); // To invalidate tags to refresh cache
    // console.log("data: ", data);

    // const role: UserRole = !!data?.data && data?.data.role;

    // const handleLogout = () => {
    //     logout(undefined, {
    //         onSuccess: () => {
    //             toast.add({
    //                 title: "GoodBye",
    //                 description: "Logged Out Successfuly",
    //                 type: "success",
    //             });
    //             // queryClient.invalidateQueries({ queryKey: ["user"] }); // Stales the user cache, a fresh data will be fetch for next refresh
    //             queryClient.removeQueries({ queryKey: ["user"] }); // remove stale cache
    //         },
    //         onError: () => {
    //             toast.add({
    //                 title: "Logout Failed!",
    //                 description: "Something Went Wrong",
    //                 type: "error",
    //             });
    //         },
    //     });
    // };
    return (
        <header className="w-full h-16 border border-t">
            <div className="flex justify-between items-center h-full max-w-7xl mx-auto">
                {/* <div>PH HealthCare</div> */}
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
                    {/* {role && <Link href={dashboardRoute[role]}>Dashboard</Link>} */}
                </nav>
                <div>
                    {/**Login Button will render only for logged out user */}
                    {/* {!isLoading && !data && ( */}
                    <Button
                        variant="outline"
                        render={<Link href="/login">Login</Link>}
                        nativeButton={false}
                    >
                        Login
                    </Button>
                    {/* )}
                    {!isLoading && data && ( */}
                    {/* <Button
                        // onClick={handleLogout}
                        variant="destructive"
                    >
                        Logout
                    </Button> */}
                    {/* )} */}
                </div>
            </div>
        </header>
    );
};

export default Header;
