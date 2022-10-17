import React from 'react';
import { BsChevronLeft } from 'react-icons/bs';
import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const BackBtn = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div>
      <Button leftIcon={<BsChevronLeft size={18}/>} variant="light" onClick={() => navigate(-1)}>Go back</Button>
    </div>
  );
};

export default BackBtn;
