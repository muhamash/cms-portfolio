"use client"


import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createHeaderSkill, createHeaderStats, createHomePage, deleteHeaderSkill, deleteHeaderStats, updateHeaderSkill, updateHeaderStats, updateHomePage } from '@/lib/utils/page.utils';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { HeaderSkillsManager } from './HeaderSkillsManager';
import { HomePageForm } from './HomePageForm';
import { HomePageStatsManager } from './HomePageStatsManager';



export default function ManageHomePage({defaultData}:any) {
  const [successMessage, setSuccessMessage] = useState('');

  const showSuccess = ( message: string ) =>
  {
    setSuccessMessage( message );
    setTimeout( () => setSuccessMessage( '' ), 3000 );
  };

  console.log(defaultData)
  // HomePage Form Handlers
  const handleHomePageSubmit = async ( data: any ) =>
  {
    console.log( 'HomePage submitted:', data );
    
    let result;

    if ( defaultData?.id )
    {
      result = await updateHomePage( data, defaultData?.id )
    }
    else
    {
      result = await createHomePage( data )
    }

    if ( result.success )
    {
      toast.success( result.message )
      showSuccess( 'HomePage information updated successfully!' );
    }
    else
    {
      toast.error( result.message )
    }

  };

  // Header Skills Handlers
  const handleCreateSkill = async ( data ) =>
  {
    console.log( 'Creating skill:', data );
    
    console.log( 'Creating skill:', data );
    const result = await createHeaderSkill( data )
    console.log( result )
        
    if ( result.success )
    {
      showSuccess( 'Skill added successfully!' );
      toast.success( result.message )
    }
    else
    {
      toast.error( result.message )
    }

  };

  const handleUpdateSkill = async ( id, data ) =>
  {
    console.log( 'Updating skill:', id, data );
    
    const result = await updateHeaderSkill(id, data )
    console.log( result )
        
    if ( result.success )
    {
      showSuccess( 'Skill updated successfully!' );
      toast.success( result.message )
    }
    else
    {
      toast.error( result.message )
    }
  };

  const handleDeleteSkill = async ( id: number ) =>
  {
    console.log( 'Deleting skill:', id );
    
    const result = await deleteHeaderSkill( id )
    console.log( result )
        
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

  // HomePage Stats Handlers
  const handleCreateStat = async ( data: { label: string; value: string } ) =>
  {
    console.log( 'Creating stat:', data );
    const result = await createHeaderStats( data )
    console.log( result )
        
    if ( result.success )
    {
      showSuccess( 'Stat Creating successfully!' );
      toast.success( result.message )
    }
    else
    {
      toast.error( result.message )
    }
  };

  const handleUpdateStat = async ( id: number, data: { label: string; value: string } ) =>
  {
    console.log( 'Updating stat:', id, data );
    
    const result = await updateHeaderStats( id, data )
    console.log( result )
        
    if ( result.success )
    {
      showSuccess( 'Updating stat successfully!' );
      toast.success( result.message )
    }
    else
    {
      toast.error( result.message )
    }
  };

  const handleDeleteStat = async (id: number) => {
    console.log('Deleting stat:', id);
    console.log( 'Deleting skill:', id );
    
    const result = await deleteHeaderStats( id )
    console.log( result )
        
    if ( result.success )
    {
      showSuccess( 'stat deleted successfully!' );
      toast.success( result.message )
    }
    else
    {
      toast.error( result.message )
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

            <Tabs defaultValue="homepage" className="space-y-6">
                <TabsList className="md:grid md:w-full md:grid-cols-3 flex gap-4 flex-wrap mb-20">
                    <TabsTrigger value="homepage">HomePage Data</TabsTrigger>
                    <TabsTrigger value="skills">Header Skills</TabsTrigger>
                    <TabsTrigger value="stats">HomePage Stats</TabsTrigger>
                </TabsList>

                <TabsContent value="homepage">
                    <HomePageForm
                        defaultValues={defaultData}
                        onSubmit={handleHomePageSubmit}
                    />
                </TabsContent>

                <TabsContent value="skills">
                    <HeaderSkillsManager
                        initialSkills={defaultData.headerSkills}
                        onCreate={handleCreateSkill}
                        onUpdate={handleUpdateSkill}
                        onDelete={handleDeleteSkill}
                    />
                </TabsContent>

                <TabsContent value="stats">
                    <HomePageStatsManager
                        initialStats={defaultData.stats}
                        onCreate={handleCreateStat}
                        onUpdate={handleUpdateStat}
                        onDelete={handleDeleteStat}
                    />
                </TabsContent>
            </Tabs>
        </>
    );
}