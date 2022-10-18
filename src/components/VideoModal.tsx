import React from 'react';
import { ContextModalProps } from '@mantine/modals';
import { Text, Button } from '@mantine/core';

const VideoModal = ({ context, id, innerProps }: ContextModalProps<{ modalBody: string }>): JSX.Element => (
  <>
    <Text size="sm">{innerProps.modalBody}</Text>
    <Button fullWidth mt="md" onClick={() => context.closeModal(id)}>
      Close modal
    </Button>
  </>
);

export default VideoModal;
