import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Flag } from "lucide-react";
import CardUtilBtn from "./card-util-btn";

interface iPropsCardUtil {
  id: string;
  name: string;
  description: string;
  category: string;
}

const CardUtil = ({ id, name, description, category }: iPropsCardUtil) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <Badge variant="outline" className="mt-2">
          <Flag />
          <p>{category}</p>
        </Badge>
      </CardHeader>
      <CardFooter className="mt-auto flex justify-end">
        <CardUtilBtn id={id} name={name} description={description} />
      </CardFooter>
    </Card>
  );
};

export default CardUtil;
