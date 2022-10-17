import React from 'react';
import { BsX } from 'react-icons/bs';
import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const ClearFiltersBtn = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        variant="light"
        leftIcon={<BsX size={18}/>}
        color="red"
        onClick={() => navigate(location.pathname)}
      >
        Clear filters
      </Button>
    </div>
  );
};

export default ClearFiltersBtn;
