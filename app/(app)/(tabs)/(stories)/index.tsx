import {
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCallback, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { FlashList } from "@shopify/flash-list";
import StoryItem from "@/components/stories/StoryItem";
import { getStories } from "@/utils/api";
import { Story } from "@/utils/types";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Page = () => {
  const queryClient = useQueryClient();
  const [storyType, setStoryType] = useState("newstories");

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["stories", storyType],
    queryFn: ({ pageParam = 0 }) => getStories(storyType, pageParam),
    getNextPageParam: (lastPage, pages) => pages.length,
  });

  const stories = data?.pages.flat() || [];

  const keyExtractor = useCallback(
    (item: Story, i: number) => `${i}-${item.id}`,
    []
  );

  const renderProduct = useCallback(({ item }: { item: Story }) => {
    return <StoryItem story={item} />;
  }, []);

  const handleRefresh = async () => {
    queryClient.setQueryData(["stories", storyType], (data: any) => ({
      pages: data.pages.slice(0, 1),
      pageParams: data.pageParams.slice(0, 1),
    }));

    refetch();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: storyType === "newstories" ? "New Stories" : "Top Stories",
          headerLeft: () => (
            <TouchableOpacity onPress={handleRefresh}>
              <Ionicons name="refresh" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                setStoryType((prev) =>
                  prev === "newstories" ? "topstories" : "newstories"
                )
              }
            >
              <Text>
                {storyType === "newstories" ? "Top Stories" : "New Stories"}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlashList
          data={stories}
          renderItem={renderProduct}
          keyExtractor={keyExtractor}
          estimatedItemSize={70}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={handleRefresh}
            />
          }
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.3}
        />
      )}
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
