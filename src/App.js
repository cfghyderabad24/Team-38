import { createBrowserRouter,RouterProvider } from "react-router-dom";
import RootLayout from './components/RootLayout';
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home/Home"
import Register from "./components/register/Register"
import Login from "./components/login/Login"
import AboutUs from "./components/aboutus/aboutus"
import StudentDashboard from "./components/studentdashboard/Studentdashboard"
import Ngodashboard from "./components/ngodashboard/ngodashboard";
import VolunteerDashboard from "./components/volunteerdashboard/volunteerdashboard"
import Admindashboard from "./components/admindashboard/admindashboard"




function App() {
  let router=createBrowserRouter([
    {
      path:'/',
      element:<RootLayout/>,
      errorElement:<ErrorPage/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/register',
          element:<Register/>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/aboutus',
          element:<AboutUs/>
        },
        {
          path:'/student-profile',
          element:<StudentDashboard/>
         
        },
        {
          path:'/ngo-profile',
          element:<Ngodashboard/>
         
        },
        {
          path:'/volunteer-profile',
          element:<VolunteerDashboard/>
         
        },
        {
          path:'/admin-profile',
          element:<Admindashboard/>
         
        }
      ]
    }
  ])





























































































































































































  return (
    <div className="App">
      <RouterProvider router={router}/>
      
    </div>
  );
}

export default App;
