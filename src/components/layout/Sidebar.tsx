import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <aside className="w-64 bg-gray-100 h-full p-4">
      <ul className="space-y-2">
        <li>
          <Link to="/profile" className="text-gray-800 hover:text-blue-600">
            My Profile
          </Link>
        </li>
        <li>
          <Link to="/users" className="text-gray-800 hover:text-blue-600">
            User List
          </Link>
        </li>
        {user.role === 'admin' && (
          <li>
            <Link to="/admin" className="text-gray-800 hover:text-red-600">
              Admin Panel
            </Link>
          </li>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
