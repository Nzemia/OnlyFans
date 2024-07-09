"use server"

import prisma from "@/db/prisma"
import { centsToDollars } from "@/lib/utils"
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

export async function GetDashboardData() {
    const totalRevenuePromise = Promise.all([
        prisma.order.aggregate({
            _sum: {
                price: true
            }
        }),
        prisma.subscription.aggregate({
            _sum: {
                price: true
            }
        })
    ])

    const totalSalesPromise = prisma.order.count()
    const totalSubscriptionsPromise = prisma.subscription.count()

    const recentSalesPromise = prisma.order.findMany({
        take: 4,
        orderBy: {
            orderDate: "desc"
        },
        select: {
            user: {
                select: {
                    name: true,
                    email: true,
                    image: true
                }
            },
            price: true,
            orderDate: true
        }
    })

    const recentSubscriptionsPromise = prisma.subscription.findMany({
        take: 4,
        orderBy: {
            startDate: "desc"
        },
        select: {
            user: {
                select: {
                    name: true,
                    email: true,
                    image: true
                }
            },
            price: true,
            startDate: true
        }
    })

    // run all promises in parallel so that they don't block each other
    const [
        totalRevenueResult,
        totalSales,
        totalSubscriptions,
        recentSales,
        recentSubscriptions
    ] = await Promise.all([
        totalRevenuePromise,
        totalSalesPromise,
        totalSubscriptionsPromise,
        recentSalesPromise,
        recentSubscriptionsPromise
    ])

    const totalRevenue =
        (totalRevenueResult[0]._sum.price || 0) +
        (totalRevenueResult[1]._sum.price || 0)

    return {
        totalRevenue: centsToDollars(totalRevenue),
        totalSales,
        totalSubscriptions,
        recentSales,
        recentSubscriptions
    }
}
