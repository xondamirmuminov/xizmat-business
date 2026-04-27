import {
  cloneElement,
  isValidElement,
  useCallback,
  useRef,
  useState,
  type ReactElement,
} from "react";

import { renderIcon } from "@/lib/helpers";
import type { IconPropsType } from "@/types";

import { Flex } from "../flex";
import {
  Modal,
  Pressable,
  View,
  useWindowDimensions,
  type LayoutRectangle,
} from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

import { Typography } from "../typography";

export type DropdownMenuItem = {
  key: string;
  label: string;
  onPress: () => void;
  destructive?: boolean;
  disabled?: boolean;
  icon?: ReactElement<IconPropsType>;
};

type DropdownMenuProps = {
  items: DropdownMenuItem[];
  /** Single element (e.g. `Button`); receives `onPress` to open the menu. */
  trigger: ReactElement<{ onPress?: () => void }>;
  /** Applied to the anchor wrapper for screen readers. */
  anchorAccessibilityLabel?: string;
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
  const [panelLayout, setPanelLayout] = useState<LayoutRectangle | null>(null);

  const close = useCallback(() => setOpen(false), []);

  const openMenu = useCallback(() => {
    anchorRef.current?.measureInWindow((x, y, w, h) => {
      const panelWidth = Math.min(
        PANEL_MAX_WIDTH,
        Math.max(PANEL_MIN_WIDTH, screenW - 2 * SCREEN_EDGE),
      );
      let left = x + w - panelWidth;
      left = Math.max(SCREEN_EDGE, Math.min(left, screenW - panelWidth - SCREEN_EDGE));
      const top = y + h + OFFSET_Y;
      setPanelLayout({ x: left, y: top, width: panelWidth, height: 0 });
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
        accessible={Boolean(anchorAccessibilityLabel)}
        accessibilityLabel={anchorAccessibilityLabel}
        accessibilityRole="button"
      >
        {triggerNode}
      </View>
      <Modal
        visible={open}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={close}
      >
        <Pressable style={styles.backdrop} onPress={close} />
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
                        borderTopColor: theme.colors.slate4,
                        backgroundColor:
                          pressed && !item.disabled
                            ? theme.colors.secondarySubtle
                            : "transparent",
                        opacity: item.disabled ? 0.45 : 1,
                      },
                    ]}
                  >
                    <Flex
                      direction="row"
                      alignItems="center"
                      gap={1.5}
                      style={styles.itemRow}
                    >
                      {item.icon
                        ? renderIcon({
                            icon: item.icon,
                            size: 18,
                            color: iconColor,
                          })
                        : null}
                      <Typography
                        size="text-sm"
                        weight="medium"
                        color={
                          item.disabled
                            ? "secondary"
                            : item.destructive
                              ? "error"
                              : "textPrimary"
                        }
                        style={item.icon ? styles.itemLabelWithIcon : undefined}
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
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  panelShell: {
    position: "absolute",
  },
  panel: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  item: {
    paddingVertical: space(1.5),
    paddingHorizontal: space(2),
  },
  itemBorder: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  itemRow: {
    minWidth: 0,
  },
  itemLabelWithIcon: {
    flex: 1,
  },
}));
