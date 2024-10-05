"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const LoginForm = () => {
  const { toast } = useToast();

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof registerSchema>) {
    toast({
      title: "Success",
      description: `Welcome back ${data.email} , you&apos;re successfully logged in!`,
    });
  }

  return (
    <Card className=" w-[480px] max-w-full">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Login to your account to start using Tasker
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...registerForm}>
          <form
            onSubmit={registerForm.handleSubmit(onSubmit)}
            className="space-y-2"
          >
            <FormField
              control={registerForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl></FormControl>
                  <FormMessage />
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormItem>
              )}
            />
            <Link
              href="/forgot-password"
              className="text-primary w-full block text-right"
            >
              Forgot Password?
            </Link>
            <Button type="submit" className="w-full mt-5">
              Log In
            </Button>
          </form>
          <div className="w-full text-center mt-5 text-sm">
            Don&apos;t have account?{" "}
            <Link href="/register" className=" text-primary">
              Register
            </Link>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
