import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './Pages/Home/Home.jsx'
import Login from './Pages/Authentication/Login.jsx'
import Signup from './Pages/Authentication/Signup.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import ProtectedRoutes from './components/utlities/protectedRoutes.jsx'


// import {BrowserRouter} from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: (<ProtectedRoutes>
      <Home />
    </ProtectedRoutes>
    )
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  }

]);


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <App />
  </Provider>
)
