"use client";

import { ImageBackground } from "@/modules/components/ImageBackground";
import Box from "@mui/material/Box";
import { ContentfulResolver } from "../contentful/components/ContentfulResolver";
import { PurpleItem } from "../contentful/queries/types";

interface HomePageInterface {
  data: PurpleItem;
}

export default function GenericPage({ data }: HomePageInterface) {
  const heroImage =
    data?.fields?.items[0]?.fields?.items![0]?.fields?.image?.fields?.file?.url;

  return (
    <Box component="main">
      {heroImage && <ImageBackground />}
      <Box
        marginTop="2.75rem"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {data?.fields?.items?.map((item: any) => {
          return <ContentfulResolver key={item?.sys?.id} data={item} />;
        })}
      </Box>
    </Box>
  );
}
