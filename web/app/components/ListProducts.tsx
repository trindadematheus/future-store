import { Container, SimpleGrid } from "@chakra-ui/react";

import ProductItem from "./ProductItem";

function ListProducts() {
  return (
    <>
      <Container paddingY={20} maxW="container.xl">
        <SimpleGrid columns={4} spacing={4}>
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
        </SimpleGrid>
      </Container>
    </>
  );
}

export default ListProducts;
