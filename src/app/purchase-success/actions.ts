"use server"

import prisma from "@/db/prisma"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export async function CheckProductPaidStatus(orderId: string) {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user) throw new Error("Unauthorized! You must be logged in!")

    const order = await prisma.order.findUnique({
        where: { id: orderId },
        select: {
            product: true,
            isPaid: true,
            size: true,
            shippingAddress: true
        }
    })

    if (!order) return false

    return order
}
