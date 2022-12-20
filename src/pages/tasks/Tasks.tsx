import { FC } from "react";

import Private from "../../layouts/types/Private";
import { withLayout } from "../../layouts/withLayout";

const Tasks: FC = () => {
  return <div>Tasks</div>;
};

export default withLayout(Tasks, Private);
