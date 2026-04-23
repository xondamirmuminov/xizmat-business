import { View } from "react-native";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { NetworkStatus } from "@apollo/client";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@apollo/client/react";
import { StyleSheet } from "react-native-unistyles";
import { SafeAreaView } from "react-native-safe-area-context";

import { PlusIcon } from "@/assets";
import { useAuthStore } from "@/store";
import { fragmentRegistry } from "@/graphql";
import { ServiceType, PageInfoType } from "@/types";
import {
  Flex,
  Empty,
  Button,
  ServiceCard,
  ServiceCardSkeleton,
} from "@/components";

import { SERVICES_QUERY, SERVICE_CARD_FRAGMENT } from "./api";

fragmentRegistry.register(SERVICE_CARD_FRAGMENT);

export function Services() {
  const { businessId } = useAuthStore();

  const { t } = useTranslation();

  const { data, loading, refetch, networkStatus } = useQuery<{
    services: { items: ServiceType[]; pageInfo: PageInfoType };
  }>(SERVICES_QUERY, {
    notifyOnNetworkStatusChange: true,
    variables: {
      businessId,
    },
  });

  const renderServicesSkeleton = () => {
    return (
      <Flex gap={2}>
        {Array.from({ length: 6 }).map((_, index) => (
          <ServiceCardSkeleton key={"service-skeleton" + index} />
        ))}
      </Flex>
    );
  };

  const services = data?.services?.items;
  const refreshing = networkStatus === NetworkStatus.refetch;

  return (
    <View style={styles.screenContainer}>
      <SafeAreaView style={styles.safeArea} edges={["left", "right", "bottom"]}>
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: t("services.title"),
            headerRight: () => (
              <Button
                color="secondary"
                radius="circular"
                variant="outlined"
                startIcon={<PlusIcon />}
              />
            ),
          }}
        />
        <FlashList
          data={services}
          onRefresh={refetch}
          refreshing={refreshing}
          keyExtractor={(service) => service?._id}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => <View style={{ height: 16 }}></View>}
          ListEmptyComponent={loading ? renderServicesSkeleton() : <Empty />}
          renderItem={({ item: service }) => <ServiceCard service={service} />}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  safeArea: {
    flex: 1,
  },
  listContainer: { flex: 1, paddingBlock: space(3), paddingInline: space(2) },
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
}));
