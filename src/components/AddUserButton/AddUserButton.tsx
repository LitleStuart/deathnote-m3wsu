"use client";
import { addUser } from "@/db";
import React from "react";

function AddUserButton() {
  const dialog = React.useRef<HTMLDialogElement>(null);
  const [nickname, setNickname] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleConfirmButton = () => {
    if (!nickname || !description) {
      alert("You have to enter nickname and description.");
      return;
    }
    addUser(nickname, description).then((res) => {
      if (Object.hasOwn(res, "error")) {
        alert(
          "Error! Can't add user. Maybe already exists. Check console if you want."
        );
        console.log(res);
        handleCancelButton();
        return;
      }
      window.location.reload();
    });
  };
  const handleCancelButton = () => {
    setNickname("");
    setDescription("");
    dialog.current?.close();
  };

  return (
    <>
      <button type="button" onClick={() => dialog.current?.showModal()}>
        Add user
      </button>
      <dialog ref={dialog}>
        <div>
          <input
            type="text"
            name="nickname"
            id="nickname-input"
            placeholder="Enter a nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <textarea
            name="description"
            id="description-input"
            placeholder="Enter a description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button onClick={handleCancelButton}>Cancel</button>
          <button onClick={handleConfirmButton}>Confirm</button>
        </div>
      </dialog>
    </>
  );
}

export default AddUserButton;
