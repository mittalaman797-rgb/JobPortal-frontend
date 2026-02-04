import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 text-gray-300">
  <div className="max-w-7xl mx-auto px-6 py-12">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

      {/* Brand */}
      <div>
        <h2 className="text-2xl font-bold text-white">
          Job<span className="text-[#6A38C2]">Hub</span>
        </h2>
        <p className="mt-4 text-sm text-gray-400">
          Find your dream job or hire the best talent with JobPortal.
          Trusted by thousands of job seekers and recruiters.
        </p>
      </div>

      {/* Job Seekers */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Job Seekers
        </h3>
        <ul className="space-y-2 text-sm">
          <li>Browse Jobs</li>
          <li>Upload Resume</li>
          <li>Job Alerts</li>
          <li>Career Advice</li>
        </ul>
      </div>

      {/* Employers */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Employers
        </h3>
        <ul className="space-y-2 text-sm">
          <li>Post a Job</li>
          <li>Search Resumes</li>
          <li>Employer Login</li>
          <li>Pricing Plans</li>
        </ul>
      </div>

      {/* Company */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Company
        </h3>
        <ul className="space-y-2 text-sm">
          <li>About Us</li>
          <li>Contact</li>
          <li>Privacy Policy</li>
          <li>Terms & Conditions</li>
        </ul>
      </div>

    </div>
  </div>

  {/* Bottom Bar */}
  <div className="border-t border-gray-800">
    <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
      <p>© {new Date().getFullYear()} JobPortal. All rights reserved.</p>
      <p className="mt-2 md:mt-0">
        Made with ❤️ for job seekers
      </p>
    </div>
  </div>
</footer>

    </div>
  )
}

export default Footer
