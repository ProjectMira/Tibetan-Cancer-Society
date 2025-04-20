import React, { useState, useEffect } from 'react';
import PageLayout from '../components/PageLayout';

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch('/assets/data/teammembers.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTeamMembers(data);
      } catch (error) {
        setError(error);
        console.error("Failed to fetch team members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []); // Empty dependency array means this effect runs once on mount

  const handleCardClick = (member) => setSelectedMember(member);
  const handleCloseModal = () => setSelectedMember(null);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedMember]);

  if (loading) {
    return <PageLayout><div className="flex justify-center items-center min-h-[50vh]"><p className="text-lg">Loading team members...</p></div></PageLayout>;
  }

  if (error) {
    return <PageLayout><div className="flex justify-center items-center min-h-[50vh]"><p className="text-lg text-red-500">Error loading team members: {error.message}</p></div></PageLayout>;
  }

  return (
    <PageLayout>
      <section className="pt-2 pb-10 bg-white">
        <div className="section-container px-4 md:px-6">
          {selectedMember ? (
            // --- Detailed View (Modal) ---
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
              onClick={handleCloseModal}
            >
              <div
                className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-4 md:p-10 relative flex flex-col items-center overflow-y-auto max-h-[90vh] m-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm"
                  aria-label="Close"
                >
                  &times;
                </button>
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-lg border shadow-md mb-4 md:mb-6"
                />
                <h3 className="text-2xl md:text-3xl font-bold mb-2 text-center">{selectedMember.name}</h3>
                <p className="text-primary font-semibold mb-4 text-base md:text-lg text-center">{selectedMember.role}</p>
                <p className="text-muted-foreground whitespace-pre-line text-sm md:text-base text-center px-2 md:px-0">{selectedMember.message}</p>
              </div>
            </div>
          ) : (
            // --- Grid View ---
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleCardClick(member)}
                >
                  <div className="aspect-square">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold">{member.name}</h3>
                    <p className="text-primary font-medium mb-0 text-sm md:text-base">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Team;