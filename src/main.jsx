// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.jsx'
import './index.css'
// import { createBrowserRouter,  createRoutesFromElements,  Route,  RouterProvider } from 'react-router-dom'
// import Auth from './auth/Auth.jsx'
import ContextProvider from './context/Context.jsx'
const PUBLISHABLE_KEY ="pk_test_d29ydGh5LWxhYnJhZG9yLTAuY2xlcmsuYWNjb3VudHMuZGV2JA"

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/auth" element={<Auth />}>
//     <Route path="/" element={<App />}/>
      
//     </Route>
// )
// )



createRoot(document.getElementById('root')).render(
 
  <ContextProvider>
     {/* <ClerkProvider publishableKey={PUBLISHABLE_KEY} > */}
     <App />
    {/* </ClerkProvider> */}
    </ContextProvider>,

  
)
