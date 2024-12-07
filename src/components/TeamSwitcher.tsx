"use client";

import { SelectedTeamSwitcher, useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TeamSwitcher() {
  const user = useUser({ or: "redirect" });
  const userTeams = user.useTeams();
  const [currentTeam, setCurrentTeam] = useState(
    user.selectedTeam ?? userTeams[0],
  );
  const router = useRouter();

  useEffect(() => {
    if (user.selectedTeam && user.selectedTeam?.id !== currentTeam?.id) {
      console.log("Selected team changed:", currentTeam, user.selectedTeam);
      setCurrentTeam(user.selectedTeam);
      router.push("/");
      router.refresh();
    }
  }, [user.selectedTeam]);

  return <SelectedTeamSwitcher selectedTeam={currentTeam} />;
}
