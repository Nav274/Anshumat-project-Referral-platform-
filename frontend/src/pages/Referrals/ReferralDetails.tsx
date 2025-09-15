import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, MapPin, Clock, IndianRupeeIcon, Users, MessageSquare, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout/Layout";

const ReferralDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [refresponse, setrefresponse] = useState(null);


  useEffect(()=>{
    const fetchspecificreferral = async()=>{
    try{
      const response = await  fetch(`http://localhost:8086/referral/${id}`,{method:"get", headers:{"Content-Type":"application/json"}, credentials:"include"})
      if(response.ok){
        const data = await response.json();
        setrefresponse(data);
      }
    }catch(e){
        setrefresponse(e);
      }     
    }
    fetchspecificreferral()}, []);
     
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

  const handleApply = () => {
    toast({
      title: "Application Submitted!",
      description: "Your application has been sent to the referrer.",
    });
  };

  const handleMessage = () => {
    navigate("/messages");
  };

  return (
    <Layout isAuthenticated={true} >
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/referrals")}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Job Details</h1>
              <p className="text-muted-foreground">Complete information about this opportunity</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job Overview */}
              <Card className="shadow-medium">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">{refresponse?.jobtitle}</CardTitle>
                      <CardDescription className="text-lg font-medium text-foreground mb-4">
                        {refresponse?.company}
                      </CardDescription>
                    </div>
                    <Badge className={getExperienceColor(refresponse?.experience)}>
                      {refresponse?.experience}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {refresponse?.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {refresponse?.jobtype}
                    </div>
                    {refresponse?.salaryrange && (
                      <div className="flex items-center">
                        <IndianRupeeIcon className="h-4 w-4 mr-1" />
                        {refresponse.salaryrange}
                      </div>
                    )}
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {refresponse?.applications} applications
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-6">
                    {/* Description */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Job Description</h3>
                      <p className="text-muted-foreground whitespace-pre-line">
                        {refresponse?.jd}
                      </p>
                    </div>

                    <Separator />

                    {/* Requirements */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                      <div className="text-muted-foreground whitespace-pre-line">
                        {refresponse?.requirements}
                      </div>
                    </div>

                    <Separator />

                    {/* Benefits */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Benefits & Perks</h3>
                      <div className="text-muted-foreground whitespace-pre-line">
                        {refresponse?.benefits}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Referrer Info */}
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="text-lg">Referred By</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={refresponse?.jobtitle} alt={refresponse?.jobtitle} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {refresponse?.jobtitle.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">
                        {refresponse?.postedBy?.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {refresponse?.postedBy?.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {refresponse?.postedBy?.company}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Posted {new Date(refresponse?.posteddate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <Card className="shadow-medium">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <Button
                      onClick={handleApply}
                      className="w-full bg-gradient-primary hover:bg-primary-dark"
                      size="lg"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Apply Now
                    </Button>
                    <Button
                      onClick={handleMessage}
                      variant="outline"
                      className="w-full"
                      size="lg"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message Referrer
                    </Button>
                  </div>
                  
                  <div className="mt-4 p-3 bg-muted/50 rounded-md">
                    <p className="text-xs text-muted-foreground text-center">
                      By applying, you agree to share your profile with the referrer
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReferralDetails;