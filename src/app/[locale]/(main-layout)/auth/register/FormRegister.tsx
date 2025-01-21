"use client";
import {
  handleCancelServerAction,
  handleRegisterServerAction,
} from "@/app/[locale]/(main-layout)/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";

export default function FormRegister() {
  const [state, formAction, isPending] = useActionState(
    handleRegisterServerAction,
    null
  );
  console.log(state);
  return (
    <form action={formAction}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <Input
          type="text"
          className="form-control"
          name="name"
          id="name"
          placeholder="Name..."
        />
        {state?.errors?.name && (
          <div className="text-red-500">{state.errors.name}</div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <Input
          type="text"
          className="form-control"
          name="email"
          id="email"
          placeholder="Email..."
        />
        {state?.errors?.email && (
          <div className="text-red-500">{state.errors.email}</div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <Input
          type="password"
          className="form-control"
          name="password"
          id="password"
          placeholder="Password..."
        />
        {state?.errors?.password && (
          <div className="text-red-500">{state.errors.password}</div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="confirm_password" className="form-label">
          Confirm Password
        </label>
        <Input
          type="password"
          className="form-control"
          name="confirm_password"
          id="confirm_password"
          placeholder="Confirm Password..."
        />
        {state?.errors?.confirm_password && (
          <div className="text-red-500">{state.errors.confirm_password}</div>
        )}
      </div>
      <div className="grid gap-1">
        <Button type="submit" className="btn-primary" disabled={isPending}>
          {isPending ? "Registering..." : "Register"}
        </Button>
        <Button
          type="button"
          className="bg-gray-400"
          onClick={() => handleCancelServerAction("Mai Tuyen")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
