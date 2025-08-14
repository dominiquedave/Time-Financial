import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

const ContactForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    state: "",
    ssn: "",
    dob: undefined as Date | undefined,
    address: "",
    zipCode: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Split full name into first and last name
      const [firstName, ...lastNameParts] = formData.fullName.split(' ')
      const lastName = lastNameParts.join(' ')

      // Check for authenticated user
      const { data: user } = await supabase.auth.getUser()
      
      // Prepare base lead data
      const leadData = {
        first_name: firstName,
        last_name: lastName,
        email: formData.email,
        phone: formData.phone,
        state: formData.state,
        ssn: formData.ssn,
        date_of_birth: formData.dob,
        address: formData.address,
        zip_code: formData.zipCode,
        status: 'new'
      }

      // Add user and owner IDs if authenticated
      if (user?.user?.id) {
        Object.assign(leadData, {
          user_id: user.user.id,
          owner_id: user.user.id
        })
      }

      const { error } = await supabase
        .from('leads')
        .insert(leadData)

      if (error) throw error
      
      // Show success message or redirect
      alert('Thank you for your submission!')
      
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        state: "",
        ssn: "",
        dob: undefined,
        address: "",
        zipCode: ""
      })
      setCurrentStep(1)
      
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error submitting your form. Please try again.')
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handlePrevious = () => {
    setCurrentStep(1);
  };

  const handleInputChange = (field: string, value: string | Date) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", 
    "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", 
    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", 
    "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", 
    "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", 
    "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", 
    "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[hsl(var(--secondary))] to-[hsl(var(--insurance-light))]">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Get Your Free Quote
          </h2>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">
            Take the first step towards affordable health coverage. Our experts will help you find the perfect plan.
          </p>
        </div>

        <Card className="shadow-[var(--shadow-card)] border-border">
          <CardHeader className="text-center">
            <div className="flex justify-center items-center gap-4 mb-4">
              <div className={cn(
                "w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium",
                currentStep >= 1 ? "bg-[hsl(var(--insurance-lime))] border-[hsl(var(--insurance-lime))] text-white" : "border-muted-foreground text-muted-foreground"
              )}>
                1
              </div>
              <div className={cn(
                "w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium",
                currentStep >= 2 ? "bg-[hsl(var(--insurance-lime))] border-[hsl(var(--insurance-lime))] text-white" : "border-muted-foreground text-muted-foreground"
              )}>
                2
              </div>
            </div>
            <CardTitle className="text-2xl text-foreground">
              {currentStep === 1 ? "Contact Information" : "Fill in the details below."}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentStep === 1 ? (
              <form onSubmit={handleNext} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium text-foreground">
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    required
                    className="h-12 border-border focus:ring-[hsl(var(--insurance-lime))]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="h-12 border-border focus:ring-[hsl(var(--insurance-lime))]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                    className="h-12 border-border focus:ring-[hsl(var(--insurance-lime))]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state" className="text-sm font-medium text-foreground">
                    State *
                  </Label>
                  <Select onValueChange={(value) => handleInputChange("state", value)} required>
                    <SelectTrigger className="h-12 border-border focus:ring-[hsl(var(--insurance-lime))]">
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  type="submit" 
                  variant="insurance" 
                  size="lg" 
                  className="w-full h-14 text-lg font-semibold"
                >
                  Next
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="ssn" className="text-sm font-medium text-foreground">
                    SSN
                  </Label>
                  <Select onValueChange={(value) => handleInputChange("ssn", value)}>
                    <SelectTrigger className="h-12 border-border focus:ring-[hsl(var(--insurance-lime))]">
                      <SelectValue placeholder="SSN" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xxx-xx-1234">XXX-XX-1234</SelectItem>
                      <SelectItem value="xxx-xx-5678">XXX-XX-5678</SelectItem>
                      <SelectItem value="xxx-xx-9012">XXX-XX-9012</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    DOB*
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-12 justify-start text-left font-normal border-border",
                          !formData.dob && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.dob ? format(formData.dob, "MM/dd/yyyy") : <span>mm/dd/yyyy</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.dob}
                        onSelect={(date) => handleInputChange("dob", date || new Date())}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium text-foreground">
                    Address*
                  </Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="Address*"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    required
                    className="h-12 border-border focus:ring-[hsl(var(--insurance-lime))]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode" className="text-sm font-medium text-foreground">
                    Zip Code*
                  </Label>
                  <Input
                    id="zipCode"
                    type="text"
                    placeholder="Zip Code*"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                    required
                    className="h-12 border-border focus:ring-[hsl(var(--insurance-lime))]"
                  />
                </div>

                <div className="flex gap-4">
                  <Button 
                    type="button"
                    onClick={handlePrevious}
                    variant="outline" 
                    size="lg" 
                    className="flex-1 h-14 text-lg font-semibold"
                  >
                    Previous
                  </Button>
                  <Button 
                    type="submit" 
                    variant="insurance" 
                    size="lg" 
                    className="flex-1 h-14 text-lg font-semibold"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactForm;