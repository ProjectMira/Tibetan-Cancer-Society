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
    return <PageLayout><p className="text-center py-16">Loading bank information...</p></PageLayout>;
  }

  if (error) {
    return <PageLayout><p className="text-center py-16 text-red-600">Error loading bank information: {error.message}</p></PageLayout>;
  }

  return (
    <PageLayout>
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
                {/* Actual QR code image - Path remains hardcoded or can be added to JSON too if needed */}
                <img
                  src="/assets/QR.jpeg"
                  alt="UPI QR Code for donations"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-sm text-muted-foreground">Scan to donate via UPI</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Bank Account Details</h3>
                <div className="bg-white p-4 rounded-lg space-y-2">
                   {/* Render fetched bank details */}
                  {bankInfo ? (
                    <>
                      <p><strong>Account Name:</strong> {bankInfo.accountName}</p>
                      <p><strong>Account Number:</strong> {bankInfo.accountNumber}</p>
                      <p><strong>Bank Name:</strong> {bankInfo.bankName}</p>
                      <p><strong>IFSC Code:</strong> {bankInfo.ifscCode}</p>
                      <p><strong>Branch:</strong> {bankInfo.branch}</p>
                    </>
                   ) : (
                     <p>Bank details not available.</p> // Fallback if bankInfo is null after loading
                   )}
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