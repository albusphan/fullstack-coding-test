import Head from "next/head";
import { useEffect, useRef } from "react";
import { Input } from "@chakra-ui/input";
import { Center, Link, Text } from "@chakra-ui/layout";

import DynamicText from "components/DynamicText";
import { useRequireAuth } from "hooks/useRequireAuth";
import { useAuth } from "hooks/useAuth";
import { Spinner } from "@chakra-ui/spinner";
import { Button } from "@chakra-ui/button";
import { useRouter } from "next/router";
import { route } from "next/dist/next-server/server/router";

const Home = () => {
  const router = useRouter();

  const { loading, user, signOut } = useAuth();
  useRequireAuth();

  const ref = useRef<{ changeValue?: (value: string) => void }>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    ref.current?.changeValue(e.target.value);
  };

  if (loading)
    return (
      <Center minH="100vh">
        <Spinner />
      </Center>
    );

  return (
    <Center minH="100vh" px="2" flexDirection="column">
      <Head>
        <Text as="title">Coding Test</Text>
        <Link rel="icon" href="/favicon.ico" />
      </Head>

      <Center maxW="32rem" flex="1" flexDirection="column" py="20">
        <DynamicText ref={ref} />
        <Input my="4" placeholder="Type something" onChange={onChange} />
        {!!user && <Button onClick={signOut}>Sign out</Button>}
        <Button mt="6" onClick={() => router.push("/blog")}>
          Blogs
        </Button>
      </Center>
    </Center>
  );
};

export default Home;
