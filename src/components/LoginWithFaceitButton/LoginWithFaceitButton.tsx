import { signIn } from "@/auth";

export default function LoginWithFaceitButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("faceit");
      }}
    >
      <button type="submit">Login with FACEIT</button>
    </form>
  );
}
