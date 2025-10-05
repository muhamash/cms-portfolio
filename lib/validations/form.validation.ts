import { z } from "zod";

const phoneRegex = /^\+?[1-9]\d{1,14}$/;

export const loginSchema = z.object( {
    email: z.string().min( 1, 'Email is required' ).email( 'Invalid email address' ),
    password: z.string().min( 6, 'Password must be at least 6 characters' ),
} );

export const personalInfoSchema = z.object( {
  name: z
    .string()
    .trim()
    .min( 2, { message: "Name must be at least 2 characters" } )
    .max( 100, { message: "Name must be at most 100 characters" } ),

  address: z
    .string()
    .trim()
    .max( 300, { message: "Address must be at most 300 characters" } )
    // .optional()
    // .nullable()
    .transform( ( v ) => ( v === "" ? null : v ) ),

  phone: z
    .string()
    .trim()
    // .optional()
    // .nullable()
    .refine( ( v ) =>
    {
      if ( !v ) return true;
      return phoneRegex.test( v );
    }, { message: "Phone must be a valid international number (e.g. +8801XXXXXXXXX)" } ),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email( { message: "Email must be a valid email address" } )
    .max( 254, { message: "Email is too long" } ),

  title: z
    .string()
    .trim()
    .max( 120, { message: "Title must be at most 120 characters" } )
    // .optional()
    // .nullable()
    .transform( ( v ) => ( v === "" ? null : v ) ),
  image: z
    .union( [
      z.instanceof( File ),        
      z.string().url().nullable(), 
      z.string().base64().nullable(), 
    ] )
    .optional(),
} );


export const updatePersonalInfo = personalInfoSchema.partial().refine( ( data ) => Object.keys( data ).length > 0, {
  message: "At least one field is required to update",
} );

export const socialLinkSchema = z.object( {
  platform: z
    .string()
    .min( 2, "Platform name must be at least 2 characters" )
    .max( 50, "Platform name must be less than 50 characters" ),

  url: z
    .string()
    .url( "Must be a valid URL" )
    .min( 5, "URL must be at least 5 characters" )
} );

export const updateSocialSchema = socialLinkSchema.partial().refine( ( data ) => Object.keys( data ).length > 0, {
  message: "At least one field is required to update",
} );

export const skillSchema = z.object({
  name: z
    .string()
    .min(2, "Skill name must be at least 2 characters long")
    .max(50, "Skill name must be less than 50 characters"),
  
} );

export const headerSchema = z.object({
  headerText: z
    .string()
    .min(2, "Header text must be at least 2 characters")
    .max(100, "Header text too long"),

  headerSubTitle: z
    .string()
    .min(2, "Header subtitle must be at least 2 characters")
    .max(150, "Header subtitle too long"),

  headerAboutText: z
    .string()
    .min(2, "Header about text must be at least 2 characters")
    .max(200, "Header about text too long"),

  headerAboutSubText: z
    .string()
    .min(2, "Header about sub text must be at least 2 characters")
    .max(200, "Header about sub text too long"),

  headerAboutAddress: z
    .string()
    .min(5, "Header address must be at least 5 characters")
    .max(200, "Header address too long"),

  headerAboutSubTitle: z
    .string()
    .min(2, "Header about subtitle must be at least 2 characters")
    .max(150, "Header about subtitle too long"),
} );

export const updateHeaderSchema = headerSchema.partial().refine( ( data ) => Object.keys( data ).length > 0, {
  message: "At least one field is required to update",
} );

export const headerSkillSchema = z.object( {
  skill: z
    .string()
    .min(2, "Skill name must be at least 2 characters long")
    .max(50, "Skill name must be less than 50 characters"),
} )

export const headerStats = z.object( {
  label: z
    .string()
    .min(2, "label name must be at least 2 characters long")
    .max( 50, "label name must be less than 50 characters" ),
  value: z
    .string()
    .min(2, "value name must be at least 20 characters long")
    .max(50, "value name must be less than 50 characters"),
} )

export const updateHeaderStats = headerStats.partial().refine( ( data ) => Object.keys( data ).length > 0, {
  message: "At least one field is required to update",
} );

export const createExperienceSchema = z.object({
  position: z.string().min(1, "Position is required"),
  company: z.string().min(1, "Company is required"),
  description: z.string().optional(),
  timeLine: z.string().min(1, "Timeline is required"),
} );

export const updateExperienceSchema = createExperienceSchema.partial().refine( ( data ) => Object.keys( data ).length > 0, {
  message: "At least one field is required to update",
} );

export const createEducationSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  institute: z.string().min(1, "Institute is required"),
  timeLine: z.string().min(1, "Timeline is required"),
  description: z.string().optional(),
} );

export const updateEducationSchema = createEducationSchema.partial().refine( ( data ) => Object.keys( data ).length > 0, {
  message: "At least one field is required to update",
} );