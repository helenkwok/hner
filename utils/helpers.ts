import * as WebBrowser from "expo-web-browser";
import { formatDate, formatDistanceToNow } from "date-fns";

export const handleText = (text: string) => {
  return text.replace(/<p>/g, "\n").replace(/<\/p>/g, "");
};

export const handleUrl = async (url: string) => {
  await WebBrowser.openBrowserAsync(url);
};

export const handleDate = (time: number) => {
  if (
    formatDistanceToNow(new Date(time * 1000), {
      addSuffix: true,
    }).includes("week")
  ) {
    return formatDate(new Date(time * 1000), "dd MMM yyyy");
  } else {
    return formatDistanceToNow(new Date(time * 1000), {
      addSuffix: true,
    });
  }
};
