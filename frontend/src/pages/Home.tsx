import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Users, Briefcase, Star, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import Footer from "./Footer";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: "Connect Professionals",
      description: "Bridge the gap between talented candidates and top companies through trusted referrals."
    },
    {
      icon: Briefcase,
      title: "Quality Opportunities",
      description: "Access exclusive job openings from leading companies across various industries."
    },
    {
      icon: Star,
      title: "Trusted Network",
      description: "Build meaningful connections with verified professionals in your field."
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Accelerate your career progression through strategic networking and referrals."
    }
  ];

  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "5K+", label: "Successful Referrals" },
    { value: "500+", label: "Partner Companies" },
    { value: "95%", label: "Success Rate" }
  ];

  return (
  <>
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Your Gateway to
            <span className="bg-gradient-hero bg-clip-text text-transparent"> Dream Jobs</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with professionals, discover opportunities, and get referred to your ideal position. 
            RefConnect makes job referrals simple, secure, and successful.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:bg-primary-dark shadow-medium"
              onClick={() => navigate("/signup")}
            >
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose RefConnect?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're revolutionizing the way professionals connect and find opportunities
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-soft hover:shadow-medium transition-all duration-300 bg-gradient-card">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-hero">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have found their dream jobs through RefConnect
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="shadow-large"
            onClick={() => navigate("/signup")}
          >
            Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </Layout>
    <Footer />
  </>
  );
};

export default Home;