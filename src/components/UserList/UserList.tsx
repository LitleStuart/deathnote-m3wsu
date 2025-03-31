"use client";

import React from "react";
import { deleteUser, getUsers } from "@/db";

type User = {
  nickname: string;
  description: string;
};

export default function UserList() {
  const [search, setSearch] = React.useState("");
  const [users, setUsers] = React.useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  React.useEffect(() => {
    setFilteredUsers(
      users.filter((user) => user.nickname.toLowerCase().includes(search))
    );
  }, [search, users]);

  return (
    <>
      <input
        type="search"
        name="search"
        id="search-input"
        placeholder="Enter a nickname to search"
        value={search}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
        style={{ width: "100%" }}
      />
      {filteredUsers.length ? (
        UserTable(filteredUsers)
      ) : (
        <p>Player not found. Unluck :(</p>
      )}
    </>
  );
}

function UserTable(users: User[]) {
  return (
    <table style={{ tableLayout: "auto" }}>
      <thead>
        <tr>
          <th>Nickname</th>
          <th>Description</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{users.map(UserEntry)}</tbody>
    </table>
  );
}

const handleDelete = (nickname: string) => {
  const confirm = window.confirm(`Do you want to delete user ${nickname}?`);
  if (confirm)
    deleteUser(nickname).then((res) => {
      if (Object.hasOwn(res, "error")) {
        alert("Error while deleting the user. Check console for more info.");
        console.log(res);
        return;
      }
      window.location.reload();
    });
};
function UserEntry({ nickname, description }: User) {
  return (
    <tr key={nickname}>
      <td>{nickname}</td>
      <td>{description}</td>
      <td
        onClick={() => {
          handleDelete(nickname);
        }}
        style={{ textAlign: "center", cursor: "pointer" }}
      >
        x
      </td>
    </tr>
  );
}
