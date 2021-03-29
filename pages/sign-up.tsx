import { useState } from "react";
import { useRouter } from "next/router";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { Box, Center, Flex, Heading, Text } from "@chakra-ui/layout";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button, IconButton } from "@chakra-ui/button";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { auth } from "configs/firebase";

type SignUpFormData = {
  email: string;
  password: string;
};

export default function SignUpPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, errors } = useForm<SignUpFormData>();

  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      setSubmitting(true);
      await auth.createUserWithEmailAndPassword(email, password);
      setIsSuccess(true);
    } catch (error) {
      setServerError(error?.message || "Something wrong, please try again");
    } finally {
      setSubmitting(false);
    }
  });

  if (isSuccess)
    return (
      <Center minH="100vh" flexDirection="column">
        <Heading mb="4">Wow, created an account success</Heading>
        <Button onClick={() => router.push("/")}>Go to home</Button>
      </Center>
    );

  return (
    <Center flexDirection="column" minH="100vh">
      <Heading mb="4">Sign Up</Heading>
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
                minLength: { message: "Password must be more than 6 letters", value: 6 },
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
          Sign up
        </Button>
        <Text my="3" textAlign="center">
          Or
        </Text>
        <Flex justify="center" align="center" mt="4">
          <Button variant="link" onClick={() => router.push("/sign-in")}>
            Login
          </Button>
        </Flex>
      </Box>
    </Center>
  );
}
