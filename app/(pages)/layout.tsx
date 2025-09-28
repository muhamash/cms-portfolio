import NavBar from '@/src/layouts/NavBar';

export default function PagesLayout(
          {
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <>
            <NavBar />
            {children}
        </>
    );
}
