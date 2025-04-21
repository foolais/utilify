import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Title from "@/components/ui/title";

const FormRegister = ({ onToggleForm }: { onToggleForm: () => void }) => {
  return (
    <Card className="w-[350px]">
      <CardHeader className="text-center">
        <Title size="lg" />
        <CardTitle className="auth-title">Create an Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Username</Label>
              <Input id="name" placeholder="John Doe" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="johndoe@me.com" type="email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" placeholder="********" type="password" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                placeholder="********"
                type="password"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="auth-footer">
        <Button className="w-full">Register</Button>
        <p>
          Already have an account?{" "}
          <Button
            variant="ghost"
            size="sm"
            className="px-1.5"
            onClick={onToggleForm}
          >
            Sign in
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default FormRegister;
