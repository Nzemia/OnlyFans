"use server"

import prisma from "@/db/prisma"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

type PostArgs = {
    text: string
    mediaUrl?: string
    mediaType?: "image" | "video"
    isPublic: boolean
}
export async function CreatePostAction({
    isPublic,
    mediaUrl,
    mediaType,
    text
}: PostArgs) {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    const isAdmin = user?.email === process.env.ADMIN_EMAIL
    if (!user || !isAdmin) {
        throw new Error("Only admin users can create posts!")
    }

    const newPost = await prisma.post.create({
        data: {
            text,
            mediaUrl,
            mediaType,
            isPublic,
            userId: user.id
        }
    })

    return { succes: true, post: newPost }
}

export async function GetAllProductsAction() {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    const isAdmin = user?.email === process.env.ADMIN_EMAIL

    if (!user || !isAdmin) {
        throw new Error("Only admin users can create posts!")
    }

    const products = await prisma.product.findMany()

    return products
}
