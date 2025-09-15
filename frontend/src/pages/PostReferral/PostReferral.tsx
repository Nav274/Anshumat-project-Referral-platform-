import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, MapPin, DollarSign, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout/Layout";

const PostReferral = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    jobtitle: "",
    companyname: "",
    location: "",
    jobtype: "",
    experiencelevel: "",
    salaryrange: "",
    jd: "",
    requirements: "",
    Benefits: ""
  });

  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call

    try{
      // API call
       const referralresponse = await fetch("http://localhost:8086/referrals",{ method:"post", body: JSON.stringify(formData), headers: {
          "Content-Type": "application/json"
      }, credentials:"include"})

        if(referralresponse.ok){

          const data = await referralresponse.text();
          toast({
            title: "Post referral",
            description: data,
          });

        }

    }
    catch(e){

      toast({
        title: "Post referral",
        description: "Updation unsuccessfull",
        variant:"destructive"
      });
      
    }
    finally{

      setIsLoading(false);
    }
  };

  return (
    <Layout isAuthenticated={true}>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Post a Job Referral</h1>
              <p className="text-muted-foreground">Help someone find their dream job</p>
            </div>
          </div>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>
                Provide detailed information about the position you're referring
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title *</Label>
                    <Input
                      id="title"
                      name="jobtitle"
                      placeholder="e.g. Senior Software Engineer"
                      value={formData?.jobtitle}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Company *</Label>
                    <Input
                      id="company"
                      name="companyname"
                      placeholder="e.g. Tech Corp"
                      value={formData.companyname}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">
                      <MapPin className="h-4 w-4 inline mr-1" />
                      Location
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="e.g. San Francisco, CA"
                      value={formData.location}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="jobtype">
                      <Clock className="h-4 w-4 inline mr-1" />
                      Job Type
                    </Label>
                    <Select value={formData.jobtype} onValueChange={(value) => setFormData({...formData, jobtype: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full_time">Full-time</SelectItem>
                        <SelectItem value="Part_time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="Experiencelevel">Experience Level</Label>
                    <Select value={formData.experiencelevel} onValueChange={(value) => setFormData({...formData, experiencelevel: value})}>
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
                  <Label htmlFor="salary">
                    <DollarSign className="h-4 w-4 inline mr-1" />
                    Salary Range (Optional)
                  </Label>
                  <Input
                    id="salaryrange"
                    name="salaryrange"
                    placeholder="e.g. $120,000 - $150,000"
                    value={formData.salaryrange}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Job Description */}
                <div className="space-y-2">
                  <Label htmlFor="jd">Job Description *</Label>
                  <Textarea
                    id="jd"
                    name="jd"
                    placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                    value={formData.jd}
                    onChange={handleInputChange}
                    rows={4}
                    required
                  />
                </div>

                {/* Requirements */}
                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements *</Label>
                  <Textarea
                    id="requirements"
                    name="requirements"
                    placeholder="List the key skills, experience, and qualifications needed for this role..."
                    value={formData.requirements}
                    onChange={handleInputChange}
                    rows={4}
                    required
                  />
                </div>

                {/* Benefits */}
                <div className="space-y-2">
                  <Label htmlFor="Benefits">Benefits & Perks</Label>
                  <Textarea
                    id="Benefits"
                    name="Benefits"
                    placeholder="Highlight the benefits, perks, and company culture..."
                    value={formData.Benefits}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate("/dashboard")}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-primary hover:bg-primary-dark"
                    disabled={isLoading}
                  >
                    {isLoading ? "Posting..." : "Post Referral"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PostReferral;