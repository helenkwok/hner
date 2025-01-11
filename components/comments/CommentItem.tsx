import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { useQuery } from "react-query";
import { formatDistanceToNow } from "date-fns";
import RenderHtml from "react-native-render-html";
import { getStory } from "@/utils/api";
import useMarkDown from "@/hooks/useMarkDown";
import CommmentList from "./CommentList";
import CommentShimmer from "./CommentShimmer";

interface CommentItemProps {
  commentId: number;
}

const CommentItem = ({ commentId }: CommentItemProps) => {
  const { width } = useWindowDimensions();

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
        <Text>
          {formatDistanceToNow(new Date(comment.time * 1000), {
            addSuffix: true,
          })}
        </Text>
      </View>
      {comment.text && (
        <RenderHtml contentWidth={width} source={{ html: commentText }} />
      )}
      <CommmentList commentIds={comment.kids} />
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
