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

const registerSchema = z
  .object({
    fullName: z.string().min(2).max(20),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

const RegisterForm = () => {
  const { toast } = useToast();

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof registerSchema>) {
    toast({
      title: "Success",
      description: `${data.fullName}, you&apos;re successfully registered`,
    });
  }

  return (
    <Card className=" w-[480px] max-w-full">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>
          Create an account to start using Tasker
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
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={registerForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl></FormControl>
                  <FormMessage />
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full mt-5">
              Register
            </Button>
          </form>
          <div className="w-full text-center mt-5 text-sm">
            Already have account?{" "}
            <Link href="/login" className=" text-primary">
              Log In
            </Link>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
