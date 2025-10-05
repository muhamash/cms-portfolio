import z from "zod";
import { createEducationSchema, createExperienceSchema, headerSchema, headerSkillSchema, headerStats, personalInfoSchema, skillSchema, socialLinkSchema, updateEducationSchema, updateExperienceSchema, updateHeaderSchema, updateHeaderStats, updatePersonalInfo, updateSocialSchema } from "../validations/form.validation";


export type PersonalInfoInput = z.infer<typeof personalInfoSchema>;
export type UpdatePersonalInfo = z.infer<typeof updatePersonalInfo>;

export type SocialLinkTypes = z.infer<typeof socialLinkSchema>;
export type UpdateSocialLinkTypes = z.infer<typeof updateSocialSchema>;

export type SkillTypes = z.infer<typeof skillSchema>;

export type HomePageTypes = z.infer<typeof headerSchema>;
export type UpdateHomePageTypes = z.infer<typeof updateHeaderSchema>;

export type HeaderSkillTypes = z.infer<typeof headerSkillSchema>

export type HeaderStatsType = z.infer<typeof headerStats>;
export type UpdateHeaderStatsType = z.infer<typeof updateHeaderStats>;

export type CreateExperienceInput = z.infer<typeof createExperienceSchema>;
export type UpdateExperienceInput = z.infer<typeof updateExperienceSchema>;

export type CreateEducationInput = z.infer<typeof createEducationSchema>;
export type UpdateEducationInput = z.infer<typeof updateEducationSchema>;