import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SignInForm } from "./form"
import AuthNavbar from "@/components/layout/sign-in-navbar"
import { Link } from "react-router"

export default function SignIn() {

  return (
    <>
      <div className="flex flex-col min-w-6xl mx-auto">
        <AuthNavbar />
        <Card className="w-full max-w-sm mx-auto">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
            <CardAction>
              <Link to="/sign-up">
                <Button variant="link">Sign Up</Button>
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent>
            <SignInForm />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
