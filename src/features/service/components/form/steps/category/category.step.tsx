import { isEmpty } from "lodash";
import { View } from "react-native";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client/react";
import { FlashList } from "@shopify/flash-list";
import {
  Controller,
  useFormContext,
  ControllerRenderProps,
} from "react-hook-form";

import { useAuthStore } from "@/store";
import { getErrorMessage } from "@/lib/helpers";
import {
  BusinessType,
  CategoryType,
  LocalizedTextType,
  ServiceFormValuesType,
} from "@/types";
import {
  Flex,
  Empty,
  Typography,
  SelectableCard,
  SelectableCardSkeleton,
} from "@/components";

import { CATEGORIES_QUERY, BUSINESS_CATEGORIES_QUERY } from "./api";

export function ServiceCategoryFormStep() {
  const { businessId } = useAuthStore();

  const { control, setValue } = useFormContext<ServiceFormValuesType>();

  const { t, i18n } = useTranslation();
  const locale = i18n.language as keyof LocalizedTextType;

  const { data: businessData, loading: businessLoading } = useQuery<{
    business: BusinessType;
  }>(BUSINESS_CATEGORIES_QUERY, { variables: { businessId } });

  const parentCategoryIds = (businessData?.business?.categories || [])?.map(
    (category) => category?._id,
  );

  const { data, loading } = useQuery<{ categories: CategoryType[] }>(
    CATEGORIES_QUERY,
    {
      skip: isEmpty(parentCategoryIds),
      variables: { parentIds: parentCategoryIds },
    },
  );

  const handleSelectCategory = useCallback(
    (
      category: CategoryType,
      selectedCategory: string,
      onChange: (category?: string) => void,
    ) => {
      if (selectedCategory === category?._id) {
        onChange(undefined);
        setValue("title", category?.title);
        setValue("category", undefined);
        return;
      }

      onChange(category?._id);
      setValue("title", category?.title);
      setValue("category", category);
    },
    [setValue],
  );

  const renderCategoryItem = useCallback(
    (
      field: ControllerRenderProps<ServiceFormValuesType, "categoryId">,
      category: CategoryType,
    ) => {
      const isSelected = field?.value === category?._id;

      return (
        <SelectableCard
          isSelected={isSelected}
          onSelect={() =>
            handleSelectCategory(category, field?.value, field?.onChange)
          }
          item={{
            ...category,
            title: category?.title[locale],
            subTitle: `${category?.childrenCount} ${t("create_service.steps.category.services_count")}`,
          }}
        />
      );
    },
    [handleSelectCategory],
  );

  const renderCategoriesSkeleton = () => (
    <Flex gap={2} flexWrap="wrap">
      {Array.from({ length: 5 }).map((_, index) => (
        <SelectableCardSkeleton key={"category-skeleton" + index} />
      ))}
    </Flex>
  );

  const handleGetErrorMessage = getErrorMessage(t);

  const categories = data?.categories;

  return (
    <Flex gap={3}>
      <Typography weight="medium" size="display-xs">
        {t("create_service.steps.category.description")}
      </Typography>
      <Controller
        control={control}
        name="categoryId"
        rules={{ required: true }}
        render={({ field, fieldState: { error } }) => (
          <Flex gap={1}>
            {!!error && (
              <Typography color="error" size="text-sm">
                {handleGetErrorMessage(error)}
              </Typography>
            )}
            <FlashList
              data={categories}
              keyExtractor={(category) => category?._id}
              ItemSeparatorComponent={() => (
                <View style={{ height: 16 }}></View>
              )}
              renderItem={({ item: category }) =>
                renderCategoryItem(field, category)
              }
              ListEmptyComponent={
                loading || businessLoading ? (
                  renderCategoriesSkeleton()
                ) : (
                  <Empty />
                )
              }
            />
          </Flex>
        )}
      />
    </Flex>
  );
}
