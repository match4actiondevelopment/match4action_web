import { lato, sourceSerifPro } from "@/modules/styles/fonts";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import NextImage from "next/image";
import NextLink from "next/link";
import React, { ReactFragment, ReactNode, ReactPortal } from "react";

type ContentfulRichTextPRos = {
  data: any;
  textAlignment?: string;
};

export const ContentfulRichText = ({
  data,
  textAlignment,
}: ContentfulRichTextPRos) => {
  const renderOptions = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node: any, children: any) => {
        return (
          <Typography
            className={sourceSerifPro.className}
            variant="h1"
            sx={(theme) => ({
              [theme.breakpoints.down("sm")]: {
                fontSize: "2rem",
                lineHeight: "2.25rem",
                color: theme.palette.text.primary,
                textAlign: "center",
                marginBottom: "1rem",
              },
              [theme.breakpoints.up("sm")]: {
                fontSize: "3.75rem",
                lineHeight: "3.875rem",
                color: theme.palette.text.primary,
                marginBottom: "1rem",
                textAlign: textAlignment?.toLocaleLowerCase(),
              },
            })}
          >
            {children}
          </Typography>
        );
      },
      [BLOCKS.HEADING_2]: (node: any, children: any) => {
        return (
          <Typography
            className={sourceSerifPro.className}
            variant="h2"
            fontWeight={700}
            sx={(theme) => ({
              [theme.breakpoints.down("sm")]: {
                fontSize: "1.5rem",
                lineHeight: "1.75rem",
                color: theme.palette.text.primary,
                textAlign: "center",
              },
              [theme.breakpoints.up("sm")]: {
                fontSize: "2.5rem",
                lineHeight: "2.5rem",
                color: theme.palette.text.primary,
                textAlign: textAlignment?.toLocaleLowerCase(),
              },
            })}
          >
            {children}
          </Typography>
        );
      },
      [BLOCKS.HEADING_3]: (node: any, children: any) => {
        return (
          <Typography
            className={sourceSerifPro.className}
            variant="h3"
            marginBottom="1rem"
            sx={(theme) => ({
              [theme.breakpoints.down("sm")]: {
                fontSize: "1.25rem",
                lineHeight: "1.5rem",
                color: theme.palette.text.primary,
                textAlign: "center",
              },
              [theme.breakpoints.up("sm")]: {
                fontSize: "2rem",
                lineHeight: "2.5rem",
                color: theme.palette.text.primary,
                textAlign: textAlignment?.toLocaleLowerCase(),
              },
            })}
          >
            {children}
          </Typography>
        );
      },
      [BLOCKS.HEADING_4]: (node: any, children: any) => {
        return (
          <Typography className={lato.className} variant="h4">
            {children}
          </Typography>
        );
      },
      [BLOCKS.HEADING_5]: (node: any, children: any) => {
        return (
          <Typography className={lato.className} variant="h5">
            {children}
          </Typography>
        );
      },
      [BLOCKS.HEADING_6]: (node: any, children: any) => {
        return (
          <Typography className={lato.className} variant="h6">
            {children}
          </Typography>
        );
      },
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
        if (children[0] === "") {
          return <br />;
        }

        return (
          <Typography
            className={lato.className}
            sx={(theme) => ({
              [theme.breakpoints.down("sm")]: {
                fontSize: "1rem",
                lineHeight: "1.25rem",
                color: theme.palette.text.primary,
                textAlign: "center",
              },
              [theme.breakpoints.up("sm")]: {
                fontSize: "1.125rem",
                lineHeight: "1.5rem",
                color: theme.palette.text.primary,
                textAlign: textAlignment?.toLocaleLowerCase(),
              },
            })}
          >
            {children}
          </Typography>
        );
      },
      [BLOCKS.UL_LIST]: (node: any, children: any) => {
        return (
          <List component="ul">
            {React.Children.toArray(
              children?.map((child: any) => (
                // eslint-disable-next-line react/jsx-key
                <ListItem component="li">
                  <Typography component="span" sx={{ marginRight: "3px" }}>
                    -
                  </Typography>
                  {child?.props?.children}
                </ListItem>
              ))
            )}
          </List>
        );
      },
      [BLOCKS.QUOTE]: (node: any, children: any) => {
        return <blockquote>{children}</blockquote>;
      },
      [BLOCKS.OL_LIST]: (node: any, children: any) => {
        return (
          <List component="ol">
            {React.Children.toArray(
              children?.map((child: any, index: number) => (
                // eslint-disable-next-line react/jsx-key
                <ListItem component="li">
                  <Typography component="span" sx={{ marginRight: "3px" }}>
                    {index + 1}.
                  </Typography>
                  {child?.props?.children}
                </ListItem>
              ))
            )}
          </List>
        );
      },
      [BLOCKS.HR]: (node: any, children: any) => {
        return <hr style={{ width: "100%" }} />;
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node: any, children: any) => {
        if (
          node?.data?.target?.sys?.contentType?.sys?.id?.toLowerCase() ===
          "image"
        ) {
          const justifyContent =
            node?.data?.target?.fields?.alignment.toLowerCase();

          return (
            <Box
              position="relative"
              display="flex"
              width="100%"
              justifyContent={justifyContent}
            >
              <Box
                position="relative"
                sx={(theme) => ({
                  [theme.breakpoints.down("sm")]: {
                    height:
                      node?.data?.target?.fields?.image?.fields?.file?.details
                        ?.image?.height * 0.4,
                    width:
                      node?.data?.target?.fields?.image?.fields?.file?.details
                        ?.image?.width * 0.4,
                  },
                  [theme.breakpoints.up("sm")]: {
                    height:
                      node?.data?.target?.fields?.image?.fields?.file?.details
                        ?.image?.height * 0.5,
                    width:
                      node?.data?.target?.fields?.image?.fields?.file?.details
                        ?.image?.width * 0.5,
                  },
                })}
              >
                <NextImage
                  src={`https:${node?.data?.target?.fields?.image?.fields?.file?.url}`}
                  alt={node?.data?.target?.fields?.alt}
                  fill
                />
              </Box>
            </Box>
          );
        }
        const url = node?.data?.target?.fields?.linkToEntry
          ? node?.data?.target?.fields?.linkToEntry?.fields?.slug
          : node?.data?.target?.fields?.url;

        const variant = node?.data?.target?.fields?.variant;

        return (
          <NextLink href={url} style={{ textDecoration: "none" }}>
            {variant === "Link" && (
              <Typography
                fontWeight={700}
                sx={(theme) => ({
                  textDecoration: "underline",
                  color: theme.palette.text.primary,
                  [theme.breakpoints.down("sm")]: {
                    fontSize: "0.75rem",
                    lineHeight: "0.875rem",
                    textAlign: "center",
                  },
                  [theme.breakpoints.up("sm")]: {
                    fontSize: "1.125rem",
                    lineHeight: "1.5rem",
                    textAlign: textAlignment?.toLocaleLowerCase(),
                  },
                })}
              >
                {node?.data?.target?.fields?.label}
              </Typography>
            )}
            {variant === "Button - Solid" && (
              <Box
                className={lato.className}
                sx={(theme) => ({
                  [theme.breakpoints.down("sm")]: {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "39px",
                    background: "#FFD15C",
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                    fontSize: "1rem",
                    ":focus": {
                      background: "#FFD15C",
                    },
                    ":active": {
                      background: "#FFD15C",
                    },
                    textTransform: "capitalize",
                    textDecoration: "none",
                    minWidth: "100%",
                    borderRadius: "5px",
                    marginBottom: "1rem",
                    cursor: "pointer",
                  },
                  [theme.breakpoints.up("sm")]: {
                    display: "inline-block",
                    padding: "14px 28px",
                    background: "#FFD15C",
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
                    fontSize: "1rem",
                    ":focus": {
                      background: "#FFD15C",
                    },
                    ":active": {
                      background: "#FFD15C",
                    },
                    textTransform: "capitalize",
                    textDecoration: "none",
                    borderRadius: "5px",
                    marginBottom: "1rem",
                    cursor: "pointer",
                    marginRight: "1rem",
                  },
                })}
              >
                {node?.data?.target?.fields?.label}
              </Box>
            )}
            {variant === "Button - Outline" && (
              <Box
                className={lato.className}
                sx={(theme) => ({
                  [theme.breakpoints.down("sm")]: {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "40px",
                    background: "#ffffff",
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                    fontSize: "1rem",
                    border: "3px solid #FFD15C",
                    ":focus": {
                      background: "#ffffff",
                      border: "3px solid #FFD15C",
                    },
                    ":active": {
                      background: "#ffffff",
                      border: "3px solid #FFD15C",
                    },
                    textTransform: "capitalize",
                    textDecoration: "none",
                    minWidth: "100%",
                    borderRadius: "5px",
                    marginBottom: "1rem",
                    cursor: "pointer",
                  },
                  [theme.breakpoints.up("sm")]: {
                    display: "inline-block",
                    padding: "12px 28px",
                    background: "#ffffff",
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
                    fontSize: "1rem",
                    border: "3px solid #FFD15C",
                    ":focus": {
                      background: "#ffffff",
                      border: "3px solid #FFD15C",
                    },
                    ":active": {
                      background: "#ffffff",
                      border: "3px solid #FFD15C",
                    },
                    textTransform: "capitalize",
                    textDecoration: "none",
                    borderRadius: "5px",
                    marginBottom: "1rem",
                    cursor: "pointer",
                  },
                })}
              >
                {node?.data?.target?.fields?.label}
              </Box>
            )}
          </NextLink>
        );
      },
      [INLINES.EMBEDDED_ENTRY]: (node: any, children: any) => {
        const url = node?.data?.target?.fields?.linkToEntry
          ? node?.data?.target?.fields?.linkToEntry?.fields?.slug
          : node?.data?.target?.fields?.url;

        return (
          <NextLink href={url}>{node?.data?.target?.fields?.label}</NextLink>
        );
      },
      [INLINES.HYPERLINK]: (node: any, children: any) => {
        return (
          <NextLink href={node?.data?.uri} target="_blank">
            {node?.content[0]?.value} oi
          </NextLink>
        );
      },
      [INLINES.ENTRY_HYPERLINK]: (node: any, children: any) => {
        return <>ENTRY_HYPERLINK</>;
      },
      [INLINES.ASSET_HYPERLINK]: (node: any, children: any) => {
        return <>ASSET_HYPERLINK</>;
      },
      [BLOCKS.EMBEDDED_ASSET]: (node: any, children: any) => {
        return <>EMBEDDED_ASSET</>;
      },
    },
    renderMark: {
      [MARKS.BOLD]: (
        text:
          | boolean
          | ReactNode
          | ReactFragment
          | ReactPortal
          | null
          | undefined
      ) => <strong>{text}</strong>,
    },
  };

  return <>{documentToReactComponents(data, renderOptions)}</>;
};

const calcAspectRatio = (width: any, height: any) => {
  return `${(height / width) * 100}%`;
};
