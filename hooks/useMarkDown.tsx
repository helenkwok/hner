import { useEffect, useState } from "react";
import { marked } from "marked";

const useMarkDown = (text: string) => {
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (text) {
      const handleText = async (text: string) => {
        const parsedMarkdown = await marked(text);
        setCommentText(parsedMarkdown);
      };
      handleText(text);
    }
  }, [text]);

  return commentText;
};

export default useMarkDown;
