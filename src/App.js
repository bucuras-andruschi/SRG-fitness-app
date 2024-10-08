import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Home from "./components/home";
import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";
import BMI from "./components/BMI";
import Abs from "./components/workouts/abs";
import Chest from './components/workouts/Chest'
import Arm from './components/workouts/arm'
import Leg from './components/workouts/leg'
import ShoulderBack from "./components/workouts/shoulderback";
import ChatSRG from "./components/Chat SRG";

function App() {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path:'/bmi',
      element: <BMI />
    },
    {
      path:'/abs',
      element: <Abs />
    },
    {
      path:'/chest',
      element: <Chest />
    },
    {
      path:'/arm',
      element: <Arm />
    },
    {
      path:'/leg',
      element: <Leg />
    },
    {
      path:'/shoulderback',
        element: <ShoulderBack />
    },
    {
      path:'/srg',
        element: <ChatSRG />
    }
  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <div className="w-full h-screen flex flex-col">

        {routesElement}
      </div>
    </AuthProvider>
  );
}

export default App;
