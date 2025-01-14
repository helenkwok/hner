import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import Text from "../common/Text";

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
  const theme = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        {
          borderBottomColor: theme === "dark" ? "#333" : "#ddd",
        },
      ]}
    >
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
                  borderBottomColor:
                    type.name === storyType
                      ? theme === "dark"
                        ? "#ddd"
                        : "#333"
                      : theme === "dark"
                      ? "#000"
                      : "#fff",
                },
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color:
                      type.name === storyType
                        ? theme === "dark"
                          ? "#fff"
                          : "#000"
                        : "#777",
                  },
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
    gap: 10,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
