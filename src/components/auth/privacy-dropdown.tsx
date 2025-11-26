'use client';
import { Dropdown } from 'react-bootstrap';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { updatePost } from '@/redux/features/postSlice';

interface Props {
  isPrivate: boolean;
  postId: string;
}

const PrivacyDropdown: FC<Props> = ({ isPrivate, postId }) => {
  const [privacy, setPrivacy] = useState<boolean>(isPrivate);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updatePost({ postId: postId, data: { isPrivate: privacy } }));
  }, [setPrivacy, dispatch, postId, privacy]);

  return (
    <Dropdown drop='down'>
      <Dropdown.Toggle variant='light' id='privacy-dropdown' className='privacy-toggle-btn'>
        {privacy ? 'Private' : 'Public'}
      </Dropdown.Toggle>

      <Dropdown.Menu className='privacy-dropdown-menu  '>
        <Dropdown.Item onClick={() => setPrivacy(false)}>Public</Dropdown.Item>
        <Dropdown.Item onClick={() => setPrivacy(true)}>Private</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default PrivacyDropdown;
