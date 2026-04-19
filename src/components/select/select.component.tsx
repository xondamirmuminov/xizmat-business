import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Keyboard, ActivityIndicator } from "react-native";
import { useRef, useState, useEffect, useCallback } from "react";

import { ChevronDownIcon } from "@/assets";

import { Input } from "../input";
import { Button } from "../button";
import { SelectModal } from "./components";
import { SelectPropsType, SelectOptionType } from "./types";

export function Select({
  value,
  options,
  loading,
  onChange,
  inputProps,
  sheetTitle,
  size = "md",
}: SelectPropsType) {
  const modalRef = useRef<BottomSheetModal>(null);
  const [selectedOption, setSelectedOption] = useState<SelectOptionType>();

  const handlePresentModal = useCallback(() => {
    modalRef.current?.present();
    Keyboard.dismiss();
  }, []);

  const handleSelect = (option: SelectOptionType) => {
    setSelectedOption(option);
    onChange?.(option?.value);
  };

  useEffect(() => {
    if (selectedOption?.value !== value && value) {
      const foundOption = options?.find((option) => option?.value === value);
      setSelectedOption(foundOption);
    }
  }, [value]);

  return (
    <>
      <Input
        {...inputProps}
        select
        size={size}
        disabled={loading}
        onPress={handlePresentModal}
        value={selectedOption?.label}
        actionIconButton={
          !loading ? (
            <Button
              variant="text"
              radius="circular"
              color="secondary"
              disabled={loading}
              onPress={handlePresentModal}
              startIcon={<ChevronDownIcon />}
            />
          ) : (
            <ActivityIndicator />
          )
        }
      />
      <SelectModal
        ref={modalRef}
        options={options}
        title={sheetTitle}
        onSelect={handleSelect}
        value={selectedOption?.value}
      />
    </>
  );
}
