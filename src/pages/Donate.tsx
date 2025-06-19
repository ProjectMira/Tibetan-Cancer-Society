import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import PageLayout from '../components/PageLayout';

const Donate = () => {
  const [bankInfo, setBankInfo] = useState(null); // State to hold fetched bank data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchBankInfo = async () => {
      try {
        // Fetch data from the JSON file
        const response = await fetch('/assets/data/bankinfo.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBankInfo(data.bankDetails); // Update state with fetched bank details
      } catch (error) {
        setError(error); // Set error state if fetch fails
        console.error("Failed to fetch bank information:", error);
      } finally {
        setLoading(false); // Set loading to false after fetch attempt
      }
    };

    fetchBankInfo();
  }, []); // Empty dependency array ensures this runs only once on mount

  // --- Rendering Logic ---
  if (loading) {
    return <PageLayout>
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-center py-8 text-lg">Loading bank information...</p>
      </div>
    </PageLayout>;
  }

  if (error) {
    return <PageLayout>
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-center py-8 text-lg text-red-600">Error loading bank information: {error.message}</p>
      </div>
    </PageLayout>;
  }

  return (
    <PageLayout>
      <section className="py-8 md:py-16 bg-white">
        <div className="section-container max-w-3xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Support Our Cause</h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Your donation helps us provide support and resources to cancer patients and their families in the Tibetan community.
            </p>
          </div>

          <div className="bg-gray-50 p-4 md:p-8 rounded-lg shadow-sm mb-6 md:mb-8">
            <div className="space-y-4 md:space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Bank Account Details</h3>
                <div className="bg-white p-6 rounded-lg space-y-3 text-base shadow-sm">
                  {bankInfo ? (
                    <>
                      <p className="flex justify-between border-b pb-2">
                        <strong>Account Name:</strong>
                        <span>{bankInfo.accountName}</span>
                      </p>
                      <p className="flex justify-between border-b pb-2">
                        <strong>Account Number:</strong>
                        <span>{bankInfo.accountNumber}</span>
                      </p>
                      <p className="flex justify-between border-b pb-2">
                        <strong>Bank Name:</strong>
                        <span>{bankInfo.bankName}</span>
                      </p>
                      <p className="flex justify-between border-b pb-2">
                        <strong>IFSC Code:</strong>
                        <span>{bankInfo.ifscCode}</span>
                      </p>
                      <p className="flex justify-between pb-2">
                        <strong>Branch:</strong>
                        <span>{bankInfo.branch}</span>
                      </p>
                    </>
                  ) : (
                    <p>Bank details not available.</p>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Important Note</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  After making your donation, please keep your transaction reference number for our records.
                  All donations to the Tibetan Cancer Society are tax-deductible.
                </p>
              </div>
            </div>
          </div>

          {/* Government Certifications Section */}
          <div className="bg-gray-50 p-4 md:p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-6 text-center">Government Certifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* 12A Certificate */}
              <div className="text-center">
                <h4 className="text-lg font-medium mb-4 text-gray-800">12A Tax Exemption Certificate</h4>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <img 
                    src="/assets/about-images/12a10.png" 
                    alt="12A Tax Exemption Certificate" 
                    className="w-full h-auto rounded-md border border-gray-200"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Registered under Section 12A of the Income Tax Act
                </p>
              </div>

              {/* 80G Certificate */}
              <div className="text-center">
                <h4 className="text-lg font-medium mb-4 text-gray-800">80G Tax Deduction Certificate</h4>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <img 
                    src="/assets/about-images/80g11.png" 
                    alt="80G Tax Deduction Certificate" 
                    className="w-full h-auto rounded-md border border-gray-200"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Donations eligible for 50% tax deduction under Section 80G
                </p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <p className="text-center text-sm text-green-800">
                <strong>Tax Benefits:</strong> Your donations are eligible for tax deductions as per Indian Income Tax regulations. 
                Please consult your tax advisor for specific deduction amounts.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Donate;