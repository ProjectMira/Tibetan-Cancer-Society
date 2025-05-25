import React, { useState, useEffect } from 'react';
import { X, Phone, Mail, MapPin } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  const [contactInfo, setContactInfo] = useState({
    phone: '',
    email: '',
    mainAddress: ''
  });

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch('/assets/data/footer.json');
        const data = await response.json();
        setContactInfo({
          phone: data.contact.phone,
          email: data.contact.email,
          mainAddress: data.contact.mainAddress
        });
      } catch (error) {
        console.error('Error fetching contact info:', error);
      }
    };

    fetchContactInfo();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Help</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-gray-700 mb-6">
            The Tibetan Cancer Society provides information and support for people dealing with cancer. 
            We connect you with resources, guidance, and compassionate care to help you through your cancer journey.
          </p>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">How We Can Help</h3>
            <ul className="space-y-2 list-disc pl-5 text-gray-700">
              <li>Referrals to patient-related programs and resources</li>
              <li>Donations, fundraising, or event-related assistance</li>
              <li>Cancer awareness and prevention information</li>
              <li>Volunteer opportunities</li>
              <li>Support for patients and families</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-medium mb-3">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-primary mt-0.5 mr-3" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-700">{contactInfo.phone}</p>
                  <p className="text-sm text-gray-500">Available during business hours</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-primary mt-0.5 mr-3" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-700">{contactInfo.email}</p>
                  <p className="text-sm text-gray-500">We'll respond as soon as possible</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mt-0.5 mr-3" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-gray-700">{contactInfo.mainAddress}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <p className="text-gray-500 text-sm">
              For medical questions, we encourage you to consult with your doctor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
