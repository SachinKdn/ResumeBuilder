import mongoose from "mongoose";
import { type BaseSchema } from "./index";


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
    skills: string[];
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
  

const Schema = mongoose.Schema;
// Address Schema
const AddressSchema = new Schema<Address>({
    address: { type: String,  default:"" },
    pinCode: { type: String,  default:"" }
  });

// Education Schema
const EducationSchema = new Schema<Education>({
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
  });

// Experience Schema
const ExperienceSchema = new Schema<Experience>({
    company: { type: String, required: true },
    role: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    responsibilities: [{ type: String, required: true }],
    skills: [{ type: String, required: true }]
  });

  // Project Schema
const ProjectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    technologies: [{ type: String, required: true }],
    link: { type: String, required: true },
  });

// SkillSection Schema
const SkillSectionSchema = new mongoose.Schema({
    sectionName: {
      type: String,
      required: true
    },
    subCategories: [{
      categoryName: {
        type: String,
        required: true
      },
      skills: [{
        type: String,
        required: true
      }]
    }]
  });

// SocialMedia Schema
const SocialMediaSchema = new Schema({
    linkedin: {
        name: {
          type: String, default:""
        },
        link: {
          type: String, default:""
        }
      },
      github: {
        name: {
          type: String, default:""
        },
        link: {
          type: String, default:""
        }
      },
      website: {
        name: {
          type: String, default:""
        },
        link: {
          type: String, default:""
        }
      }
  });

// User Schema
const ResumeSchema = new Schema<IResume>({
    isLightTheme: {type: Boolean, default: true},
    title: { type: String, required: true },
    username: { type: String, required: true },
    useremail: { type: String, required: true},
    fullname: { type: String,  default:"" },
    email: { type: String,  unique: true , default:""},
    phoneNumber: { type: String,  default:""},
    address: { type: AddressSchema, default: () => ({})},
    jobRole: { type: String,  default:""},
    education: { type: [EducationSchema], required: true },
    experience: { type: [ExperienceSchema], required: true },
    projects: { type: [ProjectSchema], required: true },
    skills: { type: [SkillSectionSchema], required: true },
    socialMedia: { type: SocialMediaSchema, default: () => ({}) }
  });




  export default mongoose.model<IResume>("resume", ResumeSchema);