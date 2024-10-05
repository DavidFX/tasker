"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  // const registerForm = useForm<z.infer<typeof registerSchema>>({
  //   resolver: zodResolver(registerSchema),
  //   defaultValues: {
  //     fullName: "",
  //     email: "",
  //     password: "",
  //     confirmPassword: "",
  //   },
  // });

  return <div>RegisterForm</div>;
};

export default RegisterForm;
