"use client";

import { Box, Text, Heading, Grid, Stack } from "@chakra-ui/react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeroBanner } from "@/components/sections/PageHeroBanner";
import React, { useState, useEffect } from "react";

export default function CompanyPage() {
  // 애니메이션 상태 관리
  const [animations, setAnimations] = useState({
    // 본점 섹션
    titleText1: false,
    mainHeading1: false,
    map1: false,
    info1: false,
    // 사업장 섹션
    titleText2: false,
    mainHeading2: false,
    map2: false,
    info2: false,
  });

  // 스크롤 이벤트 처리
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // 각 애니메이션 트리거 지점 설정
      setAnimations({
        // 본점 섹션 (첫 번째)
        titleText1: scrollY > 100,
        mainHeading1: scrollY > 200,
        map1: scrollY > 300,
        info1: scrollY > 400,
        // 사업장 섹션 (두 번째)
        titleText2: scrollY > 800,
        mainHeading2: scrollY > 900,
        map2: scrollY > 1000,
        info2: scrollY > 1100,
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 실행

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const companyMenuItems = [
    { name: "회사소개", href: "/knd/company" },
    { name: "오시는 길", href: "/knd/location" },
  ];

  return (
    <Box>
      {/* 상단 배너 컴포넌트 */}
      <PageHeroBanner
        title="COMPANY"
        subtitle="K&D Energen의 위치를 소개합니다"
        backgroundImage="/images/main/hero-image.webp"
        height="600px"
        menuType="custom"
        customMenuItems={companyMenuItems}
        animationType="zoom-in"
      />

      <PageContainer>
        <Stack>
          {/* 회사 개요 섹션 */}
          <Box>
            <Text
              fontSize={{ base: "16px", lg: "20px", xl: "24px" }}
              fontWeight="bold"
              mb={10}
              textAlign="center"
              color="#4A7CD5"
              fontFamily="Montserrat, sans-serif !important"
              letterSpacing="2"
              transition="all 0.8s ease"
              transform={
                animations.titleText1 ? "translateY(0)" : "translateY(50px)"
              }
              opacity={animations.titleText1 ? 1 : 0}
            >
              LOCATION
            </Text>
            <Heading
              as="h2"
              fontSize={{ base: "24px", lg: "36px", xl: "48px" }}
              fontWeight="bold"
              mb={5}
              lineHeight="1.3"
              textAlign="center"
              transition="all 0.8s ease 0.2s"
              transform={
                animations.mainHeading1 ? "translateY(0)" : "translateY(50px)"
              }
              opacity={animations.mainHeading1 ? 1 : 0}
            >
              케이앤디에너젠{" "}
              <Text
                as="span"
                backgroundColor="#4A7CD5"
                color="#fff"
                fontWeight="800"
              >
                본점 소재지
              </Text>{" "}
              오시는 길
            </Heading>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={{ base: "30px", lg: "80px", xl: "100px" }}
              mb={"80px"}
              transition="all 0.8s ease 0.4s"
              transform={animations.map1 ? "translateY(0)" : "translateY(50px)"}
              opacity={animations.map1 ? 1 : 0}
            >
              <Box
                borderRadius="lg"
                boxShadow="lg"
                overflow="hidden"
                maxW="100%"
                w="100%"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3250.7176672726046!2d129.35485727622302!3d35.437023343349544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3567d4815d0ceb55%3A0x1ab9a294f86f4bbc!2z7Jq47IKw6rSR7Jet7IucIOyauOyjvOq1sCDsmKjsgrDsnY0g7IKw7JWU66asIDE0OA!5e0!3m2!1sko!2skr!4v1755842815268!5m2!1sko!2skr"
                  width="100%"
                  height="450"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </Box>
            </Box>

            {/* 회사 정보 및 교통안내 섹션 */}
            <Box
              mx="auto"
              transition="all 0.8s ease 0.6s"
              transform={
                animations.info1 ? "translateY(0)" : "translateY(50px)"
              }
              opacity={animations.info1 ? 1 : 0}
            >
              {/* 헤더 */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={6}
                pb={4}
                borderBottom="2px solid #333"
              >
                <Heading
                  fontSize={{ base: "24px", md: "32px" }}
                  fontWeight="bold"
                  color="#333"
                >
                  K&D ENERGEN
                </Heading>
                <Box
                  as="button"
                  bg="#4A7CD5"
                  color="white"
                  px={6}
                  py={3}
                  borderRadius="full"
                  fontSize="16px"
                  fontWeight="bold"
                  _hover={{ bg: "#1454C7", cursor: "pointer" }}
                  display="flex"
                  alignItems="center"
                  gap={2}
                  onClick={() =>
                    window.open(
                      "https://maps.app.goo.gl/rBkoVoxoMCa78K9q9",
                      "_blank"
                    )
                  }
                >
                  View Map
                </Box>
              </Box>

              {/* 주소 정보 */}
              <Grid
                templateColumns={{ base: "1fr", md: "1fr 1fr" }}
                gap={8}
                mb={6}
              >
                <Box>
                  <Text fontSize="18px" fontWeight="bold" color="#333" mb={3}>
                    ADDRESS
                  </Text>
                  <Text fontSize="16px" color="#666" lineHeight="1.6">
                    울산광역시 울주군 온산읍 산암로 246
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="18px" fontWeight="bold" color="#333" mb={3}>
                    버스
                  </Text>
                  <Box mb={3}>
                    <Text fontSize="16px" color="#666" mb={2}>
                      518, 725
                    </Text>
                    <Text fontSize="14px" color="#999">
                      이영산업기계 하차 도보 약 10분
                    </Text>
                  </Box>
                </Box>
              </Grid>

              {/* 연락처 정보 */}
              <Box mt={6} pt={4} borderTop="1px solid #f0f0f0">
                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
                  <Box>
                    <Text fontSize="16px" fontWeight="bold" color="#333" mb={2}>
                      대표전화
                    </Text>
                    <Text fontSize="16px" color="#4A7CD5" fontWeight="medium">
                      052-237-8190
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="16px" fontWeight="bold" color="#333" mb={2}>
                      FAX
                    </Text>
                    <Text fontSize="16px" color="#4A7CD5" fontWeight="medium">
                      052-237-8191
                    </Text>
                  </Box>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Stack>
      </PageContainer>
    </Box>
  );
}
