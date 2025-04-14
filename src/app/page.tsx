import { auth } from "@/auth";
import UserInfo from "@/components/UserInfo/UserInfo";
import UserList from "@/components/UserList/UserList";

export default async function Home() {
  const session = await auth();
  return (
    <>
      <h1>Deathnote</h1>
      <UserInfo session={session} />
      <UserList isAdmin={session?.user?.name === process.env.ADMIN_NICKNAME} />
    </>
  );
}
