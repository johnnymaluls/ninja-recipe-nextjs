import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { data } from "@/_data/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Recipe {
  title: string;
  image: string;
  time: number;
  description: string;
  vegan: boolean;
  id: string;
}

const getRecipes = async (): Promise<Recipe[]> => {
  const result = await data.recipes;

  //delay response
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return result;
};

export default async function Home() {
  const recipes = await getRecipes();

  return (
    <main className="">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="flex flex-col justify-between">
            <CardHeader className="flex-row gap-4 items-center">
              <Avatar>
                <AvatarImage src={`/img/${recipe.image}`} alt="recipe-image" />
                <AvatarFallback>{recipe.title.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{recipe.title}</CardTitle>
                <CardDescription>{recipe.time} mins to cook.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>{recipe.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Button>View Recipe</Button>
              {recipe.vegan && <Badge variant="outline">Vegan</Badge>}
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
