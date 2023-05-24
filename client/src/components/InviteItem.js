import React from "react";
import { acceptInvite, rejectAlbum } from "../ApiClient";

function InviteItem(props) {
  const { invite, setInvites, invites, sharedAlbums, setSharedAlbums, setPendingInvites } = props;

  const accept = async () => {
    let newShare = await acceptInvite({ albumId: invite._id });
    setSharedAlbums([newShare, ...sharedAlbums]);
    let remainingInvites = invites.filter((element) => element._id !== invite._id);
    setInvites(remainingInvites);
    setPendingInvites(remainingInvites);
  };

  const reject = async () => {
    await rejectAlbum(invite);
    let remainingInvites = invites.filter((element) => element._id !== invite._id);
    setInvites(remainingInvites);
  };

  return (
    <div className="invite-item">
      <p>{invite.albumName}</p>
      <div className="accept">
        <img onClick={accept} alt="accept" src="../accept.png"></img>
        <img src="../reject.png" alt="reject" onClick={reject}></img>
      </div>
    </div>
  );
}

export default InviteItem;