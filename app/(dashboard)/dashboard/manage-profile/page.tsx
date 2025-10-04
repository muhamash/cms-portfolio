import { getPersonalInfo } from '@/lib/utils/profile.utils';
import ProfileManagerParent from '@/modules/pages/dashboard/profile/Manager';

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

const defaultExperiences = {
  experiences: [
    {
      position: 'Senior Developer',
      company: 'Tech Corp',
      timeLine: '2020 - Present',
      description: 'Leading development of web applications',
    },
  ],
};

const defaultEducation = {
  education: [
    {
      degree: 'Computer Science',
      institute: 'University of Technology',
      timeLine: '2015 - 2019',
      description: 'Bachelor of Science in Computer Science'
    }
  ]
};

export default async function ManageProfile() {

  const personalInfo = await getPersonalInfo();
  // console.log(personalInfo)

  return (
    <div className="min-h-screen bg-gray-50 p-6 rounded-2xl">
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