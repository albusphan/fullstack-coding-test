import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { Box, Center, Flex, Heading, Text } from "@chakra-ui/layout";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button, IconButton } from "@chakra-ui/button";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";

import { useAuth } from "hooks/useAuth";

type SignInFormData = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const router = useRouter();

  const { user, signIn } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, errors } = useForm<SignInFormData>();

  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      setSubmitting(true);
      await signIn(email, password);
    } catch (error) {
      setServerError(error.message);
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <Center flexDirection="column" minH="100vh">
      <Heading mb="4">Sign In</Heading>
      <Box w="100%" maxW="360px" as="form" onSubmit={onSubmit}>
        <FormControl mb="4" isRequired isInvalid={!!errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            disabled={submitting}
            name="email"
            type="email"
            placeholder="Enter your email"
            ref={register({ required: { message: "Email is required", value: true } })}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl mb="4" isRequired isInvalid={!!errors.password}>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              disabled={submitting}
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              ref={register({
                required: { message: "Password is required", value: true },
              })}
            />
            <InputRightElement>
              <IconButton
                variant="ghost"
                size="sm"
                onClick={() => setShowPassword((p) => !p)}
                aria-label="toggle-password"
                icon={showPassword ? <ViewIcon boxSize={5} /> : <ViewOffIcon boxSize={5} />}
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        {!!serverError && (
          <Text color="red" textAlign="center" mb="4">
            {serverError}
          </Text>
        )}
        <Button colorScheme="cyan" isLoading={submitting} isFullWidth type="submit">
          Sign in
        </Button>
        <Text my="2" textAlign="center">
          Or
        </Text>
        <Flex justify="center" align="center" mt="4">
          <Button variant="link" onClick={() => router.push("/sign-up")}>
            Create account?
          </Button>
        </Flex>
      </Box>
    </Center>
  );
}
