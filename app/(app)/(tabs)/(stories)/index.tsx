import {
  ActivityIndicator,
  Platform,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { useCallback, useRef, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { FlashList } from "@shopify/flash-list";
import StoryItem from "@/components/stories/StoryItem";
import { getStories } from "@/utils/api";
import { Story } from "@/utils/types";
import { Stack } from "expo-router";
import StoryTypeList from "@/components/stories/StoryTypeList";
import StoryListShimmer from "@/components/stories/StoryListShimmer";
import RefreshButton from "@/components/common/RefreshButton";
import { storyTypes } from "@/utils/contants";
import Text from "@/components/common/Text";

const Page = () => {
  const queryClient = useQueryClient();
  const [storyType, setStoryType] = useState("topstories");
  const flashListRef = useRef(null);

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

  const renderStory = useCallback(({ item }: { item: Story }) => {
    return <StoryItem story={item} />;
  }, []);

  const handleRefresh = async () => {
    queryClient.setQueryData(["stories", storyType], (data: any) => ({
      pages: data.pages.slice(0, 1),
      pageParams: data.pageParams.slice(0, 1),
    }));

    refetch();

    // move to top
    if (Platform.OS === "android") {
      (flashListRef.current as any)?.scrollToOffset(
        { offset: 0, animated: true },
        1000
      );
    } else {
      (flashListRef.current as any)?.scrollToOffset({
        offset: 0,
        animated: false,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: storyTypes.find((type) => type.name === storyType)?.label,
          headerRight: () => (
            <RefreshButton
              refreshing={isLoading || isRefetching}
              onRefresh={handleRefresh}
            />
          ),
        }}
      />
      <StoryTypeList
        storyTypes={storyTypes}
        storyType={storyType}
        setStoryType={setStoryType}
      />
      {isLoading ? (
        <StoryListShimmer length={10} />
      ) : (
        <FlashList
          ref={flashListRef}
          data={stories}
          renderItem={renderStory}
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
          ListFooterComponent={() => (
            <View>
              {isFetchingNextPage ? (
                <ActivityIndicator size="small" color="#ddd" />
              ) : (
                <Text style={styles.endText}>
                  Press Refresh to update story list
                </Text>
              )}
            </View>
          )}
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
  endText: {
    textAlign: "center",
    padding: 10,
  },
});
