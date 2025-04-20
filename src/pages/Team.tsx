import React from 'react';
import PageLayout from '../components/PageLayout';

const teamMembers = [
  {
    id: 1,
    name: 'Tenzin Dorje',
    role: 'Founder & President',
    bio: 'With over 15 years of experience in healthcare and community service, Tenzin has dedicated his life to improving cancer care in the Tibetan community.',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?crop=faces&cs=tinysrgb&fit=crop&h=300&w=300'
  },
  {
    id: 2,
    name: 'Pema Yangchen',
    role: 'Medical Director',
    bio: 'Dr. Pema brings her extensive knowledge in oncology to help guide our medical programs and ensure we provide accurate information to our community.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?crop=faces&cs=tinysrgb&fit=crop&h=300&w=300'
  },
  {
    id: 3,
    name: 'Lobsang Wangdu',
    role: 'Outreach Coordinator',
    bio: 'Lobsang organizes our health camps and educational programs, bringing vital information to remote communities across the region.',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?crop=faces&cs=tinysrgb&fit=crop&h=300&w=300'
  },
  {
    id: 4,
    name: 'Dechen Lhamo',
    role: 'Patient Support Officer',
    bio: 'Dechen works directly with patients and families, providing emotional support and connecting them with resources they need during treatment.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=faces&cs=tinysrgb&fit=crop&h=300&w=300'
  },
  {
    id: 5,
    name: 'Karma Tsering',
    role: 'Administrative Director',
    bio: 'Karma ensures the smooth operation of our organization, managing finances and coordinating with partner organizations.',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?crop=faces&cs=tinysrgb&fit=crop&h=300&w=300'
  },
  {
    id: 6,
    name: 'Choeying Dolma',
    role: 'Fundraising Manager',
    bio: 'Choeying leads our fundraising efforts, developing relationships with donors and organizing events to support our mission.',
    image: 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?crop=faces&cs=tinysrgb&fit=crop&h=300&w=300'
  },
];

const Team = () => {
  return (
    <PageLayout>
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="aspect-square">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            We're always looking for passionate individuals to join our cause. If you're interested in helping us make a difference, please get in touch with us.
          </p>
          <a href="/contact" className="btn-primary">
            Contact Us
          </a>
        </div>
      </section>
    </PageLayout>
  );
};

export default Team;
