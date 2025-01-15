import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { Link } from "expo-router";
import { Story } from "@/utils/types";
import useUrlPreview from "@/hooks/useUrlPreview";
import StoryUrlPreview from "./StoryUrlPreview";
import Text from "@/components/common/Text";
import { handleDate } from "@/utils/helpers";

interface StoryItemProps {
  story: Story;
}

const StoryItem = ({ story }: StoryItemProps) => {
  const preview = useUrlPreview(story.url);
  const theme = useColorScheme();

  return (
    <Link href={`/(app)/(tabs)/(stories)/${story.id}`} asChild>
      <TouchableOpacity>
        <View
          style={[
            styles.container,
            {
              borderBottomColor: theme === "dark" ? "#333" : "#ddd",
            },
          ]}
        >
          <Text style={styles.title}>{story.title}</Text>
          <View style={styles.row}>
            <Text style={styles.field}>{story.by}</Text>
            <Text style={styles.field}>{story.kids && story.kids.length}</Text>
            <Text style={styles.field}>{handleDate(story.time)}</Text>
          </View>
          {preview && <StoryUrlPreview preview={preview} />}
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default StoryItem;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    gap: 8,
  },
  field: {
    fontSize: 16,
    color: "#555",
  },
});
