import { FC } from "react";

import Private from "../../layouts/types/Private";
import { withLayout } from "../../layouts/withLayout";

const Profile: FC = () => {
  return <div>Profile</div>;
};

export default withLayout(Profile, Private);
