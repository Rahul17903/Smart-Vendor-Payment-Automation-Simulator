function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Side */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-lg font-bold text-white">Smart Vendor</h2>
          <p className="text-sm">Vendor Payment Automation Simulator</p>
        </div>

        {/* Middle Links */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a href="/upload" className="hover:text-white">Upload</a>
          <a href="/dashboard" className="hover:text-white">Dashboard</a>
          <a href="https://github.com/your-username/smart-vendor-payment" 
             target="_blank" 
             rel="noreferrer"
             className="hover:text-white">
            GitHub
          </a>
        </div>

        {/* Right Side */}
        <div className="text-sm text-center md:text-right">
          <p>© {new Date().getFullYear()} Smart Vendor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
