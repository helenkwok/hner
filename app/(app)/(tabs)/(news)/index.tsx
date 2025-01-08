import { Button, StyleSheet, Text, View } from "react-native";

const Page = () => {
  return (
    <View style={styles.container}>
      <Text>News</Text>
      <Button
        onPress={() => {
          JSON.parse("<");
        }}
        title="Open Drawer"
      />
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
