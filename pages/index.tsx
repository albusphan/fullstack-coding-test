import Head from "next/head";
import { useRef } from "react";
import { Input } from "@chakra-ui/input";
import { Center, Link, Text } from "@chakra-ui/layout";

import DynamicText from "components/DynamicText";

const Home = () => {
  const ref = useRef<{ changeValue?: (value: string) => void }>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    ref.current?.changeValue(e.target.value);
  };

  return (
    <Center minH="100vh" px="2" flexDirection="column">
      <Head>
        <Text as="title">Coding Test</Text>
        <Link rel="icon" href="/favicon.ico" />
      </Head>

      <Center maxW="32rem" flex="1" flexDirection="column" py="20">
        <DynamicText ref={ref} />
        <Input placeholder="Type something" onChange={onChange} />
      </Center>
    </Center>
  );
};

export default Home;
