import { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
  isAuthenticated?: boolean;
  user?: {
    name: string;
    avatar?: string;
  };
}

const Layout = ({ children, isAuthenticated, user }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated={isAuthenticated} user={user} />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;