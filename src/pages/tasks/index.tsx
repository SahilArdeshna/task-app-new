import {
  FC,
  useMemo,
  useState,
  useEffect,
  ChangeEvent,
  useCallback,
} from "react";

import AllTasks from "./tabs/AllTasks";
import { ITask } from "../../types/ITask";
import ProgressTasks from "./tabs/ProgressTasks";
import Private from "../../layouts/types/Private";
import CompletedTasks from "./tabs/CompletedTasks";
import * as taskService from "../../services/task";
import Input from "../../components/ui/input/Input";
import { withLayout } from "../../layouts/withLayout";
import Button from "../../components/ui/button/Button";
import TabBar from "../../components/ui/tabbar/TabBar";
import { useLocation, useNavigate } from "react-router";
import Container from "../../components/ui/container/Container";
import DeleteModal from "../../components/page/delete-modal/DeleteModal";
import {
  ALL,
  COMPLETED,
  IN_PROGRESS,
  ROUTE_TASKS,
} from "../../utils/constants";

const Tasks: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [tasks, setTasks] = useState<ITask[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<{
    id?: string;
    name: string;
    open: boolean;
  }>({ name: "", open: false, id: undefined });

  const queryParams = new URLSearchParams(location.search);
  const task_type = queryParams.get("type");

  const tabs = [
    { id: ALL, title: "All" },
    { id: IN_PROGRESS, title: "In Progress" },
    { id: COMPLETED, title: "Completed" },
  ];

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const tabChangeHandler = (tab: string) => {
    navigate(`${ROUTE_TASKS}?type=${tab}`);
  };

  const closeDeleteModal = () => {
    setDeleteModal((prevState) => {
      return {
        ...prevState,
        open: false,
      };
    });
  };

  const addClickHandler = async () => {
    try {
      if (!inputValue) return;
      setIsAdding(true);

      await taskService.addTask(inputValue);
      setInputValue("");
      await getTasks();
    } catch (err) {
      console.log(err);
    } finally {
      setIsAdding(false);
    }
  };

  const updateDeleteModalState = useCallback((task: ITask) => {
    setDeleteModal({ id: task._id, open: true, name: task.description });
  }, []);

  const getTasks = useCallback(async () => {
    try {
      setIsLoading(true);

      let completed: undefined | string = undefined;
      if (activeTab === IN_PROGRESS) {
        completed = "false";
      } else if (activeTab === COMPLETED) {
        completed = "true";
      }

      const tasks = await taskService.getTasks(0, 0, completed);
      setTasks(tasks);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [activeTab]);

  const deleteClickHandler = useCallback(async () => {
    try {
      const id = deleteModal.id;
      if (!id) return;
      setIsDeleting(true);

      await taskService.deleteTask(id);
      await getTasks();
      closeDeleteModal();
    } catch (err) {
      console.log(err);
    } finally {
      setIsDeleting(false);
    }
  }, [deleteModal.id, getTasks]);

  const checkboxChangeHandler = useCallback(
    async (e: ChangeEvent<HTMLInputElement>, task: ITask) => {
      try {
        const payload: ITask = {
          ...task,
          completed: e.target.checked,
        };

        await taskService.updateTask(payload);
        await getTasks();
      } catch (err) {
        console.log(err);
      }
    },
    [getTasks]
  );

  const tabComponent = useMemo(() => {
    switch (activeTab) {
      case IN_PROGRESS:
        return (
          <ProgressTasks
            tasks={tasks}
            isLoading={isLoading}
            checkboxChangeHandler={checkboxChangeHandler}
            updateDeleteModalState={updateDeleteModalState}
          />
        );
      case COMPLETED:
        return (
          <CompletedTasks
            tasks={tasks}
            isLoading={isLoading}
            checkboxChangeHandler={checkboxChangeHandler}
            updateDeleteModalState={updateDeleteModalState}
          />
        );
      default:
        return (
          <AllTasks
            tasks={tasks}
            isLoading={isLoading}
            checkboxChangeHandler={checkboxChangeHandler}
            updateDeleteModalState={updateDeleteModalState}
          />
        );
    }
  }, [
    tasks,
    activeTab,
    isLoading,
    checkboxChangeHandler,
    updateDeleteModalState,
  ]);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  useEffect(() => {
    if (!task_type) return;
    const currTab = ![ALL, IN_PROGRESS, COMPLETED].includes(task_type)
      ? ALL
      : task_type;

    setActiveTab(currTab);
  }, [task_type]);

  return (
    <div className="pt-5">
      <Container>
        <div className="pt-8 space-y-6">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <Input
                type="text"
                value={inputValue}
                placeholder="Task"
                onChange={inputChangeHandler}
              />
            </div>
            <Button
              onClick={addClickHandler}
              disabled={isAdding || !inputValue}
            >
              Add
            </Button>
          </div>
          <TabBar
            tabs={tabs}
            defaultTab={activeTab}
            tabChangeHandler={tabChangeHandler}
          />

          <div>{tabComponent}</div>
        </div>

        <DeleteModal
          title="Delete Task"
          modal={deleteModal}
          isLoading={isDeleting}
          onClose={closeDeleteModal}
          deleteClickHandler={deleteClickHandler}
          description={
            <div className="space-y-5">
              <p>Are you sure want to delete task ({deleteModal.name})?</p>
            </div>
          }
        />
      </Container>
    </div>
  );
};

export default withLayout(Tasks, Private);
