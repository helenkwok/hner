import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface StoryTypeListProps {
  storyTypes: { name: string; label: string }[];
  storyType: string;
  setStoryType: (type: string) => void;
}

const StoryTypeList = ({
  storyTypes,
  storyType,
  setStoryType,
}: StoryTypeListProps) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {storyTypes.map((type) => (
          <TouchableOpacity
            key={type.name}
            onPressIn={() => {
              setStoryType(type.name);
            }}
          >
            <View
              style={[
                styles.button,
                {
                  borderBottomColor: type.name === storyType ? "#000" : "#ddd",
                },
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  { color: type.name === storyType ? "#000" : "#555" },
                ]}
              >
                {type.label}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default StoryTypeList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    gap: 10,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
});
