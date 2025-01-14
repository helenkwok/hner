import { useState, useEffect } from "react";
import { getLinkPreview } from "link-preview-js";

const useUrlPreview = (url: string) => {
  const [preview, setPreview] = useState<any>(null);

  useEffect(() => {
    const handlePreview = async (url: string) => {
      const data = await getLinkPreview(url);

      setPreview(data);
    };
    if (url) {
      handlePreview(url);
    }
  }, [url]);

  return preview;
};

export default useUrlPreview;
