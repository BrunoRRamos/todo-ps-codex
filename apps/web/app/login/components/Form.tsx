"use client";

import { Label, Input, Button } from "ui";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import NextLink from "next/link";

const loginValidationSchema = z.object({
  email: z.string().min(1, { message: "Por favor, insira seu e-mail" }).email({ message: "E-mail inválido" }),
  password: z.string().min(1, { message: "Por favor, insira sua senha" }),
});

type LoginValidationSchema = z.infer<typeof loginValidationSchema>;

export function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValidationSchema>({ resolver: zodResolver(loginValidationSchema) });

  const onSubmit: SubmitHandler<LoginValidationSchema> = (data, e) => {
    e?.preventDefault();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center gap-8">
      <Label
        htmlFor="email-input"
        variant={errors.email ? "error" : "default"}
        errorMessage={errors.email?.message}
      >
        <p className="font-normal mb-2">E-mail</p>
        <Input id="email-input" placeholder="e-mail" {...register("email")} />
      </Label>
      <Label
        htmlFor="password-input"
        variant={errors.password ? "error" : "default"}
        errorMessage={errors.password?.message}
      >
        <p className="font-normal mb-2">Senha</p>
        <Input id="password-input" type="password" placeholder="senha" {...register("password")} />
      </Label>
      <div className="flex gap-5">
        <NextLink href="/signup">
          <Button variant="outline" type="button">
            Criar conta
          </Button>
        </NextLink>
        <Button type="submit">Entrar</Button>
      </div>
    </form>
  );
}
