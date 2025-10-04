"use client"

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Education, EducationManager } from '@/modules/pages/dashboard/profile/EducationForm';
import { Experience, ExperienceManager } from '@/modules/pages/dashboard/profile/ExperienceForm';
import { PersonalInfoForm } from '@/modules/pages/dashboard/profile/ManageProfile';
import { SkillsManager } from '@/modules/pages/dashboard/profile/SkillsManager';
import { SocialLinksManager } from '@/modules/pages/dashboard/profile/SocialLinksManager';
import { useState } from 'react';

const defaultPersonalInfo = {
  image: '',
  name: 'John Doe',
  address: '123 Main St, City, Country',
  phone: '+1234567890',
  email: 'john.doe@example.com',
  title: 'Full Stack Developer'
};

const existingSocialLinks = [
  { id: 1, platform: 'LinkedIn', url: 'https://linkedin.com/in/johndoe' },
  { id: 2, platform: 'GitHub', url: 'https://github.com/johndoe' }
];

const existingSkills = [
  { id: 1, name: 'React' },
  { id: 2, name: 'TypeScript' },
  { id: 3, name: 'Node.js' }
];

const defaultExperiences: Experience[] = [
    {
        position: 'Senior Developer',
        company: 'Tech Corp',
        timeLine: '2020 - Present',
        description: 'Leading development of web applications',
    },
];

const defaultEducation: Education[] = [
    {
        degree: 'Computer Science',
        institute: 'University of Technology',
        timeLine: '2015 - 2019',
        description: 'Bachelor of Science in Computer Science'
    }
];

export default function ProfileManagerParent() {

    const [ successMessage, setSuccessMessage ] = useState( '' );
  

    const showSuccess = ( message ) =>
    {
        setSuccessMessage( message );
        setTimeout( () => setSuccessMessage( '' ), 3000 );
    };

    const onSubmitPersonal = async ( data ) =>
    {
        console.log( 'Personal Info submitted:', data );
        // API call: await fetch('/api/personal-info', { method: 'POST', body: JSON.stringify(data) });
        showSuccess( 'Personal information updated successfully!' );
    };

    const onCreateSocialLink = async ( data ) =>
    {
        console.log( 'Creating social link:', data );
        // API call: const response = await fetch('/api/social-links', { method: 'POST', body: JSON.stringify(data) });
    
        showSuccess( 'Social link added successfully!' );
    };

    const onUpdateSocialLink = async ( data ) =>
    {
        console.log( 'Updating social link:', data );
        // API call: await fetch(`/api/social-links/${editingSocial}`, { method: 'PUT', body: JSON.stringify(data) });
    
        showSuccess( 'Social link updated successfully!' );
    };

    const onDeleteSocialLink = async ( id ) =>
    {
        console.log( 'Deleting social link:', id );
        // API call: await fetch(`/api/social-links/${id}`, { method: 'DELETE' });
    
        showSuccess( 'Social link deleted successfully!' );
    };

    const onCreateSkill = async ( data ) =>
    {
        console.log( 'Creating skill:', data );
        // API call: const response = await fetch('/api/skills', { method: 'POST', body: JSON.stringify(data) });
    
        showSuccess( 'Skill added successfully!' );
    };

    const onUpdateSkill = async ( data ) =>
    {
        console.log( 'Updating skill:', data );
        // API call: await fetch(`/api/skills/${editingSkill}`, { method: 'PUT', body: JSON.stringify(data) });
    
        showSuccess( 'Skill updated successfully!' );
    };

    const onDeleteSkill = async ( id ) =>
    {
        console.log( 'Deleting skill:', id );
        // API call: await fetch(`/api/skills/${id}`, { method: 'DELETE' });
    
        showSuccess( 'Skill deleted successfully!' );
    };


    const onCreateExperience = async ( data: Omit<Experience, "id"> ) =>
    {
        console.log( "Experience create:", data );
        // API call: await fetch('/api/experiences', { method: 'POST', body: JSON.stringify(data) });
        showSuccess( "Work experience created successfully!" );
    };

    const onUpdateExperience = async ( id: number, data: Omit<Experience, "id"> ) =>
    {
        console.log( "Experience update:", id, data );
        // API call: await fetch(`/api/experiences/${id}`, { method: 'PUT', body: JSON.stringify(data) });
        showSuccess( "Work experience updated successfully!" );
    };

    const onDeleteExperience = async ( id: number ) =>
    {
        console.log( "Experience delete:", id );
        // API call: await fetch(`/api/experiences/${id}`, { method: 'DELETE' });
        showSuccess( "Work experience deleted successfully!" );
    };


    const onCreateEducation = async ( data: Omit<Education, "id"> ) =>
    {
        console.log( "Education create:", data );
        // API call: await fetch('/api/experiences', { method: 'POST', body: JSON.stringify(data) });
        showSuccess( "Work Education created successfully!" );
    };

    const onUpdateEducation = async ( id: number, data: Omit<Education, "id"> ) =>
    {
        console.log( "Education update:", id, data );
        // API call: await fetch(`/api/experiences/${id}`, { method: 'PUT', body: JSON.stringify(data) });
        showSuccess( "Work Education updated successfully!" );
    };

    const onDeleteEducation = async ( id: number ) =>
    {
        console.log( "Education delete:", id );
        // API call: await fetch(`/api/experiences/${id}`, { method: 'DELETE' });
        showSuccess( "Work Education deleted successfully!" );
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
                        initialLinks={existingSocialLinks}
                        onCreate={onCreateSocialLink}
                        onUpdate={onUpdateSocialLink}
                        onDelete={onDeleteSocialLink}
                    />
                </TabsContent>

                <TabsContent value="skills">
                    <SkillsManager
                        initialSkills={existingSkills}
                        onCreate={onCreateSkill}
                        onUpdate={onUpdateSkill}
                        onDelete={onDeleteSkill}
                    />
                </TabsContent>

                <TabsContent value="experience">
                    <ExperienceManager
                        initialExperiences={defaultExperiences}
                        onDelete={onDeleteExperience}
                        onCreate={onCreateExperience}
                        onUpdate={onUpdateExperience}
                    />
                </TabsContent>

                <TabsContent value="education">
                    <EducationManager
                        initialEducation={defaultEducation}
                        onCreate={onCreateEducation}
                        onDelete={onDeleteEducation}
                        onUpdate={onUpdateEducation}
                    />
                </TabsContent>
            </Tabs>
        </>
    );
}