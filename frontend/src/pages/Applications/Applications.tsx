import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, MapPin, DollarSign, Clock, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout/Layout";

const Applications = () => {
  const navigate = useNavigate();


const myApplications = [];
  
 
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-warning text-warning-foreground";
      case "reviewed": 
        return "bg-primary text-primary-foreground";
      case "interview":
        return "bg-info text-info-foreground";
      case "offered":
        return "bg-success text-success-foreground";
      case "rejected":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending Review";
      case "reviewed":
        return "Under Review";
      case "interview":
        return "Interviewing";
      case "offered":
        return "Offer Received";
      case "rejected":
        return "Not Selected";
      default:
        return status;
    }
  };

  return (
    <Layout isAuthenticated={true}>
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              My Applications
            </h1>
            <p className="text-muted-foreground">
              Track the status of your referral applications
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-soft">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Applications</p>
                    <p className="text-2xl font-bold text-foreground">{myApplications.length}</p>
                  </div>
                  <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building className="h-4 w-4 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold text-foreground">
                      {myApplications.filter(app => app.status === 'pending').length}
                    </p>
                  </div>
                  <div className="h-8 w-8 bg-warning/10 rounded-lg flex items-center justify-center">
                    <Clock className="h-4 w-4 text-warning" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Interviewing</p>
                    <p className="text-2xl font-bold text-foreground">
                      {myApplications.filter(app => app.status === 'interview').length}
                    </p>
                  </div>
                  <div className="h-8 w-8 bg-info/10 rounded-lg flex items-center justify-center">
                    <Eye className="h-4 w-4 text-info" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Offers</p>
                    <p className="text-2xl font-bold text-foreground">
                      {myApplications.filter(app => app.status === 'offered').length}
                    </p>
                  </div>
                  <div className="h-8 w-8 bg-success/10 rounded-lg flex items-center justify-center">
                    <Building className="h-4 w-4 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Applications List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myApplications.map((application) => (
              <Card key={application.id} className="shadow-soft hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{application.title}</CardTitle>
                      <CardDescription className="text-sm font-medium text-foreground">
                        {application.company}
                      </CardDescription>
                    </div>
                    <Badge className={`text-xs ${getStatusColor(application.status)}`}>
                      {getStatusText(application.status)}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      {application.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <DollarSign className="h-4 w-4 mr-2" />
                      {application.salary}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      {application.jobType} • {application.experience}
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground mb-1">Referred by:</p>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={application.referrerAvatar} alt={application.referrerName} />
                        <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                          {application.referrerName.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{application.referrerName}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <p className="text-xs text-muted-foreground mb-2">
                      Applied on {new Date(application.appliedDate).toLocaleDateString()}
                    </p>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => navigate(`/referral/${application.referralId}`)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {myApplications.length === 0 && (
            <div className="text-center py-12">
              <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No Applications Yet</h3>
              <p className="text-muted-foreground mb-4">
                You haven't submitted any applications yet. Browse referrals to get started!
              </p>
              <Button
                onClick={() => navigate("/referrals")}
                className="bg-gradient-primary hover:bg-primary-dark"
              >
                Browse Referrals
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Applications;