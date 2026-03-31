import { useRef, useState } from "react";
import { StyleSheet } from "react-native-unistyles";
import { View, FlatList, Pressable, LayoutRectangle } from "react-native";
import Animated, {
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

import { renderIcon } from "@/lib/helpers";

import { TabsPropsType } from "./types";
import { Typography } from "../typography";

type TabLayout = Record<string, LayoutRectangle>;

function Indicator({
  measurements,
  activeTabKey,
}: {
  activeTabKey: string;
  measurements: TabLayout;
}) {
  const { x, width, height } = measurements[activeTabKey];

  const animationStyle = useAnimatedStyle(() => {
    return {
      left: withTiming(x),
      width: withTiming(width || 0),
    };
  });

  return (
    <Animated.View
      style={[styles.indicator, { top: height }, animationStyle]}
    ></Animated.View>
  );
}

export function Tabs({
  items,
  getLabel,
  activeTab,
  onTabPress,
  containerStyle,
}: TabsPropsType) {
  const tabsLayoutRef = useRef<TabLayout>({});
  const tabContainerRef = useRef<FlatList>(null);
  const [isDoneMeasuring, setIsDoneMeasuring] = useState(false);

  const scrollToIndex = (index: number) => {
    tabContainerRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    });
  };

  const handlePressTabItem = (key: string, index: number) => {
    onTabPress?.(key, index);
    scrollToIndex(index);
  };

  return (
    <FlatList
      horizontal
      data={items}
      ref={tabContainerRef}
      keyExtractor={(tab) => tab?.key}
      showsHorizontalScrollIndicator={false}
      style={[styles.container, containerStyle]}
      contentContainerStyle={styles.tabContainer}
      ListHeaderComponentStyle={styles.indicatorContainer}
      ListHeaderComponent={
        isDoneMeasuring ? (
          <Indicator
            activeTabKey={activeTab}
            measurements={tabsLayoutRef?.current}
          />
        ) : null
      }
      getItemLayout={(items, index) => {
        const key = items ? items[index]?.key : "";

        return {
          index,
          offset: tabsLayoutRef.current[key]?.x || 0,
          length: tabsLayoutRef.current[key]?.width || 0,
        };
      }}
      CellRendererComponent={({ children, item: tab, ...rest }) => (
        <View
          {...rest}
          onLayout={(e) => {
            tabsLayoutRef.current[tab?.key] = { ...e.nativeEvent.layout };

            if (
              Object.keys(tabsLayoutRef?.current)?.length === items?.length &&
              !isDoneMeasuring
            ) {
              setIsDoneMeasuring(true);
            }
          }}
        >
          {children}
        </View>
      )}
      renderItem={({ index, item: tab }) => {
        const isActive = tab.key === activeTab;

        return (
          <Pressable onPress={() => handlePressTabItem(tab?.key, index)}>
            <View style={styles.tabItem}>
              {renderIcon({ icon: tab?.icon, style: styles.tabIcon(isActive) })}
              <Typography
                weight="medium"
                color={isActive ? "primary" : "secondary"}
              >
                {getLabel ? getLabel(tab?.label) : tab?.label}
              </Typography>
            </View>
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  tabContainer: {
    gap: space(2),
  },
  indicatorContainer: {
    position: "absolute",
  },
  tabItem: {
    gap: space(0.5),
    flexDirection: "row",
    alignItems: "center",
    paddingInline: space(0.5),
  },
  indicator: {
    height: 3,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    backgroundColor: colors.primary10,
  },
  container: {
    height: 40,
    flexGrow: 0,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderColor: colors.slate4,
  },
  tabIcon: (isActive: boolean) => ({
    width: 18,
    height: 18,
    color: isActive ? colors.primary11 : colors.textSecondary,
  }),
}));
