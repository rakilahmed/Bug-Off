import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from '../../firebase/AuthContext';

// const URI = 'https://bugoff.rakilahmed.com/api/tasks';
const URI = 'http://localhost:8080/api/tasks';
const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const { user, getToken } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await axios.get(URI);
      setTasks(res.data.reverse());
    };
    fetchTasks();
  }, []);

  axios.interceptors.request.use(
    async (config) => {
      config.headers.authorization = 'Bearer ' + (await getToken());
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const addTask = async (task) => {
    const res = await axios.post(URI, {
      uid: `${user.uid}`,
      taskId: Math.floor(1000 + Math.random() * 9000),
      status: true,
      task: task,
    });
    setTasks([res.data, ...tasks]);
  };

  const editTask = async (taskId, task) => {
    const res = await axios.put(URI + `/${taskId}`, {
      uid: `${user.uid}`,
      taskId: taskId,
      status: true,
      task: task,
    });
    setTasks(
      tasks.map((task) => {
        return task.taskId === taskId ? { ...res.data } : task;
      })
    );
  };

  const deleteTask = async (taskId) => {
    await axios.delete(URI + `/${taskId}`);
    const updatedTasks = tasks.filter((task) => {
      return task.taskId !== taskId;
    });
    setTasks(updatedTasks);
  };

  const contextValue = { tasks, addTask, editTask, deleteTask };

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
export default TaskProvider;
