import Link from "next/link";

export default async function Footer ( { name, socialLinks, email }: any )
{
  // console.log(name, socialLinks, email)
  return (
    <footer className=" text-gray-900 bg-gradient-to-br from-sky-100 via-slate-50 to-purple-100 border-t-1 border-purple-800 py-12">
      <div className="container mx-auto px-6 md:px-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-violet-800 mb-3">{name}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Building modern web experiences with Next.js, Tailwind, and scalable tech.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold text-slate-600 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition">About</Link></li>
              <li><Link href="/blogs" className="hover:text-white transition">Blogs</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* social links */}
          <div>
            <h3 className="text-lg font-semibold text-slate-600 mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              {socialLinks.map( ( link ) => (
                <li key={link.id}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    {link.platform}
                  </a>
                </li>
              ) )}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Hire me!</h3>
            <p className="text-sm text-gray-600 mb-3">Connect me to get projects with the latest tech and amazing features.</p>
            <p className="text-teal-700 font-mono">Email: {email}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-sky-900">
          <p>© {new Date().getFullYear()} Muhamash. All rights reserved.</p>
          <p className="mt-3 md:mt-0">Made with 😁 using Next.js & Tailwind & Shadcn</p>
        </div>
      </div>
    </footer>
  );
}
