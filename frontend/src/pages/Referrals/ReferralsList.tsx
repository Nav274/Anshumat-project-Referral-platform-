import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MapPin, Clock, IndianRupee, Users, Briefcase, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout/Layout";

const ReferralsList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [refresponse, setrefresponse] = useState([]);
  
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
  };

  useEffect(() => {
  const fetchReferrals = async () => {
    try {
      const response = await fetch("http://localhost:8086/referrals", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });

      if (response.ok) {
        const data = await response.json(); 
        setrefresponse(data);
      } 
    } catch (e) {
      setrefresponse(e.message );
    }
  };

  fetchReferrals(); 
}, []);


  const filteredReferrals = refresponse.filter(referral =>
    referral.jobtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    referral.companyname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    referral.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getExperienceColor = (experience: string) => {
    switch (experience) {
      case "Entry Level":
        return "bg-success/10 text-success";
      case "Mid Level":
        return "bg-primary/10 text-primary";
      case "Senior Level":
        return "bg-warning/10 text-warning";
      case "Lead/Principal":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Layout isAuthenticated={true} user={user}>
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Browse Referrals
          </h1>
          <p className="text-muted-foreground">
            Discover amazing opportunities shared by your network
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by job title, company, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" className="md:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {filteredReferrals.map((referral) => (
            <Card key={referral.id} className="shadow-soft hover:shadow-medium transition-all duration-300">
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl hover:text-primary cursor-pointer">
                        {referral.jobtitle}
                      </CardTitle>
                      <Badge className={getExperienceColor(referral.experience)}>
                        {referral.experience}
                      </Badge>
                    </div>
                    <CardDescription className="text-lg font-medium text-foreground mb-2">
                      {referral.companyname}
                    </CardDescription>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {referral.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {referral.jobtype}
                      </div>
                      {referral.salaryrange && (
                        <div className="flex items-center">
                          <IndianRupee className="h-4 w-4 mr-1" />
                          {referral.salaryrange}
                        </div>
                      )}
                      {/* <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {referral.applications} applications
                      </div> */}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {referral.jobtitle}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={referral.jobtitle} alt={referral.jobtitle} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {referral.jobtitle.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {referral.jobtitle}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {referral.jobtitle}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">
                      Posted {referral.posteddate}
                    </span>
                    <Button
                      onClick={() => navigate(`/referral/${referral.id}`)}
                      className="bg-gradient-primary hover:bg-primary-dark"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredReferrals.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No referrals found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or check back later for new opportunities.
            </p>
            <Button
              onClick={() => navigate("/post-referral")}
              className="bg-gradient-primary hover:bg-primary-dark"
            >
              Post a Referral
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ReferralsList;