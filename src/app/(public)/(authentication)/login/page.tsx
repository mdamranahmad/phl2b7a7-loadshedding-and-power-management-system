import LoginForm from "@/components/form/login-form";
import React from "react";

const LoginPage = () => {
    return (
        <div className="grid min-h-svh">
            <div className="flex flex-1 items-center justify-center">
                <LoginForm />
                </div>
        </div>
    );
};

export default LoginPage;
