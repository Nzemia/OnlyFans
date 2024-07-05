import Link from "next/link"
import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Home, LayoutDashboard, Shirt, User } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "./ui/dropdown-menu"

import { ModeToggle } from "./ModeToggle"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import LogOutButton from "./LogOutButton"

const SidebarLinks = [
    {
        icon: Home,
        label: "Home",
        href: "/"
    },
    {
        icon: Shirt,
        label: "Merchardise",
        href: "/merch"
    }
]

const Sidebar = async () => {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    //making the admin only to see the dashboard
    const isAdmin = process.env.ADMIN_EMAIL === user?.email

    return (
        <div className="flex lg:w-1/5 flex-col gap-3 px-2 border-r sticky left-0 top-0 h-screen">
            <Link href="/update-profile" className="max-w-fit">
                <Avatar className="mt-4 cursor-pointer">
                    <AvatarImage
                        src={user?.picture || "/user-placeholder.png"}
                        className="object-cover"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </Link>

            <nav className="flex flex-col gap-3">
                {SidebarLinks.map(link => (
                    <Link
                        href={link.href}
                        key={link.href}
                        className="flex w-12 lg:w-full items-center gap-2 hover:bg-primary-foreground 
                            font-bold hover:text-primary px-2 py-1 rounded-full justify-center lg:justify-normal"
                    >
                        <link.icon className="w-6 h-6" />

                        <span className="hidden lg:block">{link.label}</span>
                    </Link>
                ))}

                {isAdmin && (
                    <Link
                        href="/secret-dashboard"
                        className="flex w-12 lg:w-full items-center gap-2 hover:bg-primary-foreground 
                            font-bold hover:text-primary px-2 py-1 rounded-full justify-center lg:justify-normal"
                    >
                        <LayoutDashboard className="w-6 h-6" />

                        <span className="hidden lg:block">Dashboard</span>
                    </Link>
                )}

                <DropdownMenu>
                    <div
                        className="className='flex w-12 lg:w-full items-center gap-2 hover:bg-primary-foreground 
                            font-bold hover:text-primary px-2 py-1 rounded-full justify-center lg:justify-normal'"
                    >
                        <DropdownMenuTrigger className="flex items-center gap-2">
                            <User className="h-6 w-6" />
                            <span className="hidden lg:block">Settings</span>
                        </DropdownMenuTrigger>
                    </div>

                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>

                        <DropdownMenuSeparator />

                        <Link href="#">
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                        </Link>

                        <LogOutButton />
                    </DropdownMenuContent>
                </DropdownMenu>

                <ModeToggle />
            </nav>
        </div>
    )
}

export default Sidebar
