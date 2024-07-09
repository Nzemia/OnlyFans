import RotatedText from "@/components/decorators/RotatedText";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface TeamProps {
	imageUrl: string;
	name: string;
	position: string;
	description: string;
}


const teamList: TeamProps[] = [
	{
		imageUrl: "/vivian.jpg",
		name: "Vivian Nyambura",
		position: "Cat Care Manager",
		description: "Vivian ensures the smooth operation of our home and ensures the well-being of all our cats.",
	},
	{
		imageUrl: "/seba.jpg",
		name: "Kunani Sebastian",
		position: "Head Trainer",
		description: "Seba is our expert in cat training and behavior with over 15 years of experience.",
	},
	{
		imageUrl: "/wanji.jpg",
		name: "Dr. Caren Wanjiru",
		position: "Feline Veterinarian",
		description: "Dr. Wanji is our resident veterinarian, dedicated to maintaining the health of our cats.",
	},
	{
		imageUrl: "frank.jpg",
		name: "Frank Nzemia",
		position: "Groom and Caretaker",
		description: "Nzemia is responsible for the daily care of our cats, including feeding and grooming.",
	},
];


const Team = () => {
    return (
        <section className="container py-24 sm:py-32 ">
            <h2 className='text-2xl sm:text-3xl md:text-5xl text-center tracking-tighter font-bold'>
				Our <RotatedText>Dedicated</RotatedText> Crew
			</h2>

			<p className='mt-4 mb-10 text-md md:text-xl text-muted-foreground text-center'>
				Meet the team that makes our home a special place for cats and their owners alike.
			</p>

			<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-10'>
				{teamList.map(({ description, imageUrl, name, position }) => (
					<Card key={name} className='bg-muted/50 relative mt-7 flex flex-col justify-center items-center'>
						<CardHeader className='my-8 flex justify-center items-center pb-2'>
							<img
								src={imageUrl}
								alt='Team member'
								className='absolute -top-12 rounded-full w-24 h-24 aspect-square object-cover'
							/>
							<CardTitle className='text-center'>{name}</CardTitle>
							<CardDescription className='text-primary'>{position}</CardDescription>
						</CardHeader>

						<CardContent className='text-center pb-4 px-2'>
							<p>{description}</p>
						</CardContent>
					</Card>
				))}
			</div>
        </section>
    )
}

export default Team