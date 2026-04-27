import { Image } from "expo-image";
import { ScrollView } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { ImagePlaceholder } from "@/assets";
import { Flex } from "@/components";

import { buildServiceImageSlideUris } from "../../helpers";

type Props = {
  primaryImage?: string;
  images?: string[];
};

const THUMB_SIZE = 100;

export function ServiceInfoMediaRow({ primaryImage, images }: Props) {
  const uris = buildServiceImageSlideUris(primaryImage, images);
  if (uris.length === 0) return null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollInner}
    >
      <Flex direction="row" gap={1.5} alignItems="center">
        {uris.map((uri) => (
          <Image
            key={uri}
            source={{ uri }}
            contentFit="cover"
            style={styles.image}
            placeholder={ImagePlaceholder}
            placeholderContentFit="cover"
          />
        ))}
      </Flex>
    </ScrollView>
  );
}

const styles = StyleSheet.create(({ space }) => ({
  scrollInner: {
    paddingVertical: space(0.25),
  },
  image: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: 8,
  },
}));
