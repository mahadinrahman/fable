'use client'
import { Suspense, useState } from "react"; 
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Radio, RadioGroup, Input, Label, TextField } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { HiEye, HiEyeOff } from "react-icons/hi"; 
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

// ১. ফর্মের যাবতীয় লজিক ও UI এই কম্পোনেন্টের ভেতর থাকবে
const RegisterForm = () => {
  const [isVisible, setIsVisible] = useState(false); 
  const toggleVisibility = () => setIsVisible(!isVisible);

  const router = useRouter();
  const searchParams = useSearchParams(); // এখন এটি নিরাপদে Suspense বাউন্ডারির ভেতরে আছে
  const redirectTo = searchParams.get("redirect") || "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.image,
      role: user.role,
    
    });
    
    if (data) {
      toast.success('Sign Up is successfully done');
      router.push(redirectTo);
    }
    if (error) {
      toast.error('Sign Up Error');
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
          Create an Account
        </h2>
        <p className="text-sm text-slate-500 dark:text-zinc-400">
          Get started with your free account today
        </p>
      </div>

      {/* Name Field */}
      <TextField
        isRequired
        name="name"
        className="w-full"
        validate={(value) => {
          if (value.length < 3) {
            return "Name must be at least 3 characters";
          }
          return undefined; // null এর পরিবর্তে undefined
        }}
      >
        <Label className="text-sm font-semibold text-slate-700 dark:text-zinc-300 mb-1">Name</Label>
        <Input size="lg" radius="md" placeholder="Enter Your Name" className="w-full" />
        <FieldError className="text-xs text-danger mt-1" />
      </TextField>

      {/* Image URL Field */}
      <TextField
        isRequired
        name="image"
        className="w-full"
      >
        <Label className="text-sm font-semibold text-slate-700 dark:text-zinc-300 mb-1">Image URL</Label>
        <Input size="lg" radius="md" placeholder="Enter Your Image Url" className="w-full" />
        <FieldError className="text-xs text-danger mt-1" />
      </TextField>

      {/* Role */}
      <Label className="text-sm font-semibold">Role *</Label>
      <RadioGroup defaultValue="reader" name="role" orientation="horizontal">
        <Radio value="reader">
          <Radio.Control>
            <Radio.Indicator className="border-2 border-slate-300 rounded-full"/>
          </Radio.Control>
          <Radio.Content>
            <Label>Reader</Label>
          </Radio.Content>
        </Radio>
        <Radio value="writer">
          <Radio.Control>
            <Radio.Indicator className="border-2 border-slate-300 rounded-full"/>
          </Radio.Control>
          <Radio.Content>
            <Label>Writer</Label>
          </Radio.Content>
        </Radio>
      </RadioGroup>

      {/* Email Field */}
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
        <Input size="lg" radius="md" placeholder="Enter a email" className="w-full" />
        <FieldError className="text-xs text-danger mt-1" />
      </TextField>

      {/* Password Field */}
      <TextField
        isRequired
        minLength={8}
        name="password"
        type={isVisible ? "text" : "password"} 
        className="w-full"
        validate={(value) => {
          if (value.length < 8) return "Password must be at least 8 characters";
          if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
          if (!/[a-z]/.test(value)) return "Password must contain at least one lowercase letter";
          if (!/[0-9]/.test(value)) return "Password must contain at least one number";
          return undefined;
        }}
      >
        <Label className="text-sm font-semibold text-slate-700 dark:text-zinc-300 mb-1">Password</Label>
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
        <Description className="text-[11px] text-slate-400 dark:text-zinc-500 mt-1 block leading-relaxed">
          Must be at least 8 characters with 1 uppercase, 1 lowercase and 1 number
        </Description>
        <FieldError className="text-xs text-danger mt-1" />
      </TextField>

      {/* Buttons */}
      <div className="flex gap-3 mt-2">
        <Button 
          type="submit" 
          size="lg"
          radius="md"
          className="flex-1 font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white shadow-md shadow-indigo-200 dark:shadow-none hover:opacity-95 active:scale-[0.98] transition-all"
        >
          <Check className="w-4 h-4 mr-1" />
          Sign Up
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
              Sign Up with Google
            </Button>

      <p className="text-center text-sm">Already Have an Account? <Link href={`/signin?redirect=${redirectTo}`}><span className="text-blue-500 font-semibold hover:underline">Sign in Here</span></Link></p>
    </Form>
  );
};

// ২. মূল এক্সপোর্ট করা মেইন পেজ যা ফর্মটিকে Suspense দিয়ে র‍্যাপ করে রাখবে
const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50/50 px-4 py-12 dark:from-zinc-950 dark:to-zinc-900">
      <div className="w-full max-w-md border border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 backdrop-blur-xl px-6 py-8 shadow-[0_20px_50px_rgba(99,102,241,0.08)] rounded-2xl transition-all duration-300">
        <Suspense fallback={<div className="text-center py-4 font-semibold">Loading Form...</div>}>
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  );
};

export default RegisterPage;