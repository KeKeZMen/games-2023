import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

import { Nav } from "./Nav";
import { MenuButton } from "./Menu";
import { UserProfile } from "./UserProfile";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";
import Link from "next/link";
import { ScrollProgress } from "./ScrollProgress";
import { SearchProductInput } from "./SearchingInput";

const links = [
  { link: "/", title: "Главная" },
  {
    link: "/catalog?page=0&categoryId=all&startCost=0&finalCost=1000",
    title: "Каталог",
  },
];

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <header className="fixed w-full top-0 left-0 border-b-2 py-5 z-40 bg-[hsl(var(--primary-foreground))]">
        <ScrollProgress />
        <div className="w-full flex gap-6 justify-between items-center container">
          <Nav links={links} />
          <MenuButton links={links} />

          <div className="flex items-center justify-end md:justify-center relative w-[50%] md:w-fit">
            <h3 className="hidden md:block uppercase w-full md:text-2xl font-bold text-center my-3 mr-2">
              Games 2023
            </h3>
            <SearchProductInput />
          </div>

          <div className="flex justify-between items-center gap-3">
            {session?.user ? (
              <>
                <Link
                  href="/cart"
                  className="bg-no-repeat bg-center bg-[url('/cart.svg')] w-10 h-10"
                ></Link>
                <UserProfile
                  user={session.user}
                  LogoutButton={<LogoutButton />}
                />
              </>
            ) : (
              <LoginButton />
            )}
          </div>
        </div>
      </header>
    </>
  );
}
