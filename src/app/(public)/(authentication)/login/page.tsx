import type { Metadata } from "next";
import LoginForm from "@/components/form/login-form";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to the Load Shedding & Power Management System to report outages, view schedules, and buy prepaid electricity tokens.",
};

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
