import { Text as DefaultText, useColorScheme, TextProps } from "react-native";
import { FC } from "react";

const Text: FC<TextProps> = ({ children, style, ...props }) => {
  const theme = useColorScheme();
  const childrenStyle = style;

  return (
    <DefaultText
      style={[
        {
          color: theme === "dark" ? "#fff" : "#000",
        },
        childrenStyle,
      ]}
      {...props}
    >
      {children}
    </DefaultText>
  );
};

export default Text;
