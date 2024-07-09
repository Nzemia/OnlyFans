"use client"

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"
import { DropdownMenuItem } from "./ui/dropdown-menu"

const LogOutButton = () => {
    return (
        <LogoutLink>
            <DropdownMenuItem>Logout</DropdownMenuItem>
        </LogoutLink>
    )
}

export default LogOutButton
