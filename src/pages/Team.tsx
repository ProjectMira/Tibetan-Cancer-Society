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

  if (loading) {
    return <PageLayout><p>Loading team members...</p></PageLayout>;
  }

  if (error) {
    return <PageLayout><p>Error loading team members: {error.message}</p></PageLayout>;
  }

  return (
    <PageLayout>
      <section className="pt-2 pb-10 bg-white">
        <div className="section-container">
          {selectedMember ? (
            // --- Detailed View (Modal) ---
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
              onClick={handleCloseModal}
            >
              <div
                className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-10 relative flex flex-col items-center overflow-y-auto max-h-full" // Added overflow-y-auto and max-h-full
                onClick={(e) => e.stopPropagation()}
              >
                 <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
                  aria-label="Close"
                 >
                  &times; {/* This is a common way to represent a close 'X' button */}
                </button>
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="w-48 h-48 object-cover rounded-lg border shadow-md mb-6"
                />
                <h3 className="text-3xl font-bold mb-2 text-center">{selectedMember.name}</h3> {/* Added text-center */}
                <p className="text-primary font-semibold mb-4 text-lg text-center">{selectedMember.role}</p> {/* Added text-center */}
                <p className="text-muted-foreground whitespace-pre-line text-base text-center">{selectedMember.message}</p> {/* Added text-center */}
              </div>
            </div>
          ) : (
            // --- Grid View ---
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-primary font-medium mb-0">{member.role}</p>
                    {/* Message is not displayed in the grid view */}
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