import { Route, Routes } from "react-router-dom"
import Welcome from "./pages/Welcome"
import EmployeeLogin from "./pages/EmployeeLogin"
import SupervisorLogin from "./pages/SupervisorLogin"


function App() {
  return (
    <Routes>
      <Route path="" element={<Welcome/>}/>
      <Route path="/employee-login" element={<EmployeeLogin/>} />
      <Route path="/supervisor-login" element={<SupervisorLogin/>} />
    </Routes>
  )
}

export default App
