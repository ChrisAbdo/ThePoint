"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { signIn } from "next-auth/react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { IconGitHub, IconGoogle, IconSpinner } from "@/components/ui/icons";

interface LoginButtonProps extends ButtonProps {
  showGithubIcon?: boolean;
  text?: string;
}

export function GoogleLoginButton({
  text = "Login with Google",
  showGithubIcon = true,
  ...props
}: LoginButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const pathname = usePathname();
  return (
    <Button
      variant="outline"
      onClick={() => {
        setIsLoading(true);
        signIn("google", { callbackUrl: pathname });
      }}
      disabled={isLoading}
      className="w-full"
      {...props}
    >
      {isLoading ? (
        <IconSpinner className="mr-2 animate-spin" />
      ) : showGithubIcon ? (
        <IconGoogle className="mr-2" />
      ) : null}
      {text}
    </Button>
  );
}
export function GithubLoginButton({
  text = "Login with GitHub",
  showGithubIcon = true,
  ...props
}: LoginButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const pathname = usePathname();
  return (
    <Button
      variant="outline"
      onClick={() => {
        setIsLoading(true);
        signIn("github", { callbackUrl: pathname });
      }}
      disabled={isLoading}
      className="w-full"
      {...props}
    >
      {isLoading ? (
        <IconSpinner className="mr-2 animate-spin" />
      ) : showGithubIcon ? (
        <IconGitHub className="mr-2" />
      ) : null}
      {text}
    </Button>
  );
}
