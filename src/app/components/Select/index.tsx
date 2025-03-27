"use client";

import { Flex, Text } from "@chakra-ui/react";

interface SelectComponentProps {
  availableCities: string[];
  defaultValue: string;
  onChange: (event: any) => void;
}
export const SelectComponent = ({
  availableCities,
  defaultValue,
  onChange,
}: SelectComponentProps) => {
  return (
    <Flex direction={"column"}>
      <Text>Selecione uma cidade</Text>
      <select
        value={defaultValue}
        onChange={onChange}
        className="custom-select"
      >
        {availableCities.map((cityOption) => (
          <option key={cityOption} value={cityOption}>
            {cityOption}
          </option>
        ))}
      </select>
    </Flex>
  );
};
