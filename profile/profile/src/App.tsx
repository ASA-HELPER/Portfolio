import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from './pages/home/Home';
import ViewProject from './pages/view-project/ViewProject';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ViewProject />} />
      </Routes>
      <ToastContainer position='top-right' theme='dark'/>
    </Router>
  )
}

export default App
