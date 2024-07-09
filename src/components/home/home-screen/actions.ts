"use server"

import prisma from "@/db/prisma"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export async function GetPostsAction() {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user) throw new Error("Unauthorized!")

    const posts = await prisma.post.findMany({
        include: {
            comments: {
                include: {
                    user: true
                }
            },
            likesList: {
                where: {
                    userId: user.id
                }
            }
        }
    })

    return posts
}

export async function DeletePostAction(postId: string) {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    const post = await prisma.post.findUnique({ where: { id: postId } })

    if (post?.userId !== user?.id)
        throw new Error("Only admin can delete posts")

    await prisma.post.delete({ where: { id: postId } })

    return { success: true }
}

export async function LikePostAction(postId: string) {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user) throw new Error("Unauthorized!")

    const userProfile = await prisma.user.findUnique({
        where: {
            id: user.id
        }
    })

    if (!userProfile?.isSubscribed) return

    //like post, unlike post
    const post = await prisma.post.findUnique({
        where: {
            id: postId
        },
        select: {
            likes: true,
            likesList: {
                where: {
                    userId: user.id
                }
            }
        }
    })

    if (!post) {
        throw new Error("Post not found!")
    }

    let newLikes: number

    //user who wants to unlike a post
    if (post.likesList.length > 0) {
        newLikes = Math.max(post.likes - 1, 0)
        await prisma.like.deleteMany({
            where: {
                postId,
                userId: user.id
            }
        })
    } else {
        //user who wants to like a post
        newLikes = post.likes + 1
        await prisma.like.create({
            data: {
                postId,
                userId: user.id
            }
        })
    }

    await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            likes: newLikes
        }
    })

    return { success: true }
}

export async function CommentOnPostAction(postId: string, text: string) {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user) throw new Error("Unauthorized!")

    const userProfile = await prisma.user.findUnique({
        where: {
            id: user.id
        }
    })

    if (!userProfile?.isSubscribed) return

    const comment = await prisma.comment.create({
        data: {
            postId,
            userId: user.id,
            text
        }
    })

    return { success: true }
}
