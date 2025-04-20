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
            <div className="flex flex-col items-center mb-6 md:mb-8">
              <div className="w-48 h-48 md:w-64 md:h-64 bg-white p-3 md:p-4 rounded-lg shadow-sm mb-3 md:mb-4">
                {/* Actual QR code image */}
                <img
                  src="/assets/QR.jpeg"
                  alt="UPI QR Code for donations"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">Scan to donate via UPI</p>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div>
                <h3 className="text-base md:text-lg font-semibold mb-2">Bank Account Details</h3>
                <div className="bg-white p-3 md:p-4 rounded-lg space-y-1 md:space-y-2 text-sm md:text-base">
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
                <h3 className="text-base md:text-lg font-semibold mb-2">Important Note</h3>
                <p className="text-muted-foreground text-xs md:text-sm">
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