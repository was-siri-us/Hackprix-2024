import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react"
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index path="/" element={<Home />} />
      <Route path="/dashboard" element={
        <>
          <SignedIn>
            <Dashboard />
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>
      } />
    </>
  )
)

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}