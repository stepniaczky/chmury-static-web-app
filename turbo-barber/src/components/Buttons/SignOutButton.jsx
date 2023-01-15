import React from "react";
import { useMsal } from "@azure/msal-react";

/**
 * Renders a sign-out button
 */
export const SignOutButton = () => {
    const { instance } = useMsal();

    const handleLogout = () => {
        instance.logoutRedirect({
                postLogoutRedirectUri: "/",
            });
        }
    return (
        <button className="ml-auto" onClick={() => handleLogout()}>WYLOGUJ SIĘ</button>
    )
}