import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { QueryFunctionContext, useQuery } from "react-query";
import { getStory } from "@/utils/api";
import { Story } from "@/utils/types";
import { Link } from "expo-router";
import { formatDistanceToNow } from "date-fns";

interface StoryItemProps {
  story: Story;
}

const StoryItem = ({ story }: StoryItemProps) => {
  return (
    <Link href={`/(app)/(tabs)/(stories)/${story.id}`} asChild>
      <TouchableOpacity style={styles.container}>
        <Text style={styles.title}>{story.title}</Text>
        <View style={{ flexDirection: "row", marginTop: 5, gap: 8 }}>
          <Text style={styles.author}>{story.by}</Text>
          <Text style={styles.author}>
            {formatDistanceToNow(new Date(story.time * 1000), {
              addSuffix: true,
            })}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default StoryItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  author: {
    fontSize: 12,
    color: "#555",
  },
});
