import { Session } from "next-auth";
import React from "react";
import LoginWithFaceitButton from "../LoginWithFaceitButton/LoginWithFaceitButton";

const UserInfo = ({ session }: { session: Session | null }) => {
  return session ? (
    <p>
      Signed as <b>{session.user?.name}</b>
    </p>
  ) : (
    <LoginWithFaceitButton />
  );
};

export default UserInfo;
