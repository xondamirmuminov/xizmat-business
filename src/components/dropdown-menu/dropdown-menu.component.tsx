import { StyleSheet, useUnistyles } from "react-native-unistyles";
import {
  View,
  Modal,
  Pressable,
  useWindowDimensions,
  type LayoutRectangle,
} from "react-native";
import {
  useRef,
  useState,
  useCallback,
  cloneElement,
  isValidElement,
  type ReactElement,
} from "react";

import type { IconPropsType } from "@/types";

import { renderIcon } from "@/lib/helpers";

import { Flex } from "../flex";
import { Typography } from "../typography";

export type DropdownMenuItem = {
  key: string;
  label: string;
  disabled?: boolean;
  onPress: () => void;
  destructive?: boolean;
  icon?: ReactElement<IconPropsType>;
};

type DropdownMenuProps = {
  items: DropdownMenuItem[];
  /** Applied to the anchor wrapper for screen readers. */
  anchorAccessibilityLabel?: string;
  /** Single element (e.g. `Button`); receives `onPress` to open the menu. */
  trigger: ReactElement<{ onPress?: () => void }>;
};

const PANEL_MIN_WIDTH = 168;
const PANEL_MAX_WIDTH = 280;
const OFFSET_Y = 4;
const SCREEN_EDGE = 8;

export function DropdownMenu({
  items,
  trigger,
  anchorAccessibilityLabel,
}: DropdownMenuProps) {
  const { theme } = useUnistyles();
  const { width: screenW } = useWindowDimensions();
  const anchorRef = useRef<View>(null);
  const [open, setOpen] = useState(false);
  const [panelLayout, setPanelLayout] = useState<null | LayoutRectangle>(null);

  const close = useCallback(() => setOpen(false), []);

  const openMenu = useCallback(() => {
    anchorRef.current?.measureInWindow((x, y, w, h) => {
      const panelWidth = Math.min(
        PANEL_MAX_WIDTH,
        Math.max(PANEL_MIN_WIDTH, screenW - 2 * SCREEN_EDGE),
      );
      let left = x + w - panelWidth;
      left = Math.max(
        SCREEN_EDGE,
        Math.min(left, screenW - panelWidth - SCREEN_EDGE),
      );
      const top = y + h + OFFSET_Y;
      setPanelLayout({ y: top, x: left, height: 0, width: panelWidth });
      setOpen(true);
    });
  }, [screenW]);

  const runItem = useCallback(
    (item: DropdownMenuItem) => {
      if (item.disabled) return;
      close();
      requestAnimationFrame(() => {
        item.onPress();
      });
    },
    [close],
  );

  const triggerNode = isValidElement(trigger)
    ? cloneElement(trigger, { onPress: openMenu })
    : trigger;

  return (
    <>
      <View
        ref={anchorRef}
        collapsable={false}
        accessibilityRole="button"
        accessibilityLabel={anchorAccessibilityLabel}
        accessible={Boolean(anchorAccessibilityLabel)}
      >
        {triggerNode}
      </View>
      <Modal
        transparent
        visible={open}
        animationType="fade"
        statusBarTranslucent
        onRequestClose={close}
      >
        <Pressable onPress={close} style={styles.backdrop} />
        {panelLayout ? (
          <View
            pointerEvents="box-none"
            style={[
              styles.panelShell,
              {
                top: panelLayout.y,
                left: panelLayout.x,
                width: panelLayout.width,
              },
            ]}
          >
            <View
              style={[
                styles.panel,
                {
                  borderColor: theme.colors.slate4,
                  backgroundColor: theme.colors.background,
                },
              ]}
            >
              {items.map((item, index) => {
                const iconColor = item.disabled
                  ? theme.colors.textSecondary
                  : item.destructive
                    ? theme.colors.error
                    : theme.colors.textPrimary;

                return (
                  <Pressable
                    key={item.key}
                    disabled={item.disabled}
                    onPress={() => runItem(item)}
                    style={({ pressed }) => [
                      styles.item,
                      index > 0 && styles.itemBorder,
                      {
                        opacity: item.disabled ? 0.45 : 1,
                        borderTopColor: theme.colors.slate4,
                        backgroundColor:
                          pressed && !item.disabled
                            ? theme.colors.secondarySubtle
                            : "transparent",
                      },
                    ]}
                  >
                    <Flex
                      gap={1.5}
                      direction="row"
                      alignItems="center"
                      style={styles.itemRow}
                    >
                      {item.icon
                        ? renderIcon({
                            size: 18,
                            icon: item.icon,
                            color: iconColor,
                          })
                        : null}
                      <Typography
                        size="text-sm"
                        weight="medium"
                        style={item.icon ? styles.itemLabelWithIcon : undefined}
                        color={
                          item.disabled
                            ? "secondary"
                            : item.destructive
                              ? "error"
                              : "textPrimary"
                        }
                      >
                        {item.label}
                      </Typography>
                    </Flex>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ) : null}
      </Modal>
    </>
  );
}

const styles = StyleSheet.create(({ space }) => ({
  itemRow: {
    minWidth: 0,
  },
  itemLabelWithIcon: {
    flex: 1,
  },
  panelShell: {
    position: "absolute",
  },
  itemBorder: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  item: {
    paddingVertical: space(1.5),
    paddingHorizontal: space(2),
  },
  panel: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
}));
