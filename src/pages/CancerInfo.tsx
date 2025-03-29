
import React, { useState } from 'react';
import PageLayout from '../components/PageLayout';
import { ChevronDown, ChevronUp } from 'lucide-react';

const cancerTypes = [
  {
    id: 'lung',
    name: 'Lung Cancer',
    description: 'Lung cancer begins in the lungs and may spread to lymph nodes or other organs in the body. It is one of the most common cancers worldwide.',
    symptoms: ['Persistent cough', 'Chest pain', 'Shortness of breath', 'Coughing up blood', 'Unexplained weight loss'],
    prevention: ['Avoid smoking and secondhand smoke', 'Test your home for radon', 'Avoid carcinogens at work', 'Eat a diet full of fruits and vegetables', 'Exercise regularly']
  },
  {
    id: 'breast',
    name: 'Breast Cancer',
    description: 'Breast cancer is a disease in which cells in the breast grow out of control. There are different kinds of breast cancer depending on which cells in the breast turn into cancer.',
    symptoms: ['New lump in the breast or underarm', 'Thickening or swelling of part of the breast', 'Irritation or dimpling of breast skin', 'Redness or flaky skin in the nipple area', 'Nipple discharge other than breast milk'],
    prevention: ['Maintain a healthy weight', 'Exercise regularly', 'Limit alcohol consumption', 'Breastfeed if possible', 'Talk to your doctor about risk assessment']
  },
  {
    id: 'colorectal',
    name: 'Colorectal Cancer',
    description: 'Colorectal cancer starts in the colon or the rectum. These cancers can also be called colon cancer or rectal cancer, depending on where they start.',
    symptoms: ['Change in bowel habits', 'Blood in or on stool', 'Diarrhea, constipation, or feeling that the bowel does not empty', 'Abdominal pain or cramps', 'Unexplained weight loss'],
    prevention: ['Get screened regularly', 'Maintain a healthy weight', 'Exercise regularly', 'Eat plenty of fruits, vegetables, and whole grains', 'Limit alcohol consumption']
  },
  {
    id: 'stomach',
    name: 'Stomach Cancer',
    description: 'Stomach cancer, also known as gastric cancer, is a cancer that develops from the lining of the stomach. It can develop in any part of the stomach.',
    symptoms: ['Indigestion and stomach discomfort', 'Feeling bloated after eating', 'Mild nausea', 'Loss of appetite', 'Heartburn'],
    prevention: ['Eat a diet rich in fruits and vegetables', 'Reduce salt intake', 'Don\'t smoke', 'Limit alcohol consumption', 'Get tested for H. pylori infection']
  },
  {
    id: 'liver',
    name: 'Liver Cancer',
    description: 'Liver cancer begins in the cells of the liver. Several types of cancer can form in the liver, but the most common type is hepatocellular carcinoma.',
    symptoms: ['Unintentional weight loss', 'Loss of appetite', 'Upper abdominal pain', 'Nausea and vomiting', 'Weakness and fatigue'],
    prevention: ['Get vaccinated against hepatitis B', 'Maintain a healthy weight', 'Limit alcohol consumption', 'Be cautious with chemicals', 'Get tested for hepatitis']
  },
];

const CancerInfo = () => {
  const [expandedType, setExpandedType] = useState<string | null>(null);
  
  const toggleExpand = (id: string) => {
    if (expandedType === id) {
      setExpandedType(null);
    } else {
      setExpandedType(id);
    }
  };
  
  return (
    <PageLayout 
      title="Cancer Information" 
      description="Learn about different types of cancer, their symptoms, and prevention methods."
    >
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Understanding Cancer</h2>
            <p className="text-muted-foreground mb-4">
              Cancer is a disease in which some of the body's cells grow uncontrollably and spread to other parts of the body. It can start almost anywhere in the human body.
            </p>
            <p className="text-muted-foreground">
              Early detection and treatment are crucial for improving outcomes. Learn about the common types of cancer, their symptoms, and prevention methods below.
            </p>
          </div>
          
          <div className="space-y-4">
            {cancerTypes.map((type) => (
              <div 
                key={type.id} 
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <div 
                  className={`p-6 flex justify-between items-center cursor-pointer ${expandedType === type.id ? 'bg-primary/10' : 'bg-gray-50'}`}
                  onClick={() => toggleExpand(type.id)}
                >
                  <h3 className="text-xl font-semibold">{type.name}</h3>
                  {expandedType === type.id ? (
                    <ChevronUp className="h-5 w-5 text-primary" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-primary" />
                  )}
                </div>
                
                {expandedType === type.id && (
                  <div className="p-6 bg-white">
                    <p className="text-muted-foreground mb-6">{type.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-lg mb-3">Common Symptoms</h4>
                      <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                        {type.symptoms.map((symptom, index) => (
                          <li key={index}>{symptom}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-lg mb-3">Prevention Tips</h4>
                      <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                        {type.prevention.map((tip, index) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Seeking Help</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              If you or someone you know is experiencing symptoms that concern you, it's important to seek medical advice promptly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Talk to a Doctor</h3>
              <p className="text-muted-foreground mb-4">
                Schedule an appointment with your healthcare provider to discuss your symptoms and concerns.
              </p>
              <p className="text-muted-foreground">
                Early detection significantly improves treatment outcomes for most types of cancer.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Support Services</h3>
              <p className="text-muted-foreground mb-4">
                We offer various support services for cancer patients and their families, including counseling and practical assistance.
              </p>
              <p className="text-muted-foreground">
                Contact us to learn more about the support available to you.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Educational Resources</h3>
              <p className="text-muted-foreground mb-4">
                We provide educational materials and workshops to help you understand cancer, treatment options, and care strategies.
              </p>
              <p className="text-muted-foreground">
                Knowledge is power in the fight against cancer.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CancerInfo;
