import {
  Flex,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  Text,
} from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { FaEthereum } from "react-icons/fa";
import { Link } from "remix";

import { Product } from "~/types/product";

type ProductItemProps = {
  product: Pick<Product, "id" | "title" | "image">;
};

function ProductItem({ product }: ProductItemProps) {
  return (
    <Link to={`/products/${product.id}`}>
      <Box
        bg={useColorModeValue("white", "gray.800")}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        position="relative"
        cursor="pointer"
      >
        {true && (
          <Box
            position="absolute"
            top={2}
            right={2}
            d="flex"
            alignItems="baseline"
          >
            <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="cyan">
              New
            </Badge>
          </Box>
        )}

        <Image
          src={product.image}
          alt={`Picture of ${product.title}`}
          roundedTop="lg"
          height="300px"
          width="100%"
          objectFit="cover"
        />

        <Box bg={useColorModeValue("gray.50", "gray.700")} p="6">
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {product.title}
            </Box>
            <Tooltip
              label="Add to WhishList"
              placement={"top"}
              fontSize={"1.2em"}
            >
              <chakra.a href={"#"} display={"flex"}>
                <Icon as={FiHeart} h={5} w={5} alignSelf={"center"} />
              </chakra.a>
            </Tooltip>
          </Flex>

          <Rating
            rating={Math.floor(Math.random() * (5 - 2)) + 2}
            numReviews={Math.floor(Math.random() * (100 - 50)) + 50}
          />
          <Flex mt={2} alignItems="center">
            <FaEthereum size={14} />
            <Text color={useColorModeValue("gray.800", "white")} fontSize="lg">
              {0.000066}
            </Text>
          </Flex>
        </Box>
      </Box>
    </Link>
  );
}

interface RatingProps {
  rating: number;
  numReviews: number;
}

function Rating({ rating, numReviews }: RatingProps) {
  return (
    <Box d="flex" alignItems="center">
      {Array(5)
        .fill("")
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                size={10}
                key={i}
                style={{ marginLeft: "1" }}
                color="cyan"
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf size={10} key={i} style={{ marginLeft: "1" }} />;
          }
          return <BsStar size={10} key={i} style={{ marginLeft: "1" }} />;
        })}
      <Box as="span" ml="2" color="gray.600" fontSize="small">
        {numReviews} review{numReviews > 1 && "s"}
      </Box>
    </Box>
  );
}

export default ProductItem;
