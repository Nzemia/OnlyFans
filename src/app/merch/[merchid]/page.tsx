import BaseLayout from "@/components/BaseLayout"
import UnderlinedText from "@/components/decorators/UnderlinedText"
import ProductCard from "@/components/ProductCard"
import ProductCheckOut from "./ProductCheckOut"
import prisma from "@/db/prisma"
import { notFound } from "next/navigation"

//remember, the type params should MATCH with the folder name in []
const Page = async ({ params }: { params: { merchid: string } }) => {
    const currentProduct = await prisma.product.findUnique({
        where: {
            id: params.merchid
        }
    })

    const products = await prisma.product.findMany({
        where: {
            isArchived: false,
            id: { not: params.merchid }
        }
    })

    if (!currentProduct || currentProduct.isArchived) {
        return notFound()
    }

    return (
        <BaseLayout renderRightPanel={false}>
            <div className="px-3 md:px-7 my-20">
                <ProductCheckOut product={currentProduct} />

                <h1 className="text-3xl text-center mt-20 mb-10 font-bold tracking-tight">
                    More recommended products from{" "}
                    <UnderlinedText className="decoration-wavy underline-offset-8">
                        OnlyCats
                    </UnderlinedText>
                </h1>

                <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
                    {products.map(product => (
                        <ProductCard product={product} key={product.id} />
                    ))}
                </div>
            </div>
        </BaseLayout>
    )
}

export default Page
