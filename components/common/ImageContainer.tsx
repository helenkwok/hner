import { useEffect, useState } from "react";
import { useImage, Image, ImageStyle, ImageContentFit } from "expo-image";
import ShimmerPlaceholder from "@/components/common/ShimmerPlaceholder";

const ImageContainer = ({
  source,
  style,
  contentFit,
  allowDownscaling,
}: {
  source: string;
  style: ImageStyle;
  contentFit?: ImageContentFit | undefined;
  allowDownscaling?: boolean;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const image = useImage(source, {
    maxWidth: 800,
    onError(error, retry) {
      setIsLoaded(true);
    },
  });

  useEffect(() => {
    if (image) {
      setIsLoaded(true);
    }
  }, [image]);

  if (!image && !isLoaded) {
    return (
      <ShimmerPlaceholder
        style={{
          width: style.width,
          height: style.height,
        }}
      />
    );
  }

  if (!image) {
    return null;
  }

  return (
    <Image
      source={image}
      style={style}
      contentFit={contentFit}
      allowDownscaling={allowDownscaling}
    />
  );
};

export default ImageContainer;
