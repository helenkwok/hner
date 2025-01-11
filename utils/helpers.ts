import * as WebBrowser from "expo-web-browser";

export const handleText = (text: string) => {
  return text.replace(/<p>/g, "\n").replace(/<\/p>/g, "");
};

export const handleUrl = async (url: string) => {
  await WebBrowser.openBrowserAsync(url);
};
