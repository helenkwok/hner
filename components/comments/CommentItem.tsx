import {
  StyleSheet,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";
import { useQuery } from "react-query";
import RenderHtml from "react-native-render-html";
import { getStory } from "@/utils/api";
import useMarkDown from "@/hooks/useMarkDown";
import CommmentList from "./CommentList";
import CommentShimmer from "./CommentShimmer";
import Text from "../common/Text";
import { handleDate } from "@/utils/helpers";

interface CommentItemProps {
  commentId: number;
}

const CommentItem = ({ commentId }: CommentItemProps) => {
  const { width } = useWindowDimensions();
  const theme = useColorScheme();

  const { data: comment, isLoading } = useQuery({
    queryKey: ["comment", commentId.toString()],
    queryFn: () => getStory(commentId),
  });

  const commentText = useMarkDown(comment?.text || "");

  if (isLoading) {
    return <CommentShimmer />;
  }

  if (!comment) {
    return null;
  }

  if (comment.deleted) {
    return (
      <View style={styles.container}>
        <Text>Comment deleted</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.fieldRow}>
        <Text>{comment.by}</Text>
        <Text>{handleDate(comment.time)}</Text>
      </View>
      {comment.text && (
        <RenderHtml
          defaultTextProps={{ selectable: true }}
          contentWidth={width}
          source={{ html: commentText }}
          baseStyle={{ color: theme === "dark" ? "#fff" : "#000" }}
        />
      )}
      <View style={{ flex: 1 }}>
        <CommmentList commentIds={comment.kids} />
      </View>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingLeft: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  shimmer: {
    height: 20,
    width: 100,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    marginBottom: 10,
  },
  fieldRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    gap: 8,
  },
});
