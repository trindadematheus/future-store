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
        <Flex justifyContent="space-between">
          <Text fontSize={18} fontWeight="bold" as="span">
            {category.name}
          </Text>

          <Link to="/">
            <Button fontWeight="normal" colorScheme="teal" variant="link">
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
