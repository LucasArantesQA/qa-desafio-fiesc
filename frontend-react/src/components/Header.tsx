import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
            <div className="flex items-center">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-neutral-100 mr-4">
                    
                </span>
                <span className="font-bold text-xl text-black tracking-wide">
                    Coffee Builder
                </span>
            </div>
            
            <a
                href="#contato"
                className="text-black font-medium text-base px-4 py-2 rounded-md border border-black hover:bg-black hover:text-white transition"
            >
                Contato
            </a>
        </header>
    );
};

export default Header;
