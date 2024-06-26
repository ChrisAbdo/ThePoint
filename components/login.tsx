import { GithubLoginButton, GoogleLoginButton } from "./auth/login-buttons";

export default function Login() {
  return (
    <div className="mt-12 gap-12 space-y-4">
      <GithubLoginButton />
      <GoogleLoginButton />
    </div>
  );
}
