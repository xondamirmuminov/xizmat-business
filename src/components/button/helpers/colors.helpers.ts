import { UnistylesThemes } from "react-native-unistyles";

import { ButtonColorEnum, ButtonStateEnum, ButtonVariantEnum } from "../types";

export type GetButtonColorReturnType = {
  color: string;
  borderColor: string;
  backgroundColor: string;
};

export function getButtonColors(
  theme: UnistylesThemes[keyof UnistylesThemes],
  variant: ButtonVariantEnum,
  color: ButtonColorEnum,
  state: ButtonStateEnum = "default",
): GetButtonColorReturnType {
  const palette: Record<
    ButtonColorEnum,
    Partial<
      Record<
        ButtonVariantEnum,
        Partial<Record<ButtonStateEnum, Partial<GetButtonColorReturnType>>>
      >
    >
  > = {
    error: {
      text: {
        disabled: {
          color: theme.colors.slate7,
        },
        press: {
          backgroundColor: theme.colors.red4,
        },
        default: {
          color: theme.colors.red10,
          borderColor: "transparent",
          backgroundColor: "transparent",
        },
      },
      outlined: {
        press: {
          color: theme.colors.red11,
          borderColor: theme.colors.red11,
        },
        default: {
          color: theme.colors.red10,
          backgroundColor: "transparent",
          borderColor: theme.colors.red8,
        },
        disabled: {
          color: theme.colors.slate7,
          borderColor: theme.colors.slate3,
          backgroundColor: theme.colors.slate2,
        },
      },
      ghost: {
        press: {
          borderColor: theme.colors.red5,
          backgroundColor: theme.colors.red5,
        },
        disabled: {
          color: theme.colors.slate7,
          borderColor: theme.colors.slate3,
          backgroundColor: theme.colors.slate2,
        },
        default: {
          color: theme.colors.red10,
          borderColor: theme.colors.errorSubtle,
          backgroundColor: theme.colors.errorSubtle,
        },
      },
      filled: {
        default: {
          color: theme.colors.white,
          borderColor: theme.colors.error,
          backgroundColor: theme.colors.error,
        },
        disabled: {
          color: theme.colors.slate7,
          borderColor: theme.colors.slate3,
          backgroundColor: theme.colors.slate2,
        },
        press: {
          color: theme.colors.slate7,
          borderColor: theme.colors.errorPress,
          backgroundColor: theme.colors.errorPress,
        },
      },
    },
    info: {
      text: {
        disabled: {
          color: theme.colors.slate7,
        },
        press: {
          backgroundColor: theme.colors.blue4,
        },
        default: {
          borderColor: "transparent",
          color: theme.colors.blue10,
          backgroundColor: "transparent",
        },
      },
      outlined: {
        press: {
          color: theme.colors.blue11,
          borderColor: theme.colors.blue11,
        },
        default: {
          color: theme.colors.blue10,
          backgroundColor: "transparent",
          borderColor: theme.colors.blue8,
        },
        disabled: {
          color: theme.colors.slate7,
          borderColor: theme.colors.slate3,
          backgroundColor: theme.colors.slate2,
        },
      },
      ghost: {
        press: {
          borderColor: theme.colors.blue5,
          backgroundColor: theme.colors.blue5,
        },
        disabled: {
          color: theme.colors.slate7,
          borderColor: theme.colors.slate3,
          backgroundColor: theme.colors.slate2,
        },
        default: {
          color: theme.colors.blue10,
          borderColor: theme.colors.infoSubtle,
          backgroundColor: theme.colors.infoSubtle,
        },
      },
      filled: {
        default: {
          color: theme.colors.white,
          borderColor: theme.colors.info,
          backgroundColor: theme.colors.info,
        },
        disabled: {
          color: theme.colors.slate7,
          borderColor: theme.colors.slate3,
          backgroundColor: theme.colors.slate2,
        },
        press: {
          color: theme.colors.slate7,
          borderColor: theme.colors.infoPress,
          backgroundColor: theme.colors.infoPress,
        },
      },
    },
    warning: {
      text: {
        disabled: {
          color: theme.colors.slate7,
        },
        press: {
          backgroundColor: theme.colors.amber3,
        },
        default: {
          borderColor: "transparent",
          color: theme.colors.amber11,
          backgroundColor: "transparent",
        },
      },
      outlined: {
        press: {
          color: theme.colors.amber11,
          borderColor: theme.colors.amber11,
        },
        default: {
          color: theme.colors.amber10,
          backgroundColor: "transparent",
          borderColor: theme.colors.amber7,
        },
        disabled: {
          color: theme.colors.slate7,
          borderColor: theme.colors.slate3,
          backgroundColor: theme.colors.slate2,
        },
      },
      ghost: {
        press: {
          borderColor: theme.colors.amber4,
          backgroundColor: theme.colors.amber4,
        },
        disabled: {
          color: theme.colors.slate7,
          borderColor: theme.colors.slate3,
          backgroundColor: theme.colors.slate2,
        },
        default: {
          color: theme.colors.amber11,
          borderColor: theme.colors.warningSubtle,
          backgroundColor: theme.colors.warningSubtle,
        },
      },
      filled: {
        default: {
          color: theme.colors.white,
          borderColor: theme.colors.warning,
          backgroundColor: theme.colors.warning,
        },
        disabled: {
          color: theme.colors.slate7,
          borderColor: theme.colors.slate3,
          backgroundColor: theme.colors.slate2,
        },
        press: {
          color: theme.colors.slate7,
          borderColor: theme.colors.warningPress,
          backgroundColor: theme.colors.warningPress,
        },
      },
    },
    success: {
      text: {
        disabled: {
          color: theme.colors.slate7,
        },
        press: {
          backgroundColor: theme.colors.green4,
        },
        default: {
          borderColor: "transparent",
          color: theme.colors.green10,
          backgroundColor: "transparent",
        },
      },
      outlined: {
        press: {
          color: theme.colors.green11,
          borderColor: theme.colors.green11,
        },
        default: {
          color: theme.colors.green10,
          backgroundColor: "transparent",
          borderColor: theme.colors.green8,
        },
        disabled: {
          color: theme.colors.slate7,
          borderColor: theme.colors.slate3,
          backgroundColor: theme.colors.slate2,
        },
      },
      ghost: {
        press: {
          borderColor: theme.colors.green5,
          backgroundColor: theme.colors.green5,
        },
        disabled: {
          color: theme.colors.slate7,
          borderColor: theme.colors.slate3,
          backgroundColor: theme.colors.slate2,
        },
        default: {
          color: theme.colors.green10,
          borderColor: theme.colors.successSubtle,
          backgroundColor: theme.colors.successSubtle,
        },
      },
      filled: {
        default: {
          color: theme.colors.white,
          borderColor: theme.colors.success,
          backgroundColor: theme.colors.success,
        },
        disabled: {
          color: theme.colors.slate7,
          borderColor: theme.colors.slate3,
          backgroundColor: theme.colors.slate2,
        },
        press: {
          color: theme.colors.slate7,
          borderColor: theme.colors.successPress,
          backgroundColor: theme.colors.successPress,
        },
      },
    },
    primary: {
      text: {
        disabled: {
          color: theme.colors.slate7,
        },
        press: {
          backgroundColor: theme.colors.primary4,
        },
        default: {
          borderColor: "transparent",
          color: theme.colors.primary10,
          backgroundColor: "transparent",
        },
      },
      outlined: {
        press: {
          color: theme.colors.primary11,
          borderColor: theme.colors.primary11,
        },
        default: {
          color: theme.colors.primary10,
          backgroundColor: "transparent",
          borderColor: theme.colors.primary8,
        },
        disabled: {
          color: theme.colors.slate7,
          borderColor: theme.colors.slate3,
          backgroundColor: theme.colors.slate2,
        },
      },
      ghost: {
        press: {
          borderColor: theme.colors.primary4,
          backgroundColor: theme.colors.primary4,
        },
        disabled: {
          color: theme.colors.slate7,
          borderColor: theme.colors.slate3,
          backgroundColor: theme.colors.slate2,
        },
        default: {
          color: theme.colors.primary10,
          borderColor: theme.colors.primarySubtle,
          backgroundColor: theme.colors.primarySubtle,
        },
      },
      filled: {
        default: {
          color: theme.colors.white,
          borderColor: theme.colors.primary,
          backgroundColor: theme.colors.primary,
        },
        disabled: {
          color: theme.colors.slate7,
          borderColor: theme.colors.slate3,
          backgroundColor: theme.colors.slate2,
        },
        press: {
          color: theme.colors.slate7,
          borderColor: theme.colors.primaryPress,
          backgroundColor: theme.colors.primaryPress,
        },
      },
    },
    secondary: {
      text: {
        disabled: {
          color: theme.colors.slate7,
        },
        press: {
          backgroundColor: theme.colors.slate4,
        },
        default: {
          borderColor: "transparent",
          color: theme.colors.slate12,
          backgroundColor: "transparent",
        },
      },
      outlined: {
        press: {
          borderColor: theme.colors.slate7,
          backgroundColor: theme.colors.slate2,
        },
        default: {
          color: theme.colors.slate12,
          backgroundColor: "transparent",
          borderColor: theme.colors.slate5,
        },
        disabled: {
          color: theme.colors.slate7,
          borderColor: theme.colors.slate3,
          backgroundColor: theme.colors.slate2,
        },
      },
      ghost: {
        press: {
          borderColor: theme.colors.slate5,
          backgroundColor: theme.colors.slate5,
        },
        disabled: {
          color: theme.colors.slate7,
          borderColor: theme.colors.slate3,
          backgroundColor: theme.colors.slate2,
        },
        default: {
          color: theme.colors.slate12,
          borderColor: theme.colors.secondarySubtle,
          backgroundColor: theme.colors.secondarySubtle,
        },
      },
      filled: {
        disabled: {
          color: theme.colors.slate7,
          borderColor: theme.colors.slate3,
          backgroundColor: theme.colors.slate2,
        },
        default: {
          color: theme.colors.background,
          borderColor: theme.colors.secondary,
          backgroundColor: theme.colors.secondary,
        },
        press: {
          color: theme.colors.slate8,
          borderColor: theme.colors.secondaryPress,
          backgroundColor: theme.colors.secondaryPress,
        },
      },
    },
  };

  return {
    ...palette[color][variant]?.default,
    ...palette[color][variant]?.[state],
  } as GetButtonColorReturnType;
}
