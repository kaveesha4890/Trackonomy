import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Logo and Description */}
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-2xl font-bold">Trackonomy</h2>
                        <p className="text-sm mt-2 text-gray-200">
                            Simplify your personal finance with Trackonomy. Your companion for managing income, expenses, and budgets.
                        </p>
                    </div>

                    

                    {/* Contact Details */}
                    <div className="text-sm text-gray-200">
                        <p>Contact us: support@trackonomy.com</p>
                        <p>Phone: (123) 456-7890</p>
                    </div>
                </div>

                {/* Bottom Line */}
                <div className="mt-6 text-center text-sm text-gray-200">
                    © {new Date().getFullYear()} Trackonomy. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;