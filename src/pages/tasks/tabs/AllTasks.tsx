import { ChangeEvent, FC, useMemo } from "react";

import { ITask } from "../../../types/ITask";
import Icon from "../../../components/ui/icon/Icon";
import Table from "../../../components/ui/table/Table";
import { LOADING_TASKS } from "../../../utils/constants";
import Loader from "../../../components/ui/loader/Loader";
import Checkbox from "../../../components/ui/checkbox/Checkbox";
import { ReactComponent as TrashIcon } from "../../../icons/trash.svg";

type AllTasksProps = {
  tasks: ITask[];
  isLoading: boolean;
  updateDeleteModalState: (task: ITask) => void;
  checkboxChangeHandler: (
    e: ChangeEvent<HTMLInputElement>,
    task: ITask
  ) => void;
};

const AllTasks: FC<AllTasksProps> = ({
  tasks,
  isLoading,
  checkboxChangeHandler,
  updateDeleteModalState,
}) => {
  const columns = useMemo(
    () => [
      {
        width: "6%",
        title: "",
        accessor: "_id",
        disableSortBy: true,
        Cell: ({ row: { original: task } }: { row: { original: ITask } }) => {
          return (
            <Checkbox
              id="task-checkbox"
              checked={task.completed}
              onChange={(e) => checkboxChangeHandler(e, task)}
            />
          );
        },
      },
      {
        width: "87%",
        title: "Task",
        disableSortBy: false,
        accessor: "description",
      },
      {
        title: "Delete",
        width: "7%",
        accessor: "date_updated",
        Cell: ({ row: { original: task } }: { row: { original: ITask } }) => {
          return (
            <Icon removeClass="text-gray-400" appendClass="text-red-500">
              <TrashIcon onClick={() => updateDeleteModalState(task)} />
            </Icon>
          );
        },
        disableSortBy: true,
      },
    ],
    [updateDeleteModalState, checkboxChangeHandler]
  );

  return isLoading ? (
    <Loader message={LOADING_TASKS} />
  ) : (
    <div className="mt-8">
      <Table columns={columns} records={tasks || []} />
    </div>
  );
};

export default AllTasks;
