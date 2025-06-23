import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';
import ProfileEditForm from '../components/forms/ProfileEditForm'; // ✅ use component version

const ProfileEditPage: React.FC = () => {
  const [user, setUser] = useState<null | {
    username: string;
    bio?: string;
    avatar_url?: string;
  }>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/auth/me');
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <ProfileEditForm
      initialData={{
        username: user.username,
        bio: user.bio,
        avatarUrl: user.avatar_url,
      }}
      onProfileUpdate={() => navigate('/profile')}
    />
  );
};

export default ProfileEditPage;
