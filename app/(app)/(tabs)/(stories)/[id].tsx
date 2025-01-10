import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "react-query";
import { formatDistanceToNow, set } from "date-fns";
import Markdown from "react-native-markdown-display";
import { getStory } from "@/utils/api";

const Page = () => {
  const { id } = useLocalSearchParams();

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

  const handleText = (text: string) => {
    return text.replace(/<p>/g, "\n").replace(/<\/p>/g, "");
  };

  const handleUrl = async () => {
    await WebBrowser.openBrowserAsync(story.url);
  };

  return (
    <ScrollView>
      <Stack.Screen options={{ title: story.title }} />
      <View style={styles.container}>
        <Text style={styles.title}>{story.title}</Text>
        <View style={styles.fieldRow}>
          <Text>{story.by}</Text>
          <View style={styles.score}>
            <Ionicons name="star" size={16} color="#f5ca47" />
            <Text>{story.score}</Text>
          </View>
          <Text>
            {formatDistanceToNow(new Date(story.time * 1000), {
              addSuffix: true,
            })}
          </Text>
        </View>
        {story.text && <Markdown>{handleText(story.text)}</Markdown>}

        <TouchableOpacity onPress={handleUrl}>
          <View style={styles.link}>
            <Text style={styles.linkText}>Read News</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  fieldRow: {
    flexDirection: "row",
    marginTop: 5,
    gap: 8,
  },
  score: {
    flexDirection: "row",
    gap: 4,
  },
  link: {
    padding: 10,
    backgroundColor: "#54a8f2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 5,
  },
  linkText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
