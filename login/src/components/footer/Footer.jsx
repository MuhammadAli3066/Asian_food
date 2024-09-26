import React from 'react'

const Footer = () => {
  return (
    <>
     <footer className="bg-gray-900 text-white py-8 rounded-lg">
          <div className="container mx-auto text-center">
            <p className="text-sm">
              &copy; 2024 Asian food. All rights reserved.
            </p>
            <div className="flex justify-center space-x-6 mt-4">
              <a
                href="#"
                className="hover:text-gray-300 transition duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-gray-300 transition duration-300"
              >
                Terms of Service
              </a>
              <a
                href="/contact"
                className="hover:text-gray-300 transition duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
        </footer>
      
    </>
  )
}

export default Footer
