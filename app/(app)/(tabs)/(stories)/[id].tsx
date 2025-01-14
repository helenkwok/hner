import { StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useQuery } from "react-query";
import { getStory } from "@/utils/api";
import { Story } from "@/utils/types";
import CommentList from "@/components/comments/CommentList";
import StoryHeader from "@/components/stories/StoryHeader";
import StoryShimmer from "@/components/stories/StoryShimmer";

const Page = () => {
  const { id } = useLocalSearchParams();

  const {
    data: story,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery<Story>({
    queryKey: ["story", id],
    queryFn: () => getStory(Number(id)),
    keepPreviousData: true,
  });

  if (isLoading || isRefetching) {
    return <StoryShimmer />;
  }

  if (!story) {
    return <Text>Story not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: story.title }} />
      <View style={styles.container}>
        <CommentList
          commentIds={story.kids}
          header={<StoryHeader story={story} isRefetching={isRefetching} />}
        />
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
