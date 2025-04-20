
import React from 'react';
import PageLayout from '../components/PageLayout';

const Donate = () => {
  return (
    <PageLayout 
      title="Donate" 
      description="Support our mission by making a donation to the Tibetan Cancer Society"
    >
      <section className="py-16 bg-white">
        <div className="section-container max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Support Our Cause</h2>
            <p className="text-muted-foreground">
              Your donation helps us provide support and resources to cancer patients and their families in the Tibetan community.
            </p>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg shadow-sm mb-8">
            <div className="flex flex-col items-center mb-8">
              <div className="w-64 h-64 bg-white p-4 rounded-lg shadow-sm mb-4">
                {/* Placeholder for QR Code - In a real app, replace with actual QR code image */}
                <div className="w-full h-full border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                  <span className="text-gray-400">QR Code</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Scan to donate via UPI</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Bank Account Details</h3>
                <div className="bg-white p-4 rounded-lg space-y-2">
                  <p><strong>Account Name:</strong> Tibetan Cancer Society</p>
                  <p><strong>Account Number:</strong> XXXX XXXX XXXX 1234</p>
                  <p><strong>Bank Name:</strong> State Bank of India</p>
                  <p><strong>IFSC Code:</strong> SBIN0123456</p>
                  <p><strong>Branch:</strong> Dharamshala</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Important Note</h3>
                <p className="text-muted-foreground">
                  After making your donation, please keep your transaction reference number for our records. 
                  All donations to the Tibetan Cancer Society are tax-deductible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Donate;
