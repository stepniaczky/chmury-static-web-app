import React from "react";
import * as authActions from "../../store/actions/auth";

export const SignOutButton = () => {
    const handleSignOut = () => {
        authActions.logOut();
    };

    return (
        <a href="/logout" className="text-white">
        <button onClick={handleSignOut}>
            WYLOGUJ SIĘ
        </button>
        </a>
  );
};