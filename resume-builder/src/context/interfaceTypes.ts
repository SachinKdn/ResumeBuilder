interface Address {
    address: string;
    pinCode: string;
  }
  
  interface Education {
    institution: string;
    degree: string;
    startDate: Date;
    endDate: Date;
  }
  
  interface Experience {
    company: string;
    role: string;
    startDate: Date;
    endDate: Date;
    responsibilities: string[];
  }
  
  interface Project {
    name: string;
    description: string;
    technologies: string[];
    link: string;
  }
  
  interface SkillSection {
    sectionName: string;
  subCategories: {
    categoryName: string;
    skills: string[];
  }[];
  }
  
  interface SocialMedia {
    linkedin: {
        name: string;
        link: string
    };
    github: {
        name: string;
        link: string
    };
    website: {
        name: string;
        link: string
    };
  }
  
  export interface IResume {
    isLightTheme: boolean;
    title: string;
    username: string;
    useremail: string;
    fullname: string;
    email: string;
    phoneNumber: string;
    address: Address;
    jobRole: string;
    education: Education[];
    experience: Experience[];
    projects: Project[];
    skills: SkillSection[];
    socialMedia: SocialMedia;
  }