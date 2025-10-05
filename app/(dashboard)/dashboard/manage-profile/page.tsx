import { getPersonalInfo } from '@/lib/utils/profile.utils';
import ProfileManagerParent from '@/modules/pages/dashboard/profile/Manager';


export default async function ManageProfile() {

  const personalInfo = await getPersonalInfo();
  // console.log(personalInfo)

  return (
    <div className="min-h-screen bg-gray-50 md:p-6 p-3 rounded-2xl">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Profile</h1>
          <p className="text-muted-foreground mt-2">
            Update your personal information and professional details
          </p>
        </div>

        <ProfileManagerParent defaultPersonalInfo={ personalInfo } />
      </div>
    </div>
  );
}