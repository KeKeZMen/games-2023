"use client";

import { signOut } from "next-auth/react";

export const LogoutButton = () => {
  return (
    <button
      onClick={() => signOut({ redirect: false })}
      className="w-full text-left"
    >
      Выйти
    </button>
  );
};
