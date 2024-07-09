import React from "react"
import CoverImage from "./CoverImage"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import prisma from "@/db/prisma"
import { GetUserProfileAction } from "@/app/update-profile/actions"

const UserProfile = async () => {
    const admin = await prisma.user.findUnique({
        where: {
            email: process.env.ADMIN_EMAIL
        }
    })

    const currentUser = await GetUserProfileAction()

    return (
        <div className="flex flex-col">
            <CoverImage />

            <div className="flex flex-col p-4">
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                    <Avatar className="w-20 h-20 border-2 -mt-10">
                        <AvatarImage
                            src={admin?.image || "/user-placeholder.png"}
                            className="object-cover"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <div className="flex">
                        {!currentUser?.isSubscribed && (
                            <Button
                                className="rounded-full flex gap-10"
                                asChild
                            >
                                <Link href={"/pricing"}>
                                    <span className="uppercase font-semibold tracking-wide">
                                        Subscribe
                                    </span>
                                </Link>
                            </Button>
                        )}

                        {currentUser?.isSubscribed && (
                            <Button
                                className="rounded-full flex gap-10"
                                variant={"outline"}
                            >
                                <span className="uppercase font-semibold tracking-wide">
                                    Subscribed
                                </span>
                            </Button>
                        )}
                    </div>
                </div>

                <div className="flex flex-col mt-4">
                    <p className="text-lg font-semibold">{admin?.name}</p>

                    <p className="text-sm mt-2 md:text-md">
                        Discover daily tips and tricks for cat health and care,
                        along with insights into my personal routine with my
                        cats. Subscribe now to gain access to exclusive content
                        and become part of the community.
                    </p>
                </div>
            </div>

            <div
                className="h-2 w-full bg-muted-foreground"
                aria-hidden="true"
            />
        </div>
    )
}

export default UserProfile
