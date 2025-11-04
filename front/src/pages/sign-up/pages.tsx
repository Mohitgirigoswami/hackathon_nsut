import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SignUpForm } from "./form"
import AuthNavbar from "@/components/layout/sign-in-navbar"
import { Link } from "react-router"

export default function SignUp() {

  return (
    <>
      <div className="flex flex-col min-w-6xl mx-auto">
        <AuthNavbar />
        <Card className="w-full max-w-sm mx-auto">
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Enter your details to create an account
            </CardDescription>
            <CardAction>
              <Link to="/sign-in">
                <Button variant="link">Sign In</Button>
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
