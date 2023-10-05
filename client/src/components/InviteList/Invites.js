import React from "react";
import InviteItem from "../InviteItem/InviteItem";
import { useDispatch, useSelector } from "react-redux";
import { toggleInvites } from "../../Store/notificationSlice";
import "./Invites.css";
function Invites(props) {
  const invites = useSelector((state) => state.currentUser.pendingInvite);
  const dispatch = useDispatch();
  const close = () => {
    dispatch(toggleInvites());
  };

  let individualInvites = invites.map((invite) => (
    <InviteItem key={invite._id} invite={invite} />
  ));

  return (
    <div className="invite-popup">
      <div onClick={close} className="top-right">
        X
      </div>
      {invites.length ? (
        <h2>You have {invites.length} pending album invites!</h2>
      ) : (
        <h2>You have no new shared album invites</h2>
      )}
      {individualInvites}
    </div>
  );
}

export default Invites;
