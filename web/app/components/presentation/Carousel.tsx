import React from "react";
import { Box, Stack, Heading, Text, Container } from "@chakra-ui/react";
import Slider from "react-slick";

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function Carousel() {
  const [_, setSlider] = React.useState<Slider | null>(null);

  const cards = [
    {
      title: "welcome to the future",
      text: "see our releases for the year 2077",
      image:
        "https://images.unsplash.com/photo-1542507637-d426b58194d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
    },
    {
      title: "your purchase is worth a e-trip",
      text: "shop over 1 ETH and win an e-trip to japan",
      image:
        "https://images.unsplash.com/photo-1610194352335-82d06f0c94e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
    },
    {
      title: "new io-glasses",
      text: "translate everything you see",
      image:
        "https://images.unsplash.com/photo-1594877580790-299161e73ab6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
  ];

  return (
    <Box
      position={"relative"}
      height={"600px"}
      width={"full"}
      overflow={"hidden"}
    >
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((card, index) => (
          <Box
            key={index}
            height={"6xl"}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${card.image})`}
          >
            <Container maxW="container.xl" height="600px" position="relative">
              <Stack
                spacing={6}
                w={"full"}
                position="absolute"
                top="50%"
                transform="translate(0, -50%)"
              >
                <Heading fontSize="6xl">{card.title}</Heading>
                <Text m="0" color="white">
                  {card.text}
                </Text>
              </Stack>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
