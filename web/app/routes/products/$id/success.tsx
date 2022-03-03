import { Box, Heading, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

import HeaderMenu from "~/components/shared/HeaderMenu";

function Success() {
  return (
    <>
      <HeaderMenu backButton />

      <Box textAlign="center" mt={40} py={10} px={6}>
        <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
        <Heading as="h2" size="xl" mt={6} mb={2}>
          successful purchase
        </Heading>
        <Text color={"gray.500"}>this is just a demo</Text>
      </Box>
    </>
  );
}

export default Success;
