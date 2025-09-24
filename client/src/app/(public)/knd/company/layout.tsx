import React from "react";
import { Metadata } from "next";
import {
  Box,
  Container,
  Grid,
  GridItem,
  Flex,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";

export const metadata: Metadata = {
  title: "회사소개 | 케이엔디에너젠",
  description:
    "지속가능한 성장과 혁신을 통해 더 나은 미래를 만들어갑니다.",
  keywords: [
    "케이엔디에너젠",
    "케이앤디에너젠",
    "knd",
    "kndenergen",
    "수소가스 제조 및 공급",
    "부산물 활용",
    "친환경 에너지 솔루션",
    "고순도 수소가스",
    "고압스팀",
  ],
  openGraph: {
    title: "회사소개 | 케이엔디에너젠",
    description:
      "지속가능한 성장과 혁신을 통해 더 나은 미래를 만들어갑니다.",
    type: "website",
  },
};

interface CompanyLayoutProps {
  children: React.ReactNode;
}

export default function CompanyLayout({ children }: CompanyLayoutProps) {
  return <>{children}</>;
}
