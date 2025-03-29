
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Image, Users, Info, Gift, Phone, FileText, User, Lock } from 'lucide-react';
import PageLayout from '../components/PageLayout';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would validate credentials with a backend
    // For this example, we'll use a simple check
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };
  
  if (!isLoggedIn) {
    return (
      <PageLayout 
        title="Admin Login" 
        description="Please login to access the admin dashboard."
        backgroundClass="bg-gray-50"
      >
        <section className="py-16">
          <div className="max-w-md mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
              
              <div className="mt-4 text-center text-sm text-muted-foreground">
                <p>For demo purposes, use:</p>
                <p>Username: admin</p>
                <p>Password: password</p>
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Tibetan Cancer Society Admin</h1>
            <Button 
              variant="outline" 
              onClick={() => setIsLoggedIn(false)}
              className="text-white border-white hover:bg-white/20"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <Tabs defaultValue="about">
            <TabsList className="mb-8 overflow-x-auto flex items-center w-full justify-start border-b pb-4">
              <TabsTrigger value="about" className="mr-2">
                <FileText className="h-4 w-4 mr-2" />
                About
              </TabsTrigger>
              <TabsTrigger value="gallery" className="mr-2">
                <Image className="h-4 w-4 mr-2" />
                Gallery
              </TabsTrigger>
              <TabsTrigger value="team" className="mr-2">
                <Users className="h-4 w-4 mr-2" />
                Team
              </TabsTrigger>
              <TabsTrigger value="donate" className="mr-2">
                <Gift className="h-4 w-4 mr-2" />
                Donate
              </TabsTrigger>
              <TabsTrigger value="cancer-info" className="mr-2">
                <Info className="h-4 w-4 mr-2" />
                Cancer Info
              </TabsTrigger>
              <TabsTrigger value="contact">
                <Phone className="h-4 w-4 mr-2" />
                Contact
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="about">
              <h2 className="text-2xl font-bold mb-6">Edit About Page</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Mission</h3>
                  <Textarea
                    className="min-h-32"
                    defaultValue="The Tibetan Cancer Society is dedicated to improving the lives of cancer patients and their families through education, support, and advocacy. We work to ensure that all members of the Tibetan community have access to information, resources, and quality care."
                  />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Vision</h3>
                  <Textarea
                    className="min-h-32"
                    defaultValue="We envision a future where cancer no longer poses a significant threat to the Tibetan community. A world where every individual has access to education about cancer prevention, early detection, and treatment options."
                  />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Partners & Collaborators</h3>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      Add or edit partner organizations. Each entry includes the organization name, website link, and logo.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Organization Name
                          </label>
                          <Input defaultValue="Partner Organization 1" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Website URL
                          </label>
                          <Input defaultValue="https://partner1.org" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            Upload Logo
                          </Button>
                          <Button variant="destructive" size="sm">
                            Remove
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Organization Name
                          </label>
                          <Input defaultValue="Partner Organization 2" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Website URL
                          </label>
                          <Input defaultValue="https://partner2.org" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            Upload Logo
                          </Button>
                          <Button variant="destructive" size="sm">
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="mt-4">
                      Add New Partner
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="gallery">
              <h2 className="text-2xl font-bold mb-6">Manage Gallery</h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold mb-4">Gallery Item {item}</h3>
                        
                        <div className="space-y-4 mb-6">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Title
                            </label>
                            <Input defaultValue={`Gallery Item ${item}`} />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Description
                            </label>
                            <Textarea 
                              className="min-h-20"
                              defaultValue="Description for this gallery item."
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                Date
                              </label>
                              <Input defaultValue="January 15, 2023" />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                Location
                              </label>
                              <Input defaultValue="Dharamshala, India" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="border-t pt-4 mb-4">
                          <h4 className="text-md font-medium mb-3">Images</h4>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                            {[1, 2, 3].map((imageIndex) => (
                              <div key={imageIndex} className="relative group">
                                <div className="aspect-square bg-gray-200 rounded relative">
                                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                    Image {imageIndex}
                                  </div>
                                  <div className="absolute top-1 right-1 hidden group-hover:flex space-x-1">
                                    <Button variant="destructive" size="icon" className="h-6 w-6">
                                      <X className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <Button variant="outline" size="sm" className="w-full">
                            Add New Image
                          </Button>
                        </div>
                        
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm">
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="mt-6">
                    Add New Gallery Item
                  </Button>
                </div>
                
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="team">
              <h2 className="text-2xl font-bold mb-6">Manage Team Members</h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="aspect-square bg-gray-200 mb-4 relative">
                          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                            Photo Preview
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Full Name
                            </label>
                            <Input defaultValue={`Team Member ${item}`} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Role/Title
                            </label>
                            <Input defaultValue={`Position ${item}`} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Bio
                            </label>
                            <Textarea 
                              className="min-h-24"
                              defaultValue="Short biography for this team member."
                            />
                          </div>
                        </div>
                        <div className="flex justify-between mt-4">
                          <Button variant="outline" size="sm">
                            Upload Photo
                          </Button>
                          <Button variant="destructive" size="sm">
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="mt-6">
                    Add Team Member
                  </Button>
                </div>
                
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="donate">
              <h2 className="text-2xl font-bold mb-6">Manage Donation Settings</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Donation Instructions</h3>
                  <Textarea
                    className="min-h-32"
                    defaultValue="Your generous donations help us continue our mission to support cancer patients and their families. Every contribution makes a difference in the lives of those affected by cancer."
                  />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Payment Methods</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-white rounded-md">
                        <div className="flex items-center">
                          <Input 
                            type="checkbox" 
                            id="paypal" 
                            className="h-4 w-4 mr-2" 
                            defaultChecked
                          />
                          <label htmlFor="paypal">PayPal</label>
                        </div>
                        <Input 
                          placeholder="PayPal Email or Client ID" 
                          className="w-64" 
                          defaultValue="paypal@tibetancancersociety.org"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-white rounded-md">
                        <div className="flex items-center">
                          <Input 
                            type="checkbox" 
                            id="stripe" 
                            className="h-4 w-4 mr-2" 
                            defaultChecked
                          />
                          <label htmlFor="stripe">Stripe</label>
                        </div>
                        <Input 
                          placeholder="Stripe API Key" 
                          className="w-64" 
                          defaultValue="pk_test_123456789"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-white rounded-md">
                        <div className="flex items-center">
                          <Input 
                            type="checkbox" 
                            id="bank" 
                            className="h-4 w-4 mr-2" 
                            defaultChecked
                          />
                          <label htmlFor="bank">Bank Transfer</label>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit Bank Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Suggested Donation Amounts</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Input defaultValue="25" placeholder="Amount 1" />
                    <Input defaultValue="50" placeholder="Amount 2" />
                    <Input defaultValue="100" placeholder="Amount 3" />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="cancer-info">
              <h2 className="text-2xl font-bold mb-6">Manage Cancer Information</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Cancer Types</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-6">
                      <div className="bg-white p-4 rounded-md">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-semibold">Lung Cancer</h4>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="destructive" size="sm">
                              Delete
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Description
                            </label>
                            <Textarea
                              className="min-h-24"
                              defaultValue="Lung cancer begins in the lungs and may spread to lymph nodes or other organs in the body. It is one of the most common cancers worldwide."
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Symptoms (one per line)
                            </label>
                            <Textarea
                              className="min-h-24"
                              defaultValue="Persistent cough
Chest pain
Shortness of breath
Coughing up blood
Unexplained weight loss"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Prevention Tips (one per line)
                            </label>
                            <Textarea
                              className="min-h-24"
                              defaultValue="Avoid smoking and secondhand smoke
Test your home for radon
Avoid carcinogens at work
Eat a diet full of fruits and vegetables
Exercise regularly"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-md">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-semibold">Breast Cancer</h4>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="destructive" size="sm">
                              Delete
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Description
                            </label>
                            <Textarea
                              className="min-h-24"
                              defaultValue="Breast cancer is a disease in which cells in the breast grow out of control. There are different kinds of breast cancer depending on which cells in the breast turn into cancer."
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Symptoms (one per line)
                            </label>
                            <Textarea
                              className="min-h-24"
                              defaultValue="New lump in the breast or underarm
Thickening or swelling of part of the breast
Irritation or dimpling of breast skin
Redness or flaky skin in the nipple area
Nipple discharge other than breast milk"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Prevention Tips (one per line)
                            </label>
                            <Textarea
                              className="min-h-24"
                              defaultValue="Maintain a healthy weight
Exercise regularly
Limit alcohol consumption
Breastfeed if possible
Talk to your doctor about risk assessment"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="mt-6">
                      Add New Cancer Type
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="contact">
              <h2 className="text-2xl font-bold mb-6">Manage Contact Information</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Contact Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Address
                      </label>
                      <Textarea
                        className="min-h-24"
                        defaultValue="123 Main Street, Dharamshala, Himachal Pradesh, India"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <Input defaultValue="+91 1234 567 890" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <Input defaultValue="info@tibetancancersociety.org" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Map Embed Code (Google Maps)
                      </label>
                      <Textarea
                        className="min-h-24"
                        defaultValue="<iframe src='https://maps.google.com/...'></iframe>"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Social Media Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Facebook
                      </label>
                      <Input defaultValue="https://facebook.com/tibetancancersociety" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Twitter
                      </label>
                      <Input defaultValue="https://twitter.com/tibetancancer" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Instagram
                      </label>
                      <Input defaultValue="https://instagram.com/tibetancancersociety" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        YouTube
                      </label>
                      <Input defaultValue="https://youtube.com/c/tibetancancersociety" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Admin;
