import type { NextPage } from "next";
import TodoLists from "~/components/TodoLists";
import { stackServerApp } from "~/stack";

const Home: NextPage = async () => {
  const user = await stackServerApp.getUser({ or: "redirect" });

  if (!user.selectedTeam) {
    const teams = await user.listTeams();
    if (teams.length > 0) {
      console.log("Setting user current team:", teams[0]);
      user.setSelectedTeam(teams[0]!);
    }
  }

  return (
    <div className="container mx-auto flex justify-center">
      <div className="mt-8 flex w-full flex-col items-center">
        <h1 className="text-center text-2xl">
          Welcome, {user.displayName ?? user.primaryEmail}!
        </h1>
        <TodoLists />
      </div>
    </div>
  );
};

export default Home;
