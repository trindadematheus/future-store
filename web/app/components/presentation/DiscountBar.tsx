import { Flex, Text } from "@chakra-ui/react";

function DiscountBar() {
  return (
    <>
      <Flex justifyContent="center" padding="10px" bg="blackAlpha.900">
        <Text color="whiteAlpha.900">
          🎉 Discount coupons up to 0.014 ETH 🎉
        </Text>
      </Flex>
    </>
  );
}

export default DiscountBar;
