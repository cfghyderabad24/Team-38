import Navbar from './navbar/Navbar'
import { Outlet } from "react-router-dom";
import Footer from './CustomFooter/CustomFooter'


function RootLayout() {
  return (
    <div>
        <Navbar/>
        <Outlet/>
       
    </div>
  )
}

export default RootLayout
