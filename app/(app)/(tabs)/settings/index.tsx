import { StyleSheet, View } from "react-native";
import Text from "@/components/common/Text";

const Page = () => {
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
