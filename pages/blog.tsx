import { Box, Center, Flex, Heading, HStack, SimpleGrid } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { BlogCard } from "components/BlogCard";
import { useBlogs } from "hooks/useBlogs";

export default function BlogPage() {
  const { blogs, loaded } = useBlogs();

  return (
    <Box minH="100vh" p="6">
      {loaded ? (
        <>
          <Heading mb="4">Blogs</Heading>
          <SimpleGrid columns={[1, 1, 2, 4]} spacing="4" justifyContent="center">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} imageUrl={blog.imageUrl} title={blog.title} />
            ))}
          </SimpleGrid>
        </>
      ) : (
        <Center h="100vh">
          <Spinner />
        </Center>
      )}
    </Box>
  );
}
