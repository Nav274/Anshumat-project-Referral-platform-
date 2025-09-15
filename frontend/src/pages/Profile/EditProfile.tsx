import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, MapPin, Building, GraduationCap, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout/Layout";

const EditProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [skills, setSkills] = useState<string[]>(["React", "TypeScript", "Node.js"]);
  const [newSkill, setNewSkill] = useState("");
  const [profileresponse, setprofileresponse] = useState(null);

  
  // Mock user data
  // const user = {
  //   name: "John Doe",
  //   email: "john.doe@example.com",
  //   title: "Senior Software Engineer",
  //   company: "Tech Corp",
  //   avatar: "",
  // };

  const [formData, setFormData] = useState({
    // Personal Info
    firstname: " ",
    lastname: " ",
    proftitle: " ",
    bio: " ",
    location: " ",
    phoneno: " ",
    linkedin: " ",
    
    // Current Employment
    currentcompany: " ",
    currentrole: " ",
    currentstartdate: " ",
    userroledesc: " ",
    
    // Education
    university: " ",
    degree: " ",
    fieldofstudy: " ",
    yop: " ",
    
    // Experience
    experiencelevel: " ",
    industries: " ",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try{    
    const response = await fetch("http://localhost:8086/profile", {method:"post", body:JSON.stringify(formData), headers:{"Content-Type":"application/json"}, credentials:"include"})    
    if(response.ok){
      toast({
        title: "Profile Updated!",
        description: "Your profile has been successfully updated."
      });
    }

    setIsLoading(false);
    
    }
    catch(e){

      toast({
        title: "Profile Update failed!",
        description: "Your profile has been failed.",
      });
      setIsLoading(false);
    }

    finally{
      setFormData(null)
    }
    
  };

  useEffect(()=> {
    const getProfile = async()=>{

      try{
      const response = await fetch("http://localhost:8086/profile", {method:"get", headers:{"Content-Type":"application/json"}, credentials:"include"})
      const data = await response.json();
      setprofileresponse(data);
    }
    catch(e){

    toast({
        title: "Some error occurred",
        description: "Some error occurred",
      });

    }
  } 
  getProfile()}, []);
  
  return (
    <Layout isAuthenticated={true}>
      <div className="min-h-screen bg-background py-8">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              Edit Profile
            </h1>
            <p className="text-muted-foreground">
              Update your professional information and preferences
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Update your basic information and professional details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Upload */}
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="" alt="Profile" />
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground text-lg">
                      {profileresponse?.firstname?.[0]}{profileresponse?.lastname?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Button type="button" variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Change Photo
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstname"
                      defaultValue={profileresponse?.userinfomation?.firstname || null}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastname"
                      defaultValue={profileresponse?.userinfomation?.lastname || null}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Professional Title *</Label>
                  <Input
                    id="title"
                    name="proftitle"
                    defaultValue={profileresponse?.userinfomation?.proftitle || null}
                    onChange={handleInputChange}
                    placeholder="e.g., Senior Software Engineer"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    defaultValue={profileresponse?.userinfomation?.bio || null}
                    onChange={handleInputChange}
                    placeholder="Tell us about your professional background and expertise..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      defaultValue={profileresponse?.userinfomation?.location || null}
                      onChange={handleInputChange}
                      placeholder="City, Country"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phoneno"
                      defaultValue={profileresponse?.userinfomation?.phoneno || null}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input
                    id="linkedin"
                    name="linkedin"
                    defaultValue={profileresponse?.userinfomation?.linkedin || null}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/your-profile"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Current Employment */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  Current Employment
                </CardTitle>
                <CardDescription>
                  Update your current work information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentCompany">Current Company *</Label>
                    <Input
                      id="currentCompany"
                      name="currentcompany"
                      defaultValue={profileresponse?.useremployement?.currentcompany || null}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentRole">Current Role *</Label>
                    <Input
                      id="currentRole"
                      name="currentrole"
                      defaultValue={profileresponse?.useremployement?.currentrole || null}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentStartDate">Start Date</Label>
                    <Input
                      id="currentStartDate"
                      name="currentstartdate"
                      type="month"
                      defaultValue={profileresponse?.useremployement?.currentstartdate || null}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experiencelevel">Experience Level</Label>                   
                    <Select defaultValue={profileresponse?.useremployement?.experiencelevel} onValueChange={(value) => setFormData({...formData, experiencelevel: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Entry_Level">Entry Level (0-2 years)</SelectItem>
                        <SelectItem value="Mid_Level">Mid Level (3-5 years)</SelectItem>
                        <SelectItem value="Senior_Level">Senior Level (6-10 years)</SelectItem>
                        <SelectItem value="Lead_Principal">Lead/Principal (10+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workDescription">Work Description</Label>
                  <Textarea
                    id="workDescription"
                    name="userroledesc"
                    defaultValue={profileresponse?.useremployement?.userroledesc || null}
                    onChange={handleInputChange}
                    placeholder="Describe your current role and responsibilities..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  Education
                </CardTitle>
                <CardDescription>
                  Update your educational background
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="university">University/Institution</Label>
                    <Input
                      id="university"
                      name="university"
                      defaultValue={profileresponse?.usereducation?.university || null}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="degree">Degree</Label>
                    <Input
                      id="degree"
                      name="degree"
                      defaultValue={profileresponse?.usereducation?.degree || null}
                      onChange={handleInputChange}
                      placeholder="e.g., Bachelor of Science"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fieldOfStudy">Field of Study</Label>
                    <Input
                      id="fieldOfStudy"
                      name="fieldofstudy"
                      defaultValue={profileresponse?.usereducation?.fieldofstudy || null}
                      onChange={handleInputChange}
                      placeholder="e.g., Computer Science"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="graduationYear">Graduation Year</Label>
                    <Input
                      id="graduationYear"
                      name="yop"
                      defaultValue={profileresponse?.usereducation?.yop || null}
                      onChange={handleInputChange}
                      placeholder="e.g., 2020"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industries">Industries</Label>
                  <Input
                    id="industries"
                    name="industries"
                    defaultValue={profileresponse?.usereducation?.industries || null}
                    onChange={handleInputChange}
                    placeholder="e.g., Technology, Healthcare, Finance"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Skills & Expertise</CardTitle>
                <CardDescription>
                  Update your technical and professional skills
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  />
                  <Button type="button" onClick={addSkill} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-1 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                      {skill}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 w-4 h-4"
                        onClick={() => removeSkill(skill)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex gap-4 justify-center">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard")}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-primary hover:bg-primary-dark px-8"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Profile"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;