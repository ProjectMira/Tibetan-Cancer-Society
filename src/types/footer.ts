export interface FooterData {
  organization: {
    name: string;
    description: string;
    socialMedia: Array<{
      platform: string;
      url: string;
    }>;
  };
  contact: {
    mainAddress: string;
    delhiAddress: string;
    southAddress: string;
    phone: string;
    landline: string;
    email: string;
  };
}
