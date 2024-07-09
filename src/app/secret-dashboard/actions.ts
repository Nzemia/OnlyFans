"use server"

import prisma from "@/db/prisma"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

//function to check if the user is admin, and calling it instead  of creating in each action
async function CheckIfUserIsAdmin() {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    const isAdmin = user?.email === process.env.ADMIN_EMAIL

    if (!user || !isAdmin) return false

    return user
}

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
    const admin = await CheckIfUserIsAdmin()

    if (!admin) {
        throw new Error("Unauthorized!")
    }

    const newPost = await prisma.post.create({
        data: {
            text,
            mediaUrl,
            mediaType,
            isPublic,
            userId: admin.id
        }
    })

    return { succes: true, post: newPost }
}

export async function GetAllProductsAction() {
    const isAdmin = await CheckIfUserIsAdmin()

    if (!isAdmin) {
        throw new Error("Only admin users can add new products!")
    }

    const products = await prisma.product.findMany()

    return products
}

type ProductArgs = {
    name: string
    image: string
    price: string
}
export async function AddNewProductToStoreAction({
    name,
    image,
    price
}: ProductArgs) {
    const isAdmin = await CheckIfUserIsAdmin()

    if (!isAdmin) {
        throw new Error("Only admin users can add new products!")
    }

    if (!name || !image || !price) {
        throw new Error("All fields are required!")
    }

    const priceInCents = Math.round(parseFloat(price) * 100)

    if (isNaN(priceInCents)) {
        throw new Error("Price must be a valid number!")
    }

    const newProduct = await prisma.product.create({
        data: {
            name,
            image,
            price: priceInCents
        }
    })

    return { success: true, product: newProduct }
}

export async function ToggleProductArchiveAction(productId: string) {
    const isAdmin = await CheckIfUserIsAdmin()

    if (!isAdmin) {
        throw new Error("Unauthorized!")
    }

    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    })

    if (!product) {
        throw new Error("Product not found!")
    }

    const updatedProduct = await prisma.product.update({
        where: {
            id: productId
        },
        data: {
            isArchived: !product.isArchived
        }
    })

    return { success: true, product: updatedProduct }
}
