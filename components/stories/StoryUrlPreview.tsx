import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import React from "react";
import ImageContainer from "@/components/common/ImageContainer";
import { handleUrl } from "@/utils/helpers";
import Text from "@/components/common/Text";

const StoryUrlPreview = ({ preview }: { preview: any }) => {
  const theme = useColorScheme();
  return (
    <TouchableOpacity onPress={() => handleUrl(preview.url)}>
      <View style={styles.previewContainer}>
        {preview && (preview.images || preview.favicons) && (
          <ImageContainer
            source={
              preview.images && preview.images.length > 0
                ? preview.images[0]
                : preview.favicons &&
                  preview.favicons.length > 0 &&
                  preview.favicons[0]
            }
            style={{
              width: "20%",
              height: "auto",
              backgroundColor: theme === "dark" ? "#555" : "#eee",
            }}
            contentFit="contain"
            allowDownscaling={true}
          />
        )}
        {preview && preview.title ? (
          <View style={styles.previewRow}>
            <Text style={styles.previewTitle} numberOfLines={2}>
              {preview.title}
            </Text>
            {preview.siteName && (
              <Text numberOfLines={1}>- {preview.siteName}</Text>
            )}
            <Text numberOfLines={2}>{preview.description}</Text>
          </View>
        ) : (
          <Text>{preview.url}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default StoryUrlPreview;

const styles = StyleSheet.create({
  previewContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    gap: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 8,
  },
  previewRow: {
    width: "75%",
    justifyContent: "center",
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
