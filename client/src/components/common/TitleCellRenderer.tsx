"use client";

import React from "react";
import { Flex, Text, HStack, Icon } from "@chakra-ui/react";
import { type ICellRendererParams } from "ag-grid-community";
import { LuImage, LuPaperclip } from "react-icons/lu";
import { Post, BoardArticleCommon } from "@/types/api";
import PostTitleDisplay, { ArticleDisplayData } from "./PostTitleDisplay";
import { useBreakpointValue } from "@chakra-ui/react";

interface TitleCellRendererProps
  extends ICellRendererParams<BoardArticleCommon> {}

const TitleCellRenderer: React.FC<TitleCellRendererProps> = (params) => {
  const postData = params.data;
  const disableTruncateDesktop =
    useBreakpointValue({ base: false, md: false, lg: true }) || false;
  if (!postData) {
    return (
      <Flex w="100%" h="100%" alignItems="center" justifyContent="flex-start">
        <span>{params.value}</span>
      </Flex>
    );
  }

  return (
    <PostTitleDisplay
      title={params.value as string}
      postData={postData as ArticleDisplayData}
      disableTruncate={disableTruncateDesktop}
    />
  );
};

export default TitleCellRenderer;
