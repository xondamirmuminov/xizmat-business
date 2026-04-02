import { isEqual } from "lodash";
import { View } from "react-native";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client/react";
import { FlashList } from "@shopify/flash-list";
import { useFormContext } from "react-hook-form";

import { CategoryType } from "@/types";
import { Flex, Empty, Typography } from "@/components";

import { CATEGORIES_QUERY } from "./api";
import {
  BusinessFormCategoryCard,
  BusinessFormCategoryCardSkeleton,
} from "./components";

export function BusinessCategoriesFormStep() {
  const { setValue, getValues } = useFormContext();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const { t } = useTranslation();

  const { data, loading } = useQuery<{ categories: CategoryType[] }>(
    CATEGORIES_QUERY,
  );

  const handleSelectCategory = (id: string) => {
    if (selectedCategories?.includes(id)) {
      const filteredCategories = selectedCategories?.filter(
        (category: string) => category !== id,
      );
      setSelectedCategories(filteredCategories);
      setValue("categories", filteredCategories);
      return;
    }

    setSelectedCategories((prev) => [...prev, id]);
    setValue("categories", [...selectedCategories, id]);
  };

  const renderCategoriesSkeleton = () => (
    <Flex gap={2} flexWrap="wrap">
      {Array.from({ length: 5 }).map((_, index) => (
        <BusinessFormCategoryCardSkeleton key={"category-skeleton" + index} />
      ))}
    </Flex>
  );

  useEffect(() => {
    const defaultCategories = getValues("categories");
    if (
      defaultCategories?.length &&
      !isEqual(defaultCategories, selectedCategories)
    ) {
      setSelectedCategories(defaultCategories);
    }
  }, []);

  const categories = data?.categories;

  return (
    <Flex gap={3}>
      <Typography weight="medium" size="display-xs">
        {t("create_business.steps.categories.description")}
      </Typography>
      <FlashList
        data={categories}
        ItemSeparatorComponent={() => <View style={{ height: 16 }}></View>}
        ListEmptyComponent={loading ? renderCategoriesSkeleton() : <Empty />}
        renderItem={({ item: category }) => {
          const isSelected = selectedCategories?.includes(category?._id);

          return (
            <BusinessFormCategoryCard
              category={category}
              isSelected={isSelected}
              onSelect={handleSelectCategory}
            />
          );
        }}
      />
    </Flex>
  );
}
