import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Briefcase, Users, TrendingUp, Eye, Edit, Trash2, MapPin, DollarSign, Clock, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout/Layout";

const Dashboard = () => {
  const navigate = useNavigate();
  const [editingReferral, setEditingReferral] = useState<any>(null);
  const [editingApplication, setEditingApplication] = useState<any>(null);
  const [myReferrals, setmyReferrals] = useState([]);
  const { toast } = useToast();
  const [referralFormData, setReferralFormData] = useState({
    id: "",
    jobtitle: "",
    companyname: "",
    location: "",
    jobtype: "",
    experiencelevel: "",
    salaryrange: "",
    requirements: "",
    benefits: "",
    status: "",
    jd: ""
  });
  const [applicationFormData, setApplicationFormData] = useState({
    proftitle: "",
    currentcompany: "",
    location: "",
    jobtype: "",
    experience: "",
    salaryrange: "",
    userroledesc: "",
    requirements: "",
    benefits: "",
    status: "",
  });
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  

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
          setmyReferrals(data);
        } 
      } catch (e) {
        setmyReferrals(e.message);
      }
    };

  fetchReferrals()}, []);

  const stats = [
    { label: "Posted Referrals", value: myReferrals.length, icon: Briefcase },
    { label: "Total Applications", value: "1", icon: Users },
    { label: "Success Rate", value: "85%", icon: TrendingUp },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success text-success-foreground";
      case "pending":
        return "bg-warning text-warning-foreground";
      case "closed":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleEditReferral = (referral: any) => {
    setEditingReferral(referral);
    setReferralFormData({
      id: referral.id || "",
      jobtitle: referral.jobtitle || "",
      companyname: referral.companyname || "",
      location: referral.location || "",
      jobtype: referral.jobtype || "",
      experiencelevel: referral.experiencelevel || "",
      salaryrange: referral.salaryrange || "",
      requirements: referral.requirements || "",
      benefits: referral.benefits || "",
      status: referral.status || "",
      jd: referral.jd || ""
    });
    setIsReferralModalOpen(true);
  };

  const handleDeleteReferral = async (referralId: number) => {

  try{
    
  const response =  await fetch(`http://localhost:8086/referral/${referralId}`, {method:"delete", headers:{"Content-Type":"application/json"}, credentials:"include"})
  const data = await response.text();

  if(response.ok){
    toast({
        title: "Referral",
        description: data,
      });
  }
  }
  catch(e){
    toast({
        title: "Referral",
        description: "Deletion unsuccessfull",
      });
  }
}

  const handleEditApplication = (application: any) => {
    setEditingApplication(application);
    setApplicationFormData({
      proftitle: application.proftitle,
      currentcompany: application.currentcompany,
      location: application.location || "",
      jobtype: application.jobtype || "",
      experience: application.experience || "",
      salaryrange: application.salaryrange || "",
      userroledesc: application.userroledesc || "",
      requirements: application.requirements || "",
      benefits: application.benefits || "",
      status: application.status,
    });
    setIsApplicationModalOpen(true);
  };

  const handleDeleteApplication = (applicationId: number) => {
    // Handle delete logic here
    console.log("Deleting application:", applicationId);
  };

  const handleSaveReferral = async  (e: React.FormEvent,  id: any) => {
    e.preventDefault();
    try{
      const response = await fetch(`http://localhost:8086/referral/${id}`, {method:"put", body:JSON.stringify(referralFormData), headers:{"Content-Type":"application/json"}, credentials:"include"})

      if(response.ok){
        toast({
          title: "Referral",
          description: await response.text(),
        });
      }      
      // setIsReferralModalOpen();
      setEditingReferral(null);
    }
    catch(e){
      toast({
        title: "Referral",
        description: "Update failed",
        variant:"destructive"
      });
    }
  };

  const handleSaveApplication = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle save logic here
    console.log("Saving application:", applicationFormData);
    setIsApplicationModalOpen(false);
    setEditingApplication(null);
  };

  return (
    <Layout isAuthenticated={true}>
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {/* Welcome back, {user.name.split(" ")[0]}! */}
            </h1>
            <p className="text-muted-foreground">
              Manage your referrals and track your impact
            </p>
          </div>
          <Button
            className="mt-4 md:mt-0 bg-gradient-primary hover:bg-primary-dark"
            onClick={() => navigate("/post-referral")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Post New Referral
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* My Referrals */}
          <div className="w-full">
            <Card className="shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>My Referrals</CardTitle>
                  <CardDescription>Recent referrals you've posted</CardDescription>
                </div>
                <div className="flex gap-2">
                  {/* <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("/my-referrals")}
                  >
                    View All
                  </Button> */}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                 {myReferrals.length === 0 ? (
                  <div className="text-center py-12">
                    <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No Applications Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      You haven't posted any Referrals yet. Post it now!
                    </p>
                    <Button
                      onClick={() => navigate("/post-referral")}
                      className="bg-gradient-primary hover:bg-primary-dark"
                    >
                      Post Referrals
                    </Button>
                  </div>
                  ):(
                  myReferrals.map((referral) => (
                    <div key={referral.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium text-foreground">
                            {referral.jobtitle}
                          </h4>
                          <Badge
                            className={`text-xs ${getStatusColor(referral.status)}`}
                          >
                            {referral.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {referral.companyname}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {referral.applications} applications • Posted {new Date(referral.posteddate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/referral/${referral.id}`)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditReferral(referral)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteReferral(referral.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  )))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Edit Referral Modal */}
        <Dialog open={isReferralModalOpen} onOpenChange={setIsReferralModalOpen}>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Referral</DialogTitle>
              <DialogDescription>
                Update the complete referral information here.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={(e)=>handleSaveReferral(e,referralFormData.id)} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ref-title">Job Title *</Label>
                  <Input
                    id="ref-title"
                    defaultValue={referralFormData.jobtitle}
                    onChange={(e) => setReferralFormData({...referralFormData, jobtitle: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ref-company">Company *</Label>
                  <Input
                    id="ref-company"
                    value={referralFormData.companyname}
                    onChange={(e) => setReferralFormData({...referralFormData, companyname: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ref-location">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Location
                  </Label>
                  <Input
                    id="ref-location"
                    value={referralFormData.location}
                    onChange={(e) => setReferralFormData({...referralFormData, location: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ref-jobType">
                    <Clock className="h-4 w-4 inline mr-1" />
                    Job Type
                  </Label>
                  <Select value={referralFormData.jobtype} onValueChange={(value) => setReferralFormData({...referralFormData, jobtype: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full_time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ref-experience">Experience Level</Label>
                  <Select value={referralFormData.experiencelevel} onValueChange={(value) => setReferralFormData({...referralFormData, experiencelevel: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Entry_Level">Entry Level</SelectItem>
                      <SelectItem value="Mid_Level">Mid Level</SelectItem>
                      <SelectItem value="Senior_Level">Senior Level</SelectItem>
                      <SelectItem value="Lead_Principal">Lead/Principal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ref-salary">
                  <DollarSign className="h-4 w-4 inline mr-1" />
                  Salary Range
                </Label>
                <Input
                  id="ref-salary"
                  defaultValue={referralFormData.salaryrange}
                  onChange={(e) => setReferralFormData({...referralFormData, salaryrange: e.target.value})}
                />
              </div>

              {/* Job Description */}
              <div className="space-y-2">
                <Label htmlFor="ref-description">Job Description</Label>
                <Textarea
                  id="ref-description"
                  value={referralFormData.jd}
                  onChange={(e) => setReferralFormData({...referralFormData, jd: e.target.value})}
                  rows={4}
                />
              </div>

              {/* Requirements */}
              <div className="space-y-2">
                <Label htmlFor="ref-requirements">Requirements</Label>
                <Textarea
                  id="ref-requirements"
                  value={referralFormData.requirements}
                  onChange={(e) => setReferralFormData({...referralFormData, requirements: e.target.value})}
                  rows={4}
                />
              </div>

              {/* Benefits */}
              <div className="space-y-2">
                <Label htmlFor="ref-benefits">Benefits & Perks</Label>
                <Textarea
                  id="ref-benefits"
                  value={referralFormData.benefits}
                  onChange={(e) => setReferralFormData({...referralFormData, benefits: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ref-status">Status</Label>
                <Select value={referralFormData.status} onValueChange={(value) => setReferralFormData({...referralFormData, status: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending_review">Pending Review</SelectItem>
                    <SelectItem value="Under_review">Under Review</SelectItem>
                    <SelectItem value="Interviewing">Interviewing</SelectItem>
                    <SelectItem value="Offer_received">Offer Received</SelectItem>
                    <SelectItem value="Not_selected">Not Selected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsReferralModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-primary hover:bg-primary-dark">
                  Save Changes
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Application Modal */}
        <Dialog open={isApplicationModalOpen} onOpenChange={setIsApplicationModalOpen}>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Application</DialogTitle>
              <DialogDescription>
                Update the complete application information here.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSaveApplication} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="app-title">Job Title *</Label>
                  <Input
                    id="app-title"
                    value={applicationFormData.proftitle}
                    onChange={(e) => setApplicationFormData({...applicationFormData, proftitle: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="app-company">Company *</Label>
                  <Input
                    id="app-company"
                    value={applicationFormData.currentcompany}
                    onChange={(e) => setApplicationFormData({...applicationFormData, currentcompany: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="app-location">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Location
                  </Label>
                  <Input
                    id="app-location"
                    value={applicationFormData.location}
                    onChange={(e) => setApplicationFormData({...applicationFormData, location: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="app-jobType">
                    <Clock className="h-4 w-4 inline mr-1" />
                    Job Type
                  </Label>
                  <Select value={applicationFormData.jobtype} onValueChange={(value) => setApplicationFormData({...applicationFormData, jobtype: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="app-experience">Experience Level</Label>
                  <Select value={applicationFormData.experience} onValueChange={(value) => setApplicationFormData({...applicationFormData, experience: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Entry_Level">Entry Level</SelectItem>
                      <SelectItem value="Mid_Level">Mid Level</SelectItem>
                      <SelectItem value="Senior_Level">Senior Level</SelectItem>
                      <SelectItem value="Lead_Principal">Lead/Principal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="app-salary">
                  <DollarSign className="h-4 w-4 inline mr-1" />
                  Salary Range
                </Label>
                <Input
                  id="app-salary"
                  value={applicationFormData.salaryrange}
                  onChange={(e) => setApplicationFormData({...applicationFormData, salaryrange: e.target.value})}
                />
              </div>

              {/* Job Description */}
              <div className="space-y-2">
                <Label htmlFor="app-description">Job Description</Label>
                <Textarea
                  id="app-description"
                  value={applicationFormData.userroledesc}
                  onChange={(e) => setApplicationFormData({...applicationFormData, userroledesc: e.target.value})}
                  rows={4}
                />
              </div>

              {/* Requirements */}
              <div className="space-y-2">
                <Label htmlFor="app-requirements">Requirements</Label>
                <Textarea
                  id="app-requirements"
                  value={applicationFormData.requirements}
                  onChange={(e) => setApplicationFormData({...applicationFormData, requirements: e.target.value})}
                  rows={4}
                />
              </div>

              {/* Benefits */}
              <div className="space-y-2">
                <Label htmlFor="app-benefits">Benefits & Perks</Label>
                <Textarea
                  id="app-benefits"
                  value={applicationFormData.benefits}
                  onChange={(e) => setApplicationFormData({...applicationFormData, benefits: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="app-status">Application Status</Label>
                <Select value={applicationFormData.status} onValueChange={(value) => setApplicationFormData({...applicationFormData, status: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending_Review">Pending Review</SelectItem>
                    <SelectItem value="Under_Review">Under Review</SelectItem>
                    <SelectItem value="Interviewing">Interviewing</SelectItem>
                    <SelectItem value="Offere_Received">Offered</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsApplicationModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-primary hover:bg-primary-dark">
                  Save Changes
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Dashboard;