import React from "react";
import "./User.css";
type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
};

const User = React.forwardRef(({ user }: { user: User }, ref: any) => {
  const { first_name, last_name, avatar } = user;

  const userBody = (
    <div className="user">
      <img src={avatar} alt={first_name} />
      <h3>
        {first_name} {last_name}
      </h3>
    </div>
  );

  const userInfo = ref ? <div ref={ref}>{userBody}</div> : userBody;
  return userInfo;
});

export default User;
