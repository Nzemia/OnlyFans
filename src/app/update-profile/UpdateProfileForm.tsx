"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip"
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary"
import { useState } from "react"

const UpdateProfileForm = () => {
    const [medialUrl, setMediaUrl] = useState<string | null>(null)
    return (
        <div className="px-2 md:px-10 my-20">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Update Profile</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="flex justify-center">
                        <Avatar className="w-20 h-20">
                            <AvatarImage
                                src="/user-placeholder.png"
                                className="object-cover"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>

                    <form action="">
                        <Label>Name</Label>
                        <Input
                            placeholder="Name"
                            value={"name"}
                            className="my-2"
                        />

                        <Label>Email</Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger
                                    className="w-full"
                                    type="button"
                                >
                                    <Input
                                        disabled
                                        value={"youremail@gmail.com"}
                                        className="my-2"
                                    />
                                </TooltipTrigger>

                                <TooltipContent>
                                    <p className="text-lg font-extrabold ">
                                        For security reasons, your email cannot
                                        be changed. 😥
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <CldUploadWidget
                            signatureEndpoint={"/api/sign-image"}
                            onSuccess={(result, { widget }) => {
                                setMediaUrl(
                                    (result.info as CloudinaryUploadWidgetInfo)
                                        .secure_url
                                )
                                widget.close()
                            }}
                        >
                            {({ open }) => {
                                return (
                                    <Button
                                        onClick={() => open()}
                                        variant={"outline"}
                                        type="button"
                                        className="w-full mt-2 mb-4"
                                    >
                                        Change Image
                                    </Button>
                                )
                            }}
                        </CldUploadWidget>

                        <Button type="submit" className="w-full">
                            Update Profile
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default UpdateProfileForm
