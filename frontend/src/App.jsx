import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./snippets/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DoctorDetail from "./pages/DoctorDetail";
import Doctors from "./snippets/Doctors";
import PatientTabs from "./user/PatientTabs";
import DoctorTabs from "./doctor/DoctorTabs";
import MapComponent from "./pages/Map";
import { Toaster } from "sonner";
import { useRecoilValue } from "recoil";
import { loggedInState, userState } from "./store/atoms/userauth";
import ProtectedRoute from "./store/ProtectedRoute";
import DoctorLogin from "./pages/DoctorLogin";
import DoctorRegister from "./pages/DoctorRegister";
import Footer from "./home/Footer";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import GoogleTranslate from "./snippets/GoogleTranslate";
import PaymentSuccess from "./pages/Successpage";
import PaymentFailure from "./pages/Failurepage";

function App() {

  const isLoggedIn = useRecoilValue(loggedInState);
  const user = useRecoilValue(userState);

  return (
    <BrowserRouter>
      <div className="mx-4 sm:mx-[10%]">
        <Navbar />
        <div>
          <GoogleTranslate />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/doctordetail/:id" element={<DoctorDetail />} />

          <Route path="/map" element={
            <ProtectedRoute>
              <MapComponent />
            </ProtectedRoute>
          } />

          <Route path="/success" element={
            <ProtectedRoute>
              {user ? <PaymentSuccess /> : <Navigate to="/" replace />}
            </ProtectedRoute>
          } />

          <Route path="/failure" element={
            <ProtectedRoute>
              {user ? <PaymentFailure /> : <Navigate to="/" replace />}
            </ProtectedRoute>
          } />

          <Route path="/patientprofile" element={
            <ProtectedRoute>
              {user ? <PatientTabs /> : <Navigate to="/" replace />}
            </ProtectedRoute>
          } />
          <Route path="/doctorprofile" element={
            <ProtectedRoute>
              {!user ? <DoctorTabs /> : <Navigate to="/" replace />}
            </ProtectedRoute>
          } />

          {!isLoggedIn ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/doctorlogin" element={<DoctorLogin />} />
              <Route path="/doctorregister" element={<DoctorRegister />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/" />} />
          )}

        </Routes>
        <Toaster richColors />
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App
