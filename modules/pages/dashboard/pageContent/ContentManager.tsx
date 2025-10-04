"use client"


import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { HeaderSkillsManager } from './HeaderSkillsManager';
import { HomePageStatsManager } from './HomePageStatsManager';
import { HomePageForm } from './HomePageForm';


const defaultHomePage = {
  headerText: 'Welcome to My Portfolio',
  headerSubTitle: 'Full Stack Developer',
  headerAboutText: 'About Me',
  headerAboutSubText: 'Passionate developer with 5+ years of experience',
  headerAboutAddress: '123 Main St, City, Country',
  headerAboutSubTitle: 'Building amazing web applications'
};

const initialHeaderSkills = [
  { id: 1, skill: 'React', homePageId: 1 },
  { id: 2, skill: 'TypeScript', homePageId: 1 },
  { id: 3, skill: 'Node.js', homePageId: 1 }
];

const initialHomePageStats = [
  { id: 1, label: 'Projects Completed', value: '50+', homePageId: 1 },
  { id: 2, label: 'Happy Clients', value: '30+', homePageId: 1 },
  { id: 3, label: 'Years Experience', value: '5+', homePageId: 1 }
];

export default function ManageHomePage() {
  const [successMessage, setSuccessMessage] = useState('');

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // HomePage Form Handlers
  const handleHomePageSubmit = async (data: any) => {
    console.log('HomePage submitted:', data);
    // API call: await fetch('/api/homepage', { method: 'PUT', body: JSON.stringify(data) });
    showSuccess('HomePage information updated successfully!');
  };

  // Header Skills Handlers
  const handleCreateSkill = async (data: { skill: string }) => {
    console.log('Creating skill:', data);
    // API call: await fetch('/api/header-skills', { method: 'POST', body: JSON.stringify(data) });
    showSuccess('Skill added successfully!');
  };

  const handleUpdateSkill = async (id: number, data: { skill: string }) => {
    console.log('Updating skill:', id, data);
    // API call: await fetch(`/api/header-skills/${id}`, { method: 'PUT', body: JSON.stringify(data) });
    showSuccess('Skill updated successfully!');
  };

  const handleDeleteSkill = async (id: number) => {
    console.log('Deleting skill:', id);
    // API call: await fetch(`/api/header-skills/${id}`, { method: 'DELETE' });
    showSuccess('Skill deleted successfully!');
  };

  // HomePage Stats Handlers
  const handleCreateStat = async (data: { label: string; value: string }) => {
    console.log('Creating stat:', data);
    // API call: await fetch('/api/homepage-stats', { method: 'POST', body: JSON.stringify(data) });
    showSuccess('Statistic added successfully!');
  };

  const handleUpdateStat = async (id: number, data: { label: string; value: string }) => {
    console.log('Updating stat:', id, data);
    // API call: await fetch(`/api/homepage-stats/${id}`, { method: 'PUT', body: JSON.stringify(data) });
    showSuccess('Statistic updated successfully!');
  };

  const handleDeleteStat = async (id: number) => {
    console.log('Deleting stat:', id);
    // API call: await fetch(`/api/homepage-stats/${id}`, { method: 'DELETE' });
    showSuccess('Statistic deleted successfully!');
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

            <Tabs defaultValue="homepage" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="homepage">HomePage Data</TabsTrigger>
                    <TabsTrigger value="skills">Header Skills</TabsTrigger>
                    <TabsTrigger value="stats">HomePage Stats</TabsTrigger>
                </TabsList>

                <TabsContent value="homepage">
                    <HomePageForm
                        defaultValues={defaultHomePage}
                        onSubmit={handleHomePageSubmit}
                    />
                </TabsContent>

                <TabsContent value="skills">
                    <HeaderSkillsManager
                        initialSkills={initialHeaderSkills}
                        onCreate={handleCreateSkill}
                        onUpdate={handleUpdateSkill}
                        onDelete={handleDeleteSkill}
                    />
                </TabsContent>

                <TabsContent value="stats">
                    <HomePageStatsManager
                        initialStats={initialHomePageStats}
                        onCreate={handleCreateStat}
                        onUpdate={handleUpdateStat}
                        onDelete={handleDeleteStat}
                    />
                </TabsContent>
            </Tabs>
        </>
    );
}