import { Image } from "@chakra-ui/image";
import { AspectRatio, Box, Heading } from "@chakra-ui/layout";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { useState } from "react";

type BlogCardProps = {
  imageUrl: string;
  title: string;
};

export const BlogCard = ({ imageUrl, title }: BlogCardProps) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Box
      cursor="pointer"
      border="1px solid"
      _hover={{
        transform: "scale(1.01)",
        transition: "0.5s",
      }}
      onClick={() => setOpenModal(true)}
      borderRadius="8px"
      overflow="hidden">
      <AspectRatio ratio={4 / 3}>
        <Image src={imageUrl} />
      </AspectRatio>
      <Heading p="4" size="md">
        {title}
      </Heading>
      {openModal && (
        <Modal isOpen onClose={() => setOpenModal(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalBody display="flex" flexDirection="column" alignItems="center" w="100%">
              <Image src={imageUrl} />
              <Heading>{title}</Heading>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};
