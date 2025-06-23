import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from '../../services/api';
import {
  Avatar,
  Box,
  Button,
  TextField,
  Stack,
} from '@mui/material';
import { API_BASE_URL } from '../../config';

interface ProfileEditFormProps {
  initialData: {
    username: string;
    bio?: string;
    avatarUrl?: string;
  };
  onProfileUpdate: () => void;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({
  initialData,
  onProfileUpdate,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: '',
      bio: '',
    },
  });

  const [avatarPreview, setAvatarPreview] = useState(initialData.avatarUrl || '');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    if (initialData) {
      console.log(initialData);
      reset({
        username: initialData.username || '',
        bio: initialData.bio || '',
      });
      setAvatarPreview(`${API_BASE_URL}${initialData.avatarUrl}` || '');
    }
  }, [initialData, reset]);

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('bio', data.bio);
    if (avatarFile) formData.append('avatar', avatarFile);

    try {
      await axios.patch('/users/me', formData);
      onProfileUpdate();
    } catch (err) {
      console.error('Profile update failed', err);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Avatar
          src={
            avatarPreview
              ? avatarPreview
              : initialData.avatarUrl
                ? `${API_BASE_URL}${initialData.avatarUrl}`
                : 'https://via.placeholder.com/80'
          }

          sx={{ width: 80, height: 80 }}
        />
        <Button variant="outlined" component="label">
          Change Avatar
          <input type="file" hidden accept="image/*" onChange={handleAvatarChange} />
        </Button>
      </Stack>

      {/* Controlled Username Field */}
      <Controller
        name="username"
        control={control}
        rules={{ required: 'Username is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Username"
            variant="outlined"
            error={!!errors.username}
            helperText={errors.username?.message}
            sx={{ mb: 2 }}
          />
        )}
      />

      {/* Controlled Bio Field */}
      <Controller
        name="bio"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            multiline
            minRows={3}
            label="Bio"
            variant="outlined"
            sx={{ mb: 3 }}
          />
        )}
      />

      <Button variant="contained" color="primary" type="submit">
        Update Profile
      </Button>
    </Box>
  );
};

export default ProfileEditForm;
