"use client";

import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout, useUser } from "@/features/auth/hooks/use-auth";
import Link from "next/link";
import { CrownLine, Logout2, Settings, User} from "@solar-icons/react";

export function UserNav() {
  const { data: user } = useUser();
  const { mutate: logout } = useLogout();

  const initials =
    user?.user_metadata?.full_name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <UserAvatar
            size="sm"
            src={user?.user_metadata?.avatar_url}
            alt={user?.user_metadata?.username}
            fallback={initials}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={15} className="w-56 mr-5 rounded-[20px]" >
        <DropdownMenuLabel className="font-normal p-4">
          <div className="flex flex-col space-y-1">
            <p className="text-base font-medium leading-none">
              {user?.user_metadata?.full_name}
            </p>
            <p className="text-sm leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="text-base icon font-medium rounded-xl m-1 ">
            <Link href="/profile">
              <User weight="Linear" className="mr-2 size-5 text-foreground" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="text-base icon font-medium rounded-xl m-1 ">
            <Link href="/settings">
              <Settings weight="Linear" className="mr-2 size-5 text-foreground" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem onClick={() => logout()} className="text-base icon font-medium rounded-xl m-1 ">
          <Logout2 weight="Linear" className="mr-2 size-5 text-foreground" />
          <span>Log out</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="m-2">
          <Button  variant="outline" className="w-full rounded-xl font-semibold icon">
            <CrownLine weight="Linear" className="mr-2 size-5 text-foreground" />
            <span>Upgrade to Pro</span>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
