'use client'
import { useContext, useState } from 'react';
import { auth } from '@/app/firebase/config';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import userProfile from '../images/sticker.jpg';

const Navbar = () => {

    const router = useRouter()

    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log('Logged out successfully');
        } catch (error) {
            console.error('Failed to log out', error);
        }
    };

    const user = auth.currentUser;
    if (!user) {
        router.push('/sign-in')
    }
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-lg">TranslateMate</div>
                <div className="relative flex items-center">
                    <img
                        src={user?.photoURL || 'https://w7.pngwing.com/pngs/981/645/png-transparent-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-symbol-thumbnail.png'} // Default image if no photoURL
                        alt="User Profile"
                        className="w-10 h-10 rounded-full mr-2 cursor-pointer"
                        onMouseEnter={() => setShowDropdown(true)}
                        onMouseLeave={() => setShowDropdown(false)}
                    />
                    <span
                        className="cursor-pointer"
                        onMouseEnter={() => setShowDropdown(true)}
                        onMouseLeave={() => setShowDropdown(false)}
                    >
                {user?.displayName || 'UserName'}
            </span>
                    {showDropdown && (
                        <div
                            className="absolute mt-12 mr-2 right-0 bg-white text-black p-2 rounded shadow-lg transition-all duration-300 ease-in-out"
                            onMouseEnter={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                        >
                            <button
                                onClick={handleLogout}
                                className="p-2 hover:bg-gray-200 w-full text-left transition-colors duration-200 ease-in-out"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>

    );
};

export default Navbar;
