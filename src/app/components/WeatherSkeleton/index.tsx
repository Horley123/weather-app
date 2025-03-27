import React from "react";
import {
  Flex,
  Skeleton,
  Icon,
  Stack,
  SkeletonText,
  HStack,
} from "@chakra-ui/react";
import { BiLocationPlus } from "react-icons/bi";
import { weatherTranslations } from "@/app/utils/enuns";

export default function WeatherSkeleton({ condition }: { condition: string }) {
  return (
    <Flex
      flex={1}
      direction="column"
      height="100vh"
      backgroundColor="#00BFFF"
      backgroundImage={`url('../assets/${weatherTranslations[condition]}.png')`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      transition="background-image 0.5s ease-in-out"
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        gap={3}
        padding="20px"
      >
        <Skeleton height="40px" width="150px" borderRadius="5px" />
        <Skeleton height="40px" width="40px" borderRadius="50%" />
      </Flex>

      <Flex
        justifyContent="space-between"
        flex={1}
        direction="row"
        padding="30px 80px"
        flexWrap={"wrap"}
        alignItems={"center"}
        gap={20}
      >
        <Flex
          justifyContent="center"
          direction="column"
          fontSize="25px"
          textAlign="center"
        >
          <Flex direction="row" alignItems="center" justifyContent="center">
            <Icon as={BiLocationPlus} style={{ color: "white" }} />
            <Skeleton height="20px" width="100px" marginLeft="10px" />
          </Flex>
          <Skeleton height="30px" width="120px" marginTop="10px" />
          <Skeleton height="70px" width="150px" marginTop="10px" />
          <Skeleton height="20px" width="150px" marginTop="10px" />
        </Flex>

        <Flex
          justifyContent="center"
          direction="column"
          fontSize="25px"
          textAlign="center"
        >
          <Skeleton height="20px" width="200px" marginBottom="10px" />
          <Skeleton height="20px" width="200px" marginBottom="10px" />
          <Skeleton height="20px" width="200px" marginBottom="10px" />
          <Skeleton height="60px" width="100px" />
        </Flex>
      </Flex>

      <Flex
        flex={1}
        width="auto"
        gap={5}
        overflowX="auto"
        padding="10px"
        direction="row"
        wrap="nowrap"
        alignItems="flex-end"
        paddingBottom="40px"
        paddingLeft="40px"
      >
        {[...Array(25)].map((_, index) => (
          <Stack
            key={index}
            background={"#046b8d70"}
            justifyContent={"space-between"}
            alignItems={"center"}
            direction={"column"}
            padding={"25px 5px"}
            height={"250px"}
            scrollSnapAlign={"start"}
            width={"130px"}
            flexShrink={0}
          >
            <HStack justify={"center"}>
              <SkeletonText noOfLines={1} width="60px" />
            </HStack>

            <Skeleton
              height="50px"
              width="90px"
              borderRadius="2%"
              margin="0 auto"
            />

            <Stack align="center">
              <Skeleton height="20px" width="60px" />
              <Skeleton height="20px" width="60px" />
            </Stack>
          </Stack>
        ))}
      </Flex>
    </Flex>
  );
}
