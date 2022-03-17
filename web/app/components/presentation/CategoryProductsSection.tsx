import { Text, Box, Flex, Button, SimpleGrid } from "@chakra-ui/react";
import { Link } from "remix";

import { Category } from "~/types/category";
import ProductItem from "../core/ProductItem";

type CategoryProductsSectionProps = {
  category: Category;
};

function CategoryProductsSection({ category }: CategoryProductsSectionProps) {
  return (
    <>
      <Box>
        <Flex alignItems="flex-end">
          <Text
            fontSize={18}
            textTransform="capitalize"
            fontWeight="bold"
            as="span"
            mr={2}
          >
            {category.name}
          </Text>

          <Link to="/">
            <Button
              mb={1}
              fontWeight="normal"
              colorScheme="teal"
              variant="link"
            >
              see more
            </Button>
          </Link>
        </Flex>
        <SimpleGrid spacing={4} columns={4} marginTop={4}>
          {category.products.edges.map((product) => (
            <ProductItem product={product.node} />
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
}

export default CategoryProductsSection;
