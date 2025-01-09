import StoryItem from "@/components/stories/StoryItem";
import { getStories } from "@/utils/api";
import { useCallback, useState } from "react";
import {
  Button,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { FlashList } from "@shopify/flash-list";
import { Story } from "@/utils/types";

const Page = () => {
  const queryClient = useQueryClient();

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
    queryKey: ["stories"],
    queryFn: ({ pageParam = 0 }) => getStories("newstories", pageParam),
    getNextPageParam: (lastPage, pages) => pages.length,
  });

  const stories = data?.pages.flatMap((page) => page) || [];

  const renderProduct = useCallback(({ item }: { item: Story }) => {
    return <StoryItem story={item} />;
  }, []);

  const handleRefresh = async () => {
    queryClient.setQueryData(["stories"], (data: any) => ({
      pages: data.pages.slice(0, 1),
      pageParams: data.pageParams.slice(0, 1),
    }));

    refetch();
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlashList
          data={stories}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          estimatedItemSize={100}
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
          onEndReachedThreshold={0.5}
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
