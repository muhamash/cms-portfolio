"use client"

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createEducation, createExperience, createPersonalInfo, createSkill, createSocialLink, deleteEducation, deleteExperience, deleteSkill, deleteSocialLink, updateEducation, updateExperience, updatePersonalInfo, updateSkill, updateSocialLink } from '@/lib/utils/profile.utils';
import { Education, EducationManager } from '@/modules/pages/dashboard/profile/EducationForm';
import { Experience, ExperienceManager } from '@/modules/pages/dashboard/profile/ExperienceForm';
import { PersonalInfoForm } from '@/modules/pages/dashboard/profile/ManageProfile';
import { SkillsManager } from '@/modules/pages/dashboard/profile/SkillsManager';
import { SocialLinksManager } from '@/modules/pages/dashboard/profile/SocialLinksManager';
import { useState } from 'react';
import toast from 'react-hot-toast';



export default function ProfileManagerParent({defaultPersonalInfo}: any) {

    const [ successMessage, setSuccessMessage ] = useState( '' );
  
    console.log(defaultPersonalInfo)

    const showSuccess = ( message ) =>
    {
        setSuccessMessage( message );
        setTimeout( () => setSuccessMessage( '' ), 3000 );
    };

    // personal info submission
    const onSubmitPersonal = async ( data ) =>
    {
        // console.log( 'Personal Info submitted:', data );
        let result
        
        if ( defaultPersonalInfo?.id )
        {
            result = await updatePersonalInfo( data, defaultPersonalInfo?.id )
        }
        else
        {
            result = await createPersonalInfo( data )
        }
            
        if ( !result.success )
        {
            toast.error( result.message || "Failed to create personal info" )
        }

        toast.success( result.message )
        showSuccess( 'Personal information updated successfully!' );

        
    };

    // social links
    const onCreateSocialLink = async ( data ) =>
    {
        console.log( 'Creating social link:', data );
        
        const result = await createSocialLink( data )
        
        if ( !result.success )
        {
            toast.error(result.message)
        }
        else
        {
            showSuccess( 'Social link added successfully!' );
            toast.success(result.message)
        }
    };

    const onUpdateSocialLink = async (  id , data) =>
    {
        
        const result = await updateSocialLink(  id, data )
        
        if ( !result.success )
        {
            toast.error(result.message)
        }
        else
        {
            showSuccess( 'Social link updated successfully!' );
            toast.success(result.message)
        }
    };

    const onDeleteSocialLink = async ( id ) =>
    {
        
        const result = await deleteSocialLink(  id )
        
        if ( !result.success )
        {
            toast.error(result.message)
        }
        else
        {
            showSuccess( 'Social link deleted successfully!' );
            toast.success(result.message)
        }
    };

    // skills
    const onCreateSkill = async ( data ) =>
    {
        console.log( 'Creating skill:', data );
        const result = await createSkill( data )
        console.log(result)
        
        if ( result.success )
        {
            showSuccess( 'Skill added successfully!' );
            toast.success(result.message)
        }
        else
        {
            toast.error( result.message )
        }
    };

    const onUpdateSkill = async (id, data ) =>
    {
        console.log( 'updating skill:', data, id );
        const result = await updateSkill( id, data )
        // console.log(result)
        
        if ( result.success )
        {
            showSuccess( 'Skill updated successfully!' );
            toast.success(result.message)
        }
        else
        {
            toast.error( result.message )
        }
    };

    const onDeleteSkill = async ( id ) =>
    {
        console.log( 'Deleting skill:', id );
        const result = await deleteSkill( id )
        // console.log(result)
        
        if ( result.success )
        {
            showSuccess( 'Skill deleted successfully!' );
            toast.success( result.message )
        }
        else
        {
            toast.error( result.message )
        }
    };


    // experience
    const onCreateExperience = async ( data: Omit<Experience, "id"> ) =>
    {
        console.log( "Experience create:", data );
        const result = await createExperience( data )
        
        if ( !result.success )
        {
            toast.error(result.message)
        }
        else
        {
            showSuccess( 'Experience added successfully!' );
            toast.success(result.message)
        }
    };

    const onUpdateExperience = async ( id: number, data: Omit<Experience, "id"> ) =>
    {
        console.log( "Experience update:", id, data );
        const result = await updateExperience( id, data )
        
        if ( !result.success )
        {
            toast.error(result.message)
        }
        else
        {
            showSuccess( 'Experience updated successfully!' );
            toast.success(result.message)
        }
    };

    const onDeleteExperience = async ( id: number ) =>
    {
        console.log( "Experience delete:", id );
        const result = await deleteExperience( id )
        
        if ( !result.success )
        {
            toast.error(result.message)
        }
        else
        {
            showSuccess( 'Experience deleted successfully!' );
            toast.success(result.message)
        }
    };


    // education
    const onCreateEducation = async ( data: Omit<Education, "id"> ) =>
    {
        console.log( "Education create:", data );
        const result = await createEducation( data )
        
        if ( !result.success )
        {
            toast.error(result.message)
        }
        else
        {
            showSuccess( ' education added successfully!' );
            toast.success(result.message)
        }
    };

    const onUpdateEducation = async ( id: number, data: Omit<Education, "id"> ) =>
    {
        console.log( "Education update:", id, data );
        const result = await updateEducation( id , data)
        
        if ( !result.success )
        {
            toast.error(result.message)
        }
        else
        {
            showSuccess( 'education updated successfully!' );
            toast.success(result.message)
        }
    };

    const onDeleteEducation = async ( id: number ) =>
    {
        console.log( "Education delete:", id );
        const result = await deleteEducation( id )
        
        if ( !result.success )
        {
            toast.error(result.message)
        }
        else
        {
            showSuccess( 'education deleted successfully!' );
            toast.success(result.message)
        }
    };

    return (
        <>
            {successMessage && (
                <Alert className="bg-green-50 border-green-200">
                    <AlertDescription className="text-green-800">
                        {successMessage}
                    </AlertDescription>
                </Alert>
            )}

            <Tabs defaultValue="personal" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="social">Social</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                </TabsList>

                <TabsContent value="personal">
                    <PersonalInfoForm
                        defaultValues={defaultPersonalInfo}
                        onSubmit={onSubmitPersonal} />
                </TabsContent>

                <TabsContent value="social">
                    <SocialLinksManager
                        initialLinks={defaultPersonalInfo.socialLinks}
                        onCreate={onCreateSocialLink}
                        onUpdate={onUpdateSocialLink}
                        onDelete={onDeleteSocialLink}
                    />
                </TabsContent>

                <TabsContent value="skills">
                    <SkillsManager
                        initialSkills={defaultPersonalInfo.skills}
                        onCreate={onCreateSkill}
                        onUpdate={onUpdateSkill}
                        onDelete={onDeleteSkill}
                    />
                </TabsContent>

                <TabsContent value="experience">
                    <ExperienceManager
                        initialExperiences={defaultPersonalInfo.experiences}
                        onDelete={onDeleteExperience}
                        onCreate={onCreateExperience}
                        onUpdate={onUpdateExperience}
                    />
                </TabsContent>

                <TabsContent value="education">
                    <EducationManager
                        initialEducation={defaultPersonalInfo.education}
                        onCreate={onCreateEducation}
                        onDelete={onDeleteEducation}
                        onUpdate={onUpdateEducation}
                    />
                </TabsContent>
            </Tabs>
        </>
    );
}