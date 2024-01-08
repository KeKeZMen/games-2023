"use client";

import { Avatar, AvatarImage } from "@/lib/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/lib/ui/dropdown-menu";
import { User } from "next-auth";
import { FC } from "react";

type PropsType = {
  user: User;
  LogoutButton?: JSX.Element;
};

export const UserProfile: FC<PropsType> = ({ user, LogoutButton }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer">
          <AvatarImage src="/person.jpg" />
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mt-3 z-[101]">
        <DropdownMenuLabel className="font-normal p-2">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="flex justify-start p-2">
          {LogoutButton}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
