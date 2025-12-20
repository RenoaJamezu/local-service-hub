import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { AuthProvider } from "./context/AuthContext.tsx"
import { ServiceProvider } from "./context/ServiceContext.tsx"
import { BookingProvider } from "./context/BookingContext.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ServiceProvider>
        <BookingProvider>
          <App />
        </BookingProvider>
      </ServiceProvider>
    </AuthProvider>
  </StrictMode>,
)
