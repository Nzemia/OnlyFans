import BaseLayout from "@/components/BaseLayout"
import UnderlinedText from "@/components/decorators/UnderlinedText"
import ProductCard from "@/components/ProductCard"
import { products } from "@/dummy_data"


const Page = () => {
    return (
        <BaseLayout renderRightPanel={false}>
            <div className="px-3 md:px-10 my-10">
                <h1 className="font-bold tracking-tight text-3xl text-center my-5">
                    Our <UnderlinedText className="decoration-wavy">Products</UnderlinedText>
                </h1>

                <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product}  /> 
                    ))}
                </div>
            </div>
        </BaseLayout>
    )
}

export default Page