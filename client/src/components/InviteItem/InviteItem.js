import React from "react";
import { acceptInvite, rejectAlbum } from "../../ApiClient";
import { useDispatch, useSelector } from "react-redux";
import { updatePending, addSharedAlbum } from "../../Store/userSlice";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import "./InviteItem.css";

function InviteItem({ invite }) {
  const dispatch = useDispatch();
  const invites = useSelector((state) => state.currentUser.pendingInvite);
  const accept = async () => {
    let newShare = await acceptInvite({ albumId: invite._id });
    dispatch(addSharedAlbum(newShare));
    let remainingInvites = invites.filter(
      (element) => element._id !== invite._id
    );
    dispatch(updatePending(remainingInvites));
  };

  const reject = async () => {
    await rejectAlbum(invite);
    let remainingInvites = invites.filter(
      (element) => element._id !== invite._id
    );
    dispatch(updatePending(remainingInvites));
  };

  return (
    <div className="invite-item">
      <p>{invite.albumName}</p>
      <div className="icons">
        <div className="accept">
          <DoneIcon onClick={accept}></DoneIcon>
        </div>
        <div className="reject">
          <CloseIcon onClick={reject}></CloseIcon>
        </div>
      </div>
    </div>
  );
}

export default InviteItem;
