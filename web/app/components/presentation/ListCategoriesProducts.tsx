import { Container, Stack } from "@chakra-ui/react";

import { Category } from "~/types/category";
import CategoryProductsSection from "./CategoryProductsSection";

type ListCategoriesProductsProps = {
  categories: Category[];
};

function ListCategoriesProducts({ categories }: ListCategoriesProductsProps) {
  return (
    <>
      <Container paddingY={10} maxW="container.xl">
        <Stack spacing={20}>
          {categories.map((category, key) => {
            return (
              category.products.edges.length > 0 && (
                <CategoryProductsSection key={key} category={category} />
              )
            );
          })}
        </Stack>
      </Container>
    </>
  );
}

export default ListCategoriesProducts;
