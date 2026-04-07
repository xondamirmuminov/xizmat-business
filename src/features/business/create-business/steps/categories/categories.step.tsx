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

import { getErrorMessage } from "@/lib/helpers";
import { Flex, Empty, Typography } from "@/components";
import { CategoryType, BusinessFormValuesType } from "@/types";

import { CATEGORIES_QUERY } from "./api";
import {
  BusinessFormCategoryCard,
  BusinessFormCategoryCardSkeleton,
} from "./components";

export function BusinessCategoriesFormStep() {
  const { control } = useFormContext<BusinessFormValuesType>();

  const { t } = useTranslation();

  const { data, loading } = useQuery<{ categories: CategoryType[] }>(
    CATEGORIES_QUERY,
  );

  const handleSelectCategory = useCallback(
    (
      id: string,
      selectedCategories: string[],
      onChange: (categories: string[]) => void,
    ) => {
      if (selectedCategories?.includes(id)) {
        const filteredCategories = selectedCategories?.filter(
          (category: string) => category !== id,
        );
        onChange(filteredCategories);
        return;
      }

      onChange([...selectedCategories, id]);
    },
    [],
  );

  const renderCategoryItem = useCallback(
    (
      field: ControllerRenderProps<BusinessFormValuesType, "categoryIds">,
      category: CategoryType,
    ) => {
      const isSelected = field?.value?.includes(category?._id);

      return (
        <BusinessFormCategoryCard
          category={category}
          isSelected={isSelected}
          onSelect={() =>
            handleSelectCategory(
              category?._id,
              field?.value || [],
              field?.onChange,
            )
          }
        />
      );
    },
    [handleSelectCategory],
  );

  const renderCategoriesSkeleton = () => (
    <Flex gap={2} flexWrap="wrap">
      {Array.from({ length: 5 }).map((_, index) => (
        <BusinessFormCategoryCardSkeleton key={"category-skeleton" + index} />
      ))}
    </Flex>
  );

  const handleGetErrorMessage = getErrorMessage(t);

  const categories = data?.categories;

  return (
    <Flex gap={3}>
      <Typography weight="medium" size="display-xs">
        {t("create_business.steps.categories.description")}
      </Typography>
      <Controller
        control={control}
        name="categoryIds"
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
              ListEmptyComponent={
                loading ? renderCategoriesSkeleton() : <Empty />
              }
              renderItem={({ item: category }) =>
                renderCategoryItem(field, category)
              }
            />
          </Flex>
        )}
      />
    </Flex>
  );
}
