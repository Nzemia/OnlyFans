import UnderlinedText from "@/components/decorators/UnderlinedText";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


interface FeatureProps {
	title: string;
	description: string;
	image: string;
}

const features: FeatureProps[] = [
	{
		title: "Expert Cat Care Tips",
		description:
			"Learn the best practices for keeping your cats healthy and happy. From nutrition advice to grooming.",
		image: "/gifs/gif1.gif",
	},
	{
		title: "Training Techniques",
		description:
			"Whether you're training your cat to use a litter box, do tricks, or just behave better, find techniques in seconds.",
		image: "/gifs/gif2.gif",
	},
	{
		title: "Daily Home Life",
		description: "See how we care for our cats, manage our home, and enjoy the company of our feline friends.",
		image: "/gifs/gif3.gif",
	},
];

const featureList: string[] = [
	"Cat Health Insights",
	"Daily Tips",
	"Behind-the-Scenes Access",
	"Training Tutorials",
	"Training Techniques",
	"Cat Care Advice",
];


const Features = () => {
    return (
        <section className="container py-24 sm:py-32 space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
                Many <UnderlinedText className="underline-offset-8">OnlyCats</UnderlinedText> Features 🐈
            </h2>

            <div className="flex flex-wrap md:justify-center gap-4">
                {featureList.map(feature => (
                    <div key={feature} className="">
                        <Badge className="text-sm rounded-full" variant={"secondary"}>
                            {feature}
                        </Badge>
                    </div>
                ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map(({ title, description, image }) => (
                    <Card key={title} className="flex flex-col">
                        <CardHeader>
                            <CardTitle>
                                {title}
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            {description}
                        </CardContent>

                        <CardFooter className="mt-auto">
                            <img 
                                src={image} 
                                alt="Featured Item" 
                                className="rounded w-[250px] lg:w-[300px] mx-auto select-none pointer-events-none"
                            />
                        </CardFooter>
                    </Card>
                ))}
            </div>

        </section>
    )
}

export default Features