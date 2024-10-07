import { getLoggedInUser } from "@server/appwrite";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getLoggedInUser();

  if (!user) {
    redirect("/login");
  }

  return <div className=""></div>;
}
