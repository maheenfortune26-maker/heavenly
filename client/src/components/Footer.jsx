import { Link } from 'react-router-dom'
import { assets } from '../assets/assets.js'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-gray-800">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-white font-bold text-xl">Heavenly</span>
            </div>
            <p className="text-sm leading-relaxed mb-5">Your trusted partner for finding the perfect hotel. Luxury, comfort, and the best rates guaranteed.</p>
            <div className="flex gap-3">
              {[assets.instagramIcon, assets.facebookIcon, assets.twitterIcon, assets.linkendinIcon].map((icon, i) => (
                <a key={i} href="#" className="bg-gray-800 hover:bg-indigo-600 w-9 h-9 rounded-full flex items-center justify-center transition-colors">
                  <img src={icon} alt="" className="w-4 h-4 invert" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            { title: 'Company', links: ['About Us', 'Careers', 'Press', 'Blog'] },
            { title: 'Support', links: ['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'] },
            { title: 'Destinations', links: ['Dubai', 'Singapore', 'New York', 'London'] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-white font-semibold mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-sm hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-3 text-sm">
          <p>© {new Date().getFullYear()} Heavenly. All rights reserved.</p>
          <p className="text-gray-500">Built with ❤️ using MERN Stack</p>
        </div>
      </div>
    </footer>
  )
}