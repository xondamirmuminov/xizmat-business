import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

import { QueueIcon, QueueFilledIcon } from "@/assets";

export default function TabLayout() {
  const { t } = useTranslation();
  const { theme } = useUnistyles();

  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
        headerShadowVisible: false,
        tabBarStyle: styles.tabBar,
        headerStyle: styles.screenHeader,
        tabBarLabelStyle: styles.tabBarLabel,
        headerTitleStyle: styles.screenHeaderTitle,
        tabBarActiveTintColor: theme.colors.primary10,
        tabBarInactiveTintColor: theme.colors.textSecondary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: t("tab_bar.queues"),
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <QueueFilledIcon size={24} color={color} />
            ) : (
              <QueueIcon size={24} color={color} />
            ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create(({ colors }) => ({
  screenHeader: { backgroundColor: colors.background },
  tabBarLabel: {
    fontSize: 12,
    fontFamily: "Inter Medium",
  },
  screenHeaderTitle: {
    color: colors.textPrimary,
    fontFamily: "Inter Semibold",
  },
  tabBar: {
    elevation: 0,
    paddingTop: 4,
    borderTopWidth: 0.5,
    borderTopColor: colors.slate4,
    backgroundColor: colors.background,
  },
}));
