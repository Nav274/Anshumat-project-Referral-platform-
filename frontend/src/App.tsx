import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import ProfileSetup from "./pages/Profile/ProfileSetup";
import Dashboard from "./pages/Dashboard/Dashboard";
import PostReferral from "./pages/PostReferral/PostReferral";
import ReferralsList from "./pages/Referrals/ReferralsList";
import ReferralDetails from "./pages/Referrals/ReferralDetails";
import Messages from "./pages/Messages/Messages";
import Applications from "./pages/Applications/Applications";
import EditProfile from "./pages/Profile/EditProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/profile-setup" element={<ProfileSetup />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/post-referral" element={<PostReferral />} />
          <Route path="/referrals" element={<ReferralsList />} />
          <Route path="/referral/:id" element={<ReferralDetails />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/profile" element={<EditProfile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
