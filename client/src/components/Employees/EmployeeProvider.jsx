import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from '../../firebase/AuthContext';

const URI = 'https://bugoff.rakilahmed.com/api/employees';
const EmployeeContext = createContext();

const EmployeeProvider = ({ children }) => {
  const { user, getToken } = useAuth();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchEmployees = async () => {
        const res = await axios.get(URI);
        if (res.data[0] && res.data[0].employees) {
          setEmployees(res.data[0].employees);
        }
      };

      fetchEmployees();
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

  const addEmployee = async (name, email) => {
    const res = await axios.post(URI, {
      _id: `${user.uid}`,
      employees: [
        {
          _id: Math.floor(1000 + Math.random() * 9000),
          name: name,
          email: email,
          ticket_count: 0,
        },
      ],
    });
    setEmployees([...employees, res.data]);
  };

  const editEmployee = async (employeeId, name, email, ticketCount) => {
    const res = await axios.put(URI + `/${employeeId}`, {
      _id: `${user.uid}`,
      employees: [
        {
          _id: employeeId,
          name: name,
          email: email,
          ticket_count: ticketCount,
        },
      ],
    });
    setEmployees(
      employees.map((employee) => {
        return employee._id === employeeId ? { ...res.data } : employee;
      })
    );
  };

  const deleteEmployee = async (employeeId) => {
    await axios.delete(URI + `/${employeeId}`);
    const updatedEmployees = employees.filter((employee) => {
      return employee._id !== employeeId;
    });
    setEmployees(updatedEmployees);
  };

  const contextValue = { employees, addEmployee, editEmployee, deleteEmployee };

  return (
    <EmployeeContext.Provider value={contextValue}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => useContext(EmployeeContext);
export default EmployeeProvider;
