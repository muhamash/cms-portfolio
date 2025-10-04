import ManageHomePage from "@/modules/pages/dashboard/pageContent/ContentManager";



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

export default async function ManagePages() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 rounded-2xl">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage HomePage content</h1>
          <p className="text-muted-foreground mt-2">
            Update your homepage content and settings
          </p>
        </div>

        <ManageHomePage/>
      </div>
    </div>
  );
}
