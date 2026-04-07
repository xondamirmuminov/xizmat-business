import { NetworkStatus } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client/react";
import { Redirect, useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native-unistyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, ScrollView, RefreshControl } from "react-native";

import { useAuthStore } from "@/store";
import { BusinessType } from "@/types";
import { Flex, Button, Typography } from "@/components";

import { BUSINESSES_QUERY, HAS_BUSINESS_QUERY } from "./api";
import {
  BusinessSelectionCard,
  BusinessSelectionCardSkeleton,
} from "./components";

export function Businesses() {
  const { user, businessId, setBusinessId, setHasBusiness } = useAuthStore();
  const [selectedBusiness, setSelectedBusiness] = useState<string>("");

  const router = useRouter();
  const { t } = useTranslation();

  const { data: hasBusinessData, loading: hasBusinessLoading } = useQuery<{
    hasBusiness: boolean;
  }>(HAS_BUSINESS_QUERY, {
    skip: !user?._id,
    variables: {
      providerId: user?._id,
    },
  });

  const hasBusiness = hasBusinessData?.hasBusiness || false;

  const {
    data: businessesData,
    refetch: refetchBusinesses,
    loading: businessesLoading,
    networkStatus: businessesNetworkStatus,
  } = useQuery<{
    businesses: { items: BusinessType[] };
  }>(BUSINESSES_QUERY, {
    skip: !user?._id || !hasBusiness,
    notifyOnNetworkStatusChange: true,
    variables: { providerId: user?._id },
  });

  const handleSelectBusiness = (businessId: string) => {
    if (selectedBusiness === businessId) {
      setSelectedBusiness("");
      return;
    }

    setSelectedBusiness(businessId);
  };

  const handleStartWorking = () => {
    if (selectedBusiness) {
      setBusinessId(selectedBusiness);
      router.push("/(tabs)");
    }
  };

  useEffect(() => {
    if (!hasBusinessLoading && hasBusinessData) {
      setHasBusiness(hasBusiness);
    }
  }, [hasBusinessData, hasBusinessLoading]);

  if (hasBusinessData && !hasBusiness) {
    return <Redirect href="/no-business" />;
  }

  if (businessId) {
    return <Redirect href="/(tabs)" />;
  }

  const businesses = businessesData?.businesses?.items;
  const refetching = businessesNetworkStatus === NetworkStatus.refetch;

  return (
    <View style={styles.screenContainer}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={refetching}
              onRefresh={refetchBusinesses}
            />
          }
        >
          <Flex gap={3}>
            <Flex gap={0.5}>
              <Typography size="text-xl" weight="semibold">
                {t("businesses_list.title")}
              </Typography>
              <Typography size="text-sm" color="secondary">
                {t("businesses_list.description")}
              </Typography>
            </Flex>
            <Flex>
              {businessesLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <BusinessSelectionCardSkeleton key={`business-` + index} />
                  ))
                : businesses?.map((business) => (
                    <BusinessSelectionCard
                      key={business?._id}
                      business={business}
                      isSelected={selectedBusiness === business?._id}
                      onSelect={() => handleSelectBusiness(business?._id)}
                    />
                  ))}
            </Flex>
          </Flex>
        </ScrollView>
        <Flex style={styles.footerAction}>
          <Button
            size="lg"
            color="secondary"
            disabled={!selectedBusiness}
            onPress={handleStartWorking}
          >
            {t("businesses_list.action")}
          </Button>
        </Flex>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  safeArea: { flex: 1 },
  footerAction: {
    padding: space(2),
  },
  container: {
    paddingBlock: space(3),
    paddingInline: space(2),
  },
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
}));
