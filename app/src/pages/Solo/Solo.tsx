import "./Solo.css";
import { useEffect, useState } from "react";
import { useStopwatch } from "react-timer-hook";
import { v4 as uuidv4 } from "uuid";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

function Solo(): JSX.Element {
  const [tasks, setTasks] = useState<any[]>([]);
  let [completedTasksLength, setCompletedTasksLength] = useState(0);
  const [taskData, setTaskData] = useState("");

  const { seconds, minutes, hours, start, pause, reset } = useStopwatch({
    autoStart: true,
  });

  useEffect(() => {
    const tasksFromLocalStorage: any = localStorage.getItem("tasks");
    if (tasksFromLocalStorage) {
      const tasksParsed = JSON.parse(tasksFromLocalStorage);
      setTasks(tasksParsed);

      // calculate the number of completed tasks
      const completedTasksCount = tasksParsed.filter(
        (task: any) => task.status === "completed"
      ).length;

      // set the number of completed tasks
      setCompletedTasksLength(completedTasksCount);
    }

  }, []);

  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  function addTask() {
    if (taskData === "") return;
    const newTaskData = {
      id: uuidv4(),
      task: taskData,
      status: "open",
    };
    const newTasks = [...tasks, newTaskData];
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setTaskData("");
  }

  function changeStatus(checked: boolean, id: string) {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, status: checked ? "completed" : "open" }
        : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    const completedTasksCount = updatedTasks.filter(
      (task) => task.status === "completed"
    ).length;

    setCompletedTasksLength(completedTasksCount);
  }

  function deleteTask(taskId: string) {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredTasks);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  }

  return (
    <div className="Solo">
      <div className="SoloInfos">
        <div className="SoloInfo">
          <div className="SoloInfoTimer">
            <span>{formattedTime}</span>
            <div className="SoloInfoTimerButtons">
              <div onClick={start} className="SoloInfoTimerButtonsDiv">
                <PlayArrowIcon fontSize="large" />
              </div>
              <div onClick={pause} className="SoloInfoTimerButtonsDiv">
                <StopIcon fontSize="large" />
              </div>
              <div onClick={() => reset()} className="SoloInfoTimerButtonsDiv">
                <RestartAltIcon fontSize="large" />
              </div>
            </div>
          </div>
        </div>

        <div className="SoloTasks">
          <div className="SoloTasksHeader">
            <span>Session goals</span>
            <div className="SoloTasksForm">
              <input
                type="text"
                placeholder="Task"
                value={taskData}
                onChange={(e) => setTaskData(e.target.value)}
              />
              <div onClick={addTask} className="AddTaskButton">
                <AddIcon fontSize="large" />
              </div>
            </div>
          </div>
          <div className="SoloTasksBoard">
            <div className="SoloTasksCount">
              <p>
                {tasks.length - completedTasksLength <= 0
                  ? 0
                  : tasks.length - completedTasksLength}
              </p>
              <span>Open</span>
            </div>
            <div className="SoloTasksCount">
              <p>{completedTasksLength}</p>
              <span>Completed</span>
            </div>
          </div>
          <div className="TasksDisplay">
            {tasks ? (
              tasks.map((task: any) => (
                <div className="Task" key={task.id}>
                  <input
                    type="checkbox"
                    checked={task.status === "completed"}
                    id={task.id}
                    onChange={(e) =>
                      changeStatus(e.target.checked, e.target.id)
                    }
                  />
                  <p>{task.task}</p>
                  <div
                    className="DeleteTask"
                    id={task.id}
                    onClick={(e) => deleteTask(e.currentTarget.id)}
                  >
                    {task.status === "completed" ? <></> : <DeleteIcon />}
                  </div>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Solo;
