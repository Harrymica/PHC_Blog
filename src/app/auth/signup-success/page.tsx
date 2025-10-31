import Link from "next/link"
import { CheckCircle, Mail } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background/80 px-4">
      <div className="w-full max-w-md">
        {/* Success Card */}
        <div className="bg-card rounded-lg shadow-lg p-8 border border-border text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-500/10 p-4 rounded-full">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-2">Account Created!</h1>
          <p className="text-muted-foreground mb-6">
            We've sent a confirmation email to your inbox. Please verify your email to activate your account.
          </p>

          <div className="bg-background p-4 rounded-lg border border-border mb-6 flex items-center gap-3">
            <Mail className="h-5 w-5 text-red-500 flex-shrink-0" />
            <p className="text-sm text-foreground">Check your email for the verification link</p>
          </div>

          <Link
            href="/auth/login"
            className="block w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Back to Login
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-6">© 2025 EXP NEWS. All rights reserved.</p>
      </div>
    </div>
  )
}
