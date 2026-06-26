'use client'
import { Suspense, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { HiEye, HiEyeOff } from "react-icons/hi";
import Link from "next/link";

// ১. চাইল্ড কম্পোনেন্ট (সব লজিক ও useSearchParams এটার ভেতরে থাকবে)
const SignInForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  
  const router = useRouter();
  const searchParams = useSearchParams(); 
  const redirectTo = searchParams.get("redirect") || "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    if (data) {
      toast.success('Sign In is successfully done');
      router.push(redirectTo);
    }
    if (error) {
      toast.error('Invalid email or password');
    }
  };
   
  const handleGoogleSignin=async()=>{
    await authClient.signIn.social({
      provider:'google'
    })
  }

  return (
    <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
      <div className="text-center space-y-2 mb-2">
        <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
          Welcome Back
        </h2>
        <p className="text-sm text-slate-500 dark:text-zinc-400">
          Please <b className="text-indigo-500">sign in</b> to your account
        </p>
      </div>

      <TextField
        isRequired
        name="email"
        type="email"
        className="w-full"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }
          return undefined;
        }}
      >
        <Label className="text-sm font-semibold text-slate-700 dark:text-zinc-300 mb-1">Email</Label>
        <Input size="lg" radius="md" placeholder="Enter your email" className="w-full" />
        <FieldError className="text-xs text-danger mt-1" />
      </TextField>

      <TextField
        isRequired
        name="password"
        type={isVisible ? "text" : "password"}
        className="w-full"
      >
        <div className="flex justify-between items-center mb-1">
          <Label className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Password</Label>
          <Link href="#" className="text-xs font-medium text-indigo-500 hover:underline">
            Forgot password?
          </Link>
        </div>
        <div className="relative flex items-center">
          <Input 
            size="lg" 
            radius="md" 
            placeholder="Enter your password" 
            className="w-full pr-12" 
          />
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute right-3 p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300 focus:outline-none transition-colors"
            aria-label="toggle password visibility"
          >
            {isVisible ? <HiEyeOff size={22} /> : <HiEye size={22} />}
          </button>
        </div>
        <FieldError className="text-xs text-danger mt-1" />
      </TextField>

      <div className="flex gap-3 mt-2">
        <Button 
          type="submit" 
          size="lg"
          radius="md"
          className="flex-1 font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white shadow-md shadow-indigo-200 dark:shadow-none hover:opacity-95 active:scale-[0.98] transition-all"
        >
          <Check className="w-4 h-4 mr-1" />
          Sign In
        </Button>
        <Button 
          type="reset" 
          variant="flat" 
          size="lg"
          radius="md"
          className="font-medium text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800"
        >
          Reset
        </Button>
      </div>

      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-slate-200 dark:border-zinc-800"></div>
        <span className="flex-shrink mx-4 text-xs font-bold uppercase tracking-wider text-slate-400">OR</span>
        <div className="flex-grow border-t border-slate-200 dark:border-zinc-800"></div>
      </div>

      <Button onClick={handleGoogleSignin}
        variant="bordered" 
        size="lg"
        radius="md"
        className="w-full font-medium border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-800 active:scale-[0.98] transition-all gap-2"
      >
        <FcGoogle size={22} />
        Sign In with Google
      </Button>

      <p className="text-center text-sm text-slate-500 dark:text-zinc-400 mt-2">
        Don&apos;t have an account?{" "}
        <Link href={`/signup?redirect=${redirectTo}`} className="font-semibold text-indigo-500 hover:underline">
          Sign up here
        </Link>
      </p>
    </Form>
  );
};

// ২. মেইন ডিফল্ট এক্সপোর্ট পেজ (যা SignInForm কে Suspense দিয়ে র‍্যাপ করে এক্সপোর্ট করবে)
export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50/50 px-4 py-12 dark:from-zinc-950 dark:to-zinc-900">
      <div className="w-full max-w-md border border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 backdrop-blur-xl px-6 py-8 shadow-[0_20px_50px_rgba(99,102,241,0.08)] rounded-2xl transition-all duration-300">
        <Suspense fallback={<div className="text-center py-4 font-semibold">Loading Form...</div>}>
          <SignInForm />
        </Suspense>
      </div>
    </div>
  );
}