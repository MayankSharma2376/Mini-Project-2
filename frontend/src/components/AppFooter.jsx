import React from "react";
import Icon from "../constants/Icons";
// Footer component with links and social media icons
const AppFooter = () => (
    <footer className="p-6 mt-auto bg-[#344E41]  border-t">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <div className="flex space-x-6 mb-4 md:mb-0">
                <a href="#" className="hover:text-gray-900"><span className='text-white'>Product</span></a>
                <a href="#" className="hover:text-gray-900"><span className='text-white'>Company</span></a>
                <a href="#" className="hover:text-gray-900"><span className='text-white'>Resources</span></a>
                <a href="#" className="hover:text-gray-900"><span className='text-white'>Legal</span></a>
            </div>
            <div className="flex space-x-6">
                <a href="#" className="text-gray-500 hover:text-gray-900"><Icon name="Facebook" className="text-white h-5 w-5" /></a>
                <a href="#" className="text-gray-500 hover:text-gray-900"><Icon name="Twitter" className="text-white h-5 w-5" /></a>
                <a href="#" className="text-gray-500 hover:text-gray-900"><Icon name="Instagram" className="text-white h-5 w-5" /></a>
                <a href="#" className="text-gray-500 hover:text-gray-900"><Icon name="Linkedin" className="text-white h-5 w-5" /></a>
            </div>
        </div>
    </footer>
);
export default AppFooter;