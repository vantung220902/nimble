/* eslint-disable @typescript-eslint/no-unused-vars */
import appConstant from '@config/constant';
import {
  Anchor,
  Button,
  Flex,
  Group,
  Loader,
  Modal,
  PinInput,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useResendVerification, useVerify } from '@queries';
import { useCommonStore } from '@stores';
import React, { useMemo, useState } from 'react';
import { Toastify } from 'src/services';

export type Props = {
  email: string;
  onVerifySuccess?: () => void;
};

const SignUpVerificationModal: React.FC<Props> = ({ email, onVerifySuccess = () => {} }) => {
  const { onSetIsOpenDialog, isOpenDialog } = useCommonStore();

  const [_, { close }] = useDisclosure(isOpenDialog);
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { onResendVerification, isSending } = useResendVerification({
    onSuccess() {
      Toastify.success('A new code has been sent to your email.');
    },
    onError(error: Error) {
      Toastify.error(error.message);
    },
  });

  const { onVerify, isVerifying } = useVerify({
    onSuccess() {
      onVerifySuccess();
    },
    onError(error: Error) {
      handleError(error);
    },
  });

  const handleValueChange = (value: string) => {
    setCode(value);
    if (errorMessage) setErrorMessage('');
  };

  const handleVerifyCode = () => {
    onVerify({
      email,
      code,
    });
  };

  const handleResendVerification = () => {
    onResendVerification({ email });
  };

  const handleError = (error: Error) => {
    setErrorMessage(error.message);
  };

  const handleCloseModal = () => {
    close();
    onSetIsOpenDialog(false);
  };

  const isDisabled = useMemo(() => code.length !== appConstant.VERIFICATION_CODE_LENGTH, [code]);

  return (
    <Modal
      opened={isOpenDialog}
      onClose={handleCloseModal}
      title={<Title order={4}>Email Verification Code</Title>}
    >
      <Stack>
        <Text>Please enter the verification code sent to your email</Text>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!isDisabled) handleVerifyCode();
          }}
        >
          <Stack my="md">
            <PinInput
              length={appConstant.VERIFICATION_CODE_LENGTH}
              onChange={handleValueChange}
              error={Boolean(errorMessage)}
              size="lg"
              type="number"
            />
            {errorMessage && (
              <Text color="red" size="sm">
                {errorMessage}
              </Text>
            )}
          </Stack>
        </form>

        <Flex align="center" gap="xs">
          <Text size="sm">Didn't receive the code?</Text>
          {isSending ? (
            <Loader size="xs" />
          ) : (
            <Anchor size="sm" onClick={handleResendVerification}>
              Resend
            </Anchor>
          )}
        </Flex>

        <Group justify="flex-end" mt="md">
          <Button variant="outline" onClick={() => handleCloseModal()}>
            Cancel
          </Button>
          <Button onClick={handleVerifyCode} loading={isVerifying} disabled={isDisabled}>
            Verify
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default SignUpVerificationModal;
