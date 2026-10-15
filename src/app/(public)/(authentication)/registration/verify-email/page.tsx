import VerifyEmailForm from "@/components/form/verify-email-form";
import React from "react";

const VerifyEmailPage = () => {
    return (
        <div className="flex flex-1">
            <div className="flex flex-1 items-center justify-center">
                <div className="w-full max-w-xs">
                    <VerifyEmailForm />
                </div>
            </div>
        </div>
    );
};

export default VerifyEmailPage;
