
import React from 'react';
import PageLayout from '../components/PageLayout';
import { Check, ArrowRight } from 'lucide-react';

const Donate = () => {
  return (
    <PageLayout 
      title="Support Our Cause" 
      description="Your generous donations help us continue our mission to support cancer patients and their families."
    >
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">How Your Donation Helps</h2>
            <p className="text-muted-foreground">
              Every contribution makes a difference in the lives of those affected by cancer. Your support enables us to provide essential services, education, and resources to our community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Patient Support</h3>
              <p className="text-muted-foreground mb-4">
                Your donations help provide direct assistance to cancer patients, including transportation to medical appointments, accommodation during treatment, and essential supplies.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-muted-foreground">Transportation assistance</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-muted-foreground">Accommodation during treatment</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-muted-foreground">Essential medical supplies</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Education & Awareness</h3>
              <p className="text-muted-foreground mb-4">
                Support our efforts to educate the community about cancer prevention, early detection, and treatment options through workshops, materials, and outreach programs.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-muted-foreground">Educational workshops</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-muted-foreground">Information materials</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-muted-foreground">Community outreach programs</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Health Camps</h3>
              <p className="text-muted-foreground mb-4">
                Help us organize health camps in remote areas to provide cancer screenings, awareness, and connect people with healthcare resources.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-muted-foreground">Mobile screening services</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-muted-foreground">Medical consultations</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-muted-foreground">Resource distribution</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-primary/10">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Ways to Donate</h2>
              <p className="text-muted-foreground mb-8">
                We offer several convenient options for you to support our cause. All donations are tax-deductible.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">One-Time Donation</h3>
                  <p className="text-muted-foreground mb-4">
                    Make a single contribution of any amount to support our programs and services.
                  </p>
                  <button className="btn-primary">
                    Donate Now <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">Monthly Giving</h3>
                  <p className="text-muted-foreground mb-4">
                    Become a sustaining supporter by setting up a recurring monthly donation.
                  </p>
                  <button className="btn-primary">
                    Become a Monthly Donor <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">Bank Transfer</h3>
                  <p className="text-muted-foreground mb-4">
                    Make a direct transfer to our bank account:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-md text-sm">
                    <p className="mb-1"><span className="font-medium">Bank Name:</span> Tibet National Bank</p>
                    <p className="mb-1"><span className="font-medium">Account Name:</span> Tibetan Cancer Society</p>
                    <p className="mb-1"><span className="font-medium">Account Number:</span> 123456789012</p>
                    <p><span className="font-medium">IFSC Code:</span> TNBL0001234</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-6">Donate Now</h3>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium mb-2">
                      Select Amount
                    </label>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <button type="button" className="px-4 py-2 border border-primary text-primary rounded-md font-medium hover:bg-primary/5">
                        $25
                      </button>
                      <button type="button" className="px-4 py-2 border border-primary bg-primary/10 text-primary rounded-md font-medium">
                        $50
                      </button>
                      <button type="button" className="px-4 py-2 border border-primary text-primary rounded-md font-medium hover:bg-primary/5">
                        $100
                      </button>
                    </div>
                    <input
                      type="text"
                      id="amount"
                      name="amount"
                      placeholder="Other Amount"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Donation Type
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="donationType"
                          value="oneTime"
                          defaultChecked
                          className="mr-2"
                        />
                        One-time
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="donationType"
                          value="monthly"
                          className="mr-2"
                        />
                        Monthly
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                  
                  <button type="submit" className="w-full btn-primary">
                    Proceed to Payment
                  </button>
                  
                  <div className="text-center text-sm text-muted-foreground">
                    <p>Secure payment powered by Stripe</p>
                    <p className="mt-2">All donations are tax-deductible</p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Donate;
