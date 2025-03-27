"use client";

import { Portal, Select, createListCollection } from "@chakra-ui/react";

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
  const frameworks = createListCollection({
    items: availableCities.map((framework) => ({
      label: framework,
      value: framework,
    })),
  });
  return (
    <Select.Root
      data-testid="city-select-root"
      collection={frameworks}
      size="sm"
      width="320px"
      positioning={{ placement: "bottom", flip: false }}
      defaultValue={[defaultValue]}
      onChange={onChange}
      color={"#FFFFFF"}
      fontWeight={"bold"}
    >
      <Select.HiddenSelect data-testid="city-select-hidden" />
      <Select.Label data-testid="city-select-label">
        Selecione uma cidade
      </Select.Label>
      <Select.Control background={"#00BFFF"} data-testid="city-select-control">
        <Select.Trigger border="none" data-testid="city-select-trigger">
          <Select.ValueText
            placeholder="Selecione uma cidade"
            data-testid="city-select-value-text"
          />
        </Select.Trigger>
        <Select.IndicatorGroup data-testid="city-select-indicator-group">
          <Select.Indicator data-testid="city-select-indicator" />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal data-testid="city-select-portal">
        <Select.Positioner data-testid="city-select-positioner">
          <Select.Content data-testid="city-select-content">
            {availableCities.map((framework: string, index) => (
              <Select.Item item={framework} key={framework + index}>
                {framework}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};
