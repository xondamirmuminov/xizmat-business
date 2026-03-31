import { useState } from "react";

import { EyeIcon, EyeOffIcon } from "@/assets";

import { Button } from "../button";
import { Input, InputPropsType } from "../input";

export function PasswordInput({ ...props }: InputPropsType) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisible = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <Input
      {...props}
      secureTextEntry={!isPasswordVisible}
      actionIconButton={
        <Button
          variant="text"
          color="secondary"
          onPress={togglePasswordVisible}
          startIcon={isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
        />
      }
    />
  );
}
