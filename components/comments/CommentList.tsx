import { FlatList, StyleSheet, View } from "react-native";
import { ReactNode, useEffect, useState } from "react";
import CommentItem from "./CommentItem";

interface CommentListProps {
  commentIds: number[];
  header?: ReactNode;
}

const CommentList = ({ commentIds, header }: CommentListProps) => {
  const [commentList, setCommentList] = useState<number[]>([]);
  const step = 2;

  useEffect(() => {
    if (commentIds) {
      setCommentList(commentIds.slice(0, step));
    }
  }, [commentIds]);

  const handleNextPage = () => {
    if (commentIds) {
      setCommentList((prev) => [
        ...prev,
        ...commentIds.slice(
          prev.length,
          prev.length > commentIds.length - step
            ? commentIds.length
            : prev.length + step
        ),
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={commentList}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => <CommentItem commentId={item} />}
        ListHeaderComponent={header ? () => header : null}
        onEndReached={handleNextPage}
        onEndReachedThreshold={0.8}
        removeClippedSubviews={false}
      />
    </View>
  );
};

export default CommentList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
