import React from "react";
import { useState } from "react";
import { acceptInvite, rejectAlbum } from "../ApiClient";
import InviteItem from "./InviteItem";

function Invites(props) {
  const { currentUser, sharedAlbums, setSharedAlbums, setPendingInvites, setInvitePopup } = props;
  const [invites, setInvites] = useState(currentUser.pendingInvite);

  const close = () => {
    setInvitePopup(false);
  };

  let individualInvites = invites.map((invite) => (
    <InviteItem
      key={invite._id}
      invite={invite}
      setInvites={setInvites}
      invites={invites}
      sharedAlbums={sharedAlbums}
      setSharedAlbums={setSharedAlbums}
      setPendingInvites={setPendingInvites}
    />
  ));

  return (
    <div className="invite-popup">
      <div onClick={close} className="top-right">
        X
      </div>
      <h2>You have a pending album invite!</h2>
      {individualInvites}
    </div>
  );
}

export default Invites;
