import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useQuery } from "react-query";
import { getStory } from "@/utils/api";
import * as WebBrowser from "expo-web-browser";
import { Ionicons } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";

const Page = () => {
  const { id } = useLocalSearchParams();
  const [result, setResult] = useState<any>(null);
  const {
    data: story,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["story", id],
    queryFn: () => getStory(Number(id)),
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const handleUrl = async () => {
    let result = await WebBrowser.openBrowserAsync(story.url);
    setResult(result);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Story ${id}` }} />
      <Text style={styles.title}>{story.title}</Text>
      <View style={{ flexDirection: "row", marginTop: 5, gap: 8 }}>
        <Text>{story.by}</Text>
        <View style={{ flexDirection: "row", gap: 4 }}>
          <Ionicons name="star" size={16} color="#f5ca47" />
          <Text>{story.score}</Text>
        </View>
        <Text>
          {formatDistanceToNow(new Date(story.time * 1000), {
            addSuffix: true,
          })}
        </Text>
      </View>

      <TouchableOpacity onPress={handleUrl}>
        <View style={styles.link}>
          <Text style={styles.linkText}>Read News</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    padding: 10,
    backgroundColor: "#54a8f2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  linkText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
