import React, { useReducer, useContext } from "react";

// Init the states
const defaultState = {
  user: {
    username: "",
    token: "",
    id: "",
  },
  isLoggedIn: false,
};

const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.user };
    case "SET_IS_LOGGED_IN":
      return { ...state, isLoggedIn: action.isLoggedIn };
    case "RESET_STATE":
      return { defaultState };
    default:
      return { ...state };
  }
};

const TaskStateContext = React.createContext();
TaskStateContext.displayName = "TaskStateContext";
const TaskDispatchContext = React.createContext();

const TaskContextProvider = (props) => {
  const [state, dispatch] = useReducer(appReducer, defaultState);
  return (
    <TaskStateContext.Provider value={state}>
      <TaskDispatchContext.Provider value={dispatch}>
        {props.children}
      </TaskDispatchContext.Provider>
    </TaskStateContext.Provider>
  );
};

// Pass the state of the user
const useTaskState = () => {
  const context = useContext(TaskStateContext);
  if (context === undefined) {
    throw new Error("useTaskState must be used within TaskContextProvider");
  }
  return context;
};

const useTaskDispatch = () => {
  const context = useContext(TaskDispatchContext);
  if (context === undefined) {
    throw new Error("useTaskDispatch must be used within TaskContextProvider");
  }
  return context;
};

export { TaskContextProvider, useTaskState, useTaskDispatch };
