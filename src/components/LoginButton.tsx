"use client";

import { Dialog, DialogContent } from "@/lib/ui/dialog";
import AuthForm from "./AuthForm";
import { useCallback, useState } from "react";

export const LoginButton = () => {
  const [isOpened, setIsOpened] = useState(false);

  const handleDropdown = useCallback(() => {
    setIsOpened((prev) => !prev);
  }, []);

  return (
    <>
      <button onClick={handleDropdown}>Войти</button>

      <Dialog open={isOpened} onOpenChange={handleDropdown}>
        <DialogContent>
          <AuthForm onClose={handleDropdown} />
        </DialogContent>
      </Dialog>
    </>
  );
};
