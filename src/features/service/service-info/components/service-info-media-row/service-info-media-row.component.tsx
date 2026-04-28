import { Image } from "expo-image";
import { ScrollView } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { Flex } from "@/components";
import { ImagePlaceholder } from "@/assets";

import { buildServiceImageSlideUris } from "../../helpers";

type Props = {
  images?: string[];
  primaryImage?: string;
};

const THUMB_SIZE = 100;

export function ServiceInfoMediaRow({ images, primaryImage }: Props) {
  const uris = buildServiceImageSlideUris(primaryImage, images);
  if (uris.length === 0) return null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollInner}
    >
      <Flex gap={1.5} direction="row" alignItems="center">
        {uris.map((uri) => (
          <Image
            key={uri}
            source={{ uri }}
            contentFit="cover"
            style={styles.image}
            placeholderContentFit="cover"
            placeholder={ImagePlaceholder}
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
    borderRadius: 8,
    width: THUMB_SIZE,
    height: THUMB_SIZE,
  },
}));
