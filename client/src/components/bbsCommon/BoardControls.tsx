"use client";

import React, { useState, useEffect } from "react";
import NextLink from "next/link";
import {
  Input,
  HStack,
  Flex,
  Text,
  Button,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { PageDetailsDto } from "@/types/menu";
import { PaginationData } from "@/types/common";
import { Edit2 } from "lucide-react";

interface BoardControlsProps {
  pageDetails: PageDetailsDto;
  pagination?: PaginationData | null;
  currentPathId: string;
  keywordInput: string;
  onKeywordChange: (value: string) => void;
  onSearch: () => void;
  onClearSearch: () => void;
  viewMode: "list" | "card";
  onViewModeChange: (mode: "list" | "card") => void;
  currentKeyword?: string; // For showing 'Clear' button
  requestedPageSize: number; // For 'Clear' button to retain page size
  defaultPageSize: number; // Fallback for 'Clear' button
}

const BoardControls: React.FC<BoardControlsProps> = ({
  pageDetails,
  pagination,
  currentPathId,
  keywordInput,
  onKeywordChange,
  onSearch,
  onClearSearch,
  viewMode,
  onViewModeChange,
  currentKeyword,
}) => {
  const [isCmsContext, setIsCmsContext] = useState(false);

  useEffect(() => {
    // Ensure this runs only client-side where window is available
    if (typeof window !== "undefined") {
      setIsCmsContext(window.location.pathname.includes("/cms/"));
    }
  }, []);

  // Calculate shouldShowWriteButton based on context and permissions
  const calculateWriteButtonVisibility = () => {
    if (!currentPathId) return false;

    if (isCmsContext) {
      return true; // Always show in CMS
    }

    // Public context logic
    const boardAuth = pageDetails.boardWriteAuth;
    const skinType = pageDetails.boardSkinType;

    if (skinType === "QNA" || skinType === "FORM") {
      // For QNA/FORM, allow if auth is generally permissive for public users (e.g., USER)
      // Do NOT show if it's ADMIN-only or MEMBER-only for writing on these public Q&A types.
      return boardAuth === "USER"; // Or add other permissive public roles like GUEST
    } else {
      // For other board types (BASIC, PRESS etc.) on public side,
      // only show if write auth is explicitly set to a public/all users role.
      return boardAuth === "USER"; // Or a specific "PUBLIC_WRITE_ALLOWED" role
    }
  };

  const shouldShowWriteButton = calculateWriteButtonVisibility();

  const showViewModeToggleForSkin = ["BASIC", "PRESS"].includes(
    pageDetails.boardSkinType || ""
  );

  return (
    <>
      <Flex
        justify="space-between"
        alignItems={{ base: "stretch", md: "center" }}
        mb={2}
        gap={{ base: 3, md: 4 }}
        direction="row"
      >
        {/* Left Group: Title and Total Posts */}

        {pagination &&
          pagination.totalElements > -1 && ( // Show if totalElements is 0 or more
            <Text
              fontSize={{ base: "md", md: "lg", lg: "xl" }}
              color="#05140E"
              width="100px"
              fontWeight="medium"
            >
              · 총{" "}
              <Text
                as="span"
                fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                color="#4A7CD5"
                fontWeight="semibold"
              >
                {pagination.totalElements}
              </Text>
              건
            </Text>
          )}

        {/* Right Group: Search, View Toggle, Write Button */}
        <Flex
          justifyContent={{ base: "flex-end", sm: "flex-start", md: "flex-end" }}
          alignItems="center"
          width={{ base: "100%", md: "auto" }}
          flexWrap={{ base: "wrap", sm: "nowrap" }} // Allow wrapping on very small screens
        >
          <Input
            placeholder="검색어를 입력하세요"
            value={keywordInput}
            onChange={(e) => onKeywordChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            size="lg"
            width={{ base: "100px", md: "200px", lg: "300px", xl: "400px" }} // Adjusted maxW
            variant="flushed"
            colorPalette="blue"
            borderBottom="1px solid #666"
          />
          <Button
            onClick={onSearch}
            variant="plain"
            colorPalette="blue"
            size="lg"
            borderBottom="1px solid #666"
            borderRadius="0"
          >
            <Icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
              >
                <path
                  d="M15.7771 14.5399L19.5247 18.2866L18.2866 19.5247L14.5399 15.7771C13.1458 16.8947 11.4118 17.5025 9.625 17.5C5.278 17.5 1.75 13.972 1.75 9.625C1.75 5.278 5.278 1.75 9.625 1.75C13.972 1.75 17.5 5.278 17.5 9.625C17.5025 11.4118 16.8947 13.1458 15.7771 14.5399ZM14.0219 13.8906C15.1321 12.7485 15.7522 11.2178 15.75 9.625C15.75 6.24137 13.0086 3.5 9.625 3.5C6.24137 3.5 3.5 6.24137 3.5 9.625C3.5 13.0086 6.24137 15.75 9.625 15.75C11.2178 15.7522 12.7485 15.1321 13.8906 14.0219L14.0219 13.8906Z"
                  fill="#666"
                />
              </svg>
            </Icon>
          </Button>
          {currentKeyword && (
            <Button onClick={onClearSearch} variant="outline" size="lg">
              초기화
            </Button>
          )}
          {currentPathId === "resources" && (
            // 리스트/카드 전환 아이콘 비활성화 (리소스 게시판은 리스트 전용)
            // <HStack gap={0}>
            //   ... 아이콘 영역 주석 처리 ...
            // </HStack>
            <></>
          )}
          {shouldShowWriteButton && (
            <HStack gap={1}>
              <NextLink href={`/bbs/${currentPathId}/write`} passHref>
                <Button
                  colorPalette="blue"
                  size="md"
                  width="40px"
                  height="40px"
                >
                  <Edit2 size={30} />
                </Button>
              </NextLink>
            </HStack>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default BoardControls;
