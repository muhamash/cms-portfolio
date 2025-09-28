import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import LoginForm from '@/src/pages/auth/LoginForm';
import { LucidePanelTopClose } from 'lucide-react';

export const metadata: Metadata = {
  title: "Login | CMS portfolio",
  description: "Login to your cms website and explore insightful blogs, tutorials, and guides on web development and modern technologies.",
  keywords: ["blogs", "web development", "next.js", "seo", "portfolio"],
  twitter: {
    card: "summary_large_image",
    title: "Login | CMS portfolio",
    description: "Login to your cms website and explore explore insightful Blogs and guides on web development",
    images: ["https://example.com/og-image.png"],
    creator: "github.com/muhamash",
  },
  alternates: {
    canonical: "https://example.com/blogs",
  },
};

export default async function LoginPage() {

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center px-4 gap-10 w-full">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <LucidePanelTopClose className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mt-4">CMS portfolio login portal</h1>
          <p className="text-muted-foreground mt-2">Welcome back to your CMS portfolio login portal</p>
        </div>
      </div>

      {/* Login form */}
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>

          {/* login form */}
          <LoginForm/>

        </CardContent>
        <CardFooter className="text-center text-muted-foreground text-sm flex flex-col gap-5">

          <p>© {new Date().getFullYear()} github.com/muhamash. All rights reserved.</p>
        </CardFooter>
      </Card>
    </div>
  );
}