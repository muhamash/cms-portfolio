import NavBar from '@/src/layouts/NavBar';

export default function PagesLayout({
          children,
        }) {
    return (
        <>
            <NavBar />
            {children}
        </>
    );
}
