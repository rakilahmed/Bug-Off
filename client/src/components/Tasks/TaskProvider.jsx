import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from '../../firebase/AuthContext';

const URI = '/api/tasks';
const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const { user, getToken } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchTasks = async () => {
        const res = await axios.get(URI);
        if (res.data[0] && res.data[0].tasks) {
          setTasks(res.data[0].tasks.reverse());
        }
      };

      fetchTasks();
    }
  }, [user]);

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
      _id: `${user.uid}`,
      tasks: [
        {
          _id: Math.floor(1000 + Math.random() * 9000),
          task: task,
        },
      ],
    });
    setTasks([res.data, ...tasks]);
  };

  const editTask = async (taskId, task) => {
    const res = await axios.put(URI + `/${taskId}`, {
      _id: `${user.uid}`,
      tasks: [
        {
          _id: taskId,
          task: task,
        },
      ],
    });
    setTasks(
      tasks.map((task) => {
        return task._id === taskId ? { ...res.data } : task;
      })
    );
  };

  const deleteTask = async (taskId) => {
    await axios.delete(URI + `/${taskId}`);
    const updatedTasks = tasks.filter((task) => {
      return task._id !== taskId;
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
