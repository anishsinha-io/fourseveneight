//Implements database schema for profiles

import { Schema, model, Document } from "mongoose";
export interface IExperience {
  title?: string;
  company?: string;
  location?: string;
  from?: Date;
  to?: Date;
  current?: boolean;
  description?: string;
  slug?: string;
}
export interface IEducation {
  school?: string;
  degree?: string;
  fieldOfStudy?: string;
  from?: Date;
  to?: Date;
  current?: boolean;
  description?: string;
  slug?: string;
}
export interface ISocial {
  youtube?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  tiktok?: string;
}

export interface IProfile extends Document {
  user: Schema.Types.ObjectId;
  photo?: string;
  company?: string;
  website?: string;
  location?: string;
  status?: string;
  skills?: string[];
  bio?: string;
  githubUsername?: string;
  experience?: IExperience[];
  education?: IEducation[];
  social?: ISocial;
  date?: Date;
}

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
  },
  skills: {
    type: [String],
  },
  bio: {
    type: String,
  },
  githubUsername: {
    type: String,
  },
  experience: {
    type: [
      {
        title: {
          type: String,
          required: true,
        },
        company: {
          type: String,
          required: true,
        },
        location: {
          type: String,
        },
        from: {
          type: Date,
        },
        to: {
          type: Date,
        },
        current: {
          type: Boolean,
          default: false,
        },
        description: {
          type: String,
        },
        slug: {
          type: String,
        },
      },
    ],

    required: false,
  },

  education: {
    type: [
      {
        school: {
          type: String,
          required: true,
        },
        degree: {
          type: String,
          required: true,
        },
        fieldOfStudy: {
          type: String,
          required: true,
        },
        from: {
          type: Date,
          required: true,
        },
        to: {
          type: Date,
        },
        current: {
          type: Boolean,
          default: false,
        },
        description: {
          type: String,
        },
        slug: {
          type: String,
          unique: true,
        },
        required: false,
      },
    ],
    required: false,
  },
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
    tiktok: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Profile = model<IProfile>("Profile", profileSchema);

export default Profile;
