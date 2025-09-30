"use client";

import { Box, Text, Heading, Stack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeroBanner } from "@/components/sections/PageHeroBanner";
import React from "react";

export default function HistoryPage() {

    // 애니메이션 상태 관리
  const [animations, setAnimations] = useState({
    titleText: false,
    mainHeading: false,
    historyItems: Array(4).fill(false), // 4개의 연도 항목에 대한 애니메이션 상태
  });

  // 스크롤 이벤트 처리
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // 각 애니메이션 트리거 지점 설정
      const newHistoryItems = animations.historyItems.map((_, index) => {
        const element = document.getElementById(`history-item-${index}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          // 요소가 화면의 80% 지점에 도달했을 때 애니메이션 시작
          return rect.top <= windowHeight * 0.8;
        }
        return false;
      });

      setAnimations(prev => ({
        titleText: scrollY > 100,
        mainHeading: scrollY > 200,
        historyItems: newHistoryItems,
      }));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 실행

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const companyMenuItems = [
    { name: "회사소개", href: "/knd/company" },
    { name: "연혁", href: "/knd/history" },
  ];

  const years = [2026, 2025, 2024, 2023];
  const historyData = {
    2026: [
      { month: "06", content: "에쓰오일㈜ Shaheen Project 수소 공급(예정)" },
      { month: "03", content: "수소 생산 시설 완공(예정)" },
    ],
    2025: [
      { month: "10", content: "본사 행정동 완공" },
    ],
    2024: [
      { month: "10", content: "독일 기업 Linde 회사와 Lisence 기술 계약 체결 (PSA Unit)" },
      { month: "06", content: "기공식 개최" },
      { month: "05", content: "공장 착공 (온산국가산업단지 내 33,000㎡ 부지)" },
      { month: "02", content: "에쓰오일㈜ 과 Shaheen Project 수소 공급 관련 계약 체결" },
    ],
    2023: [
      { month: "12", content: "울산광역시와 수소공장 투자협약 MOU 체결 (총 2,185억원 규모)" },
      { month: "02", content: "산업용 가스 제조 전문기업인 ㈜덕양에너젠과 특수윤활유 전문기업인 극동유화㈜가 공동으로 출자하여 설립" },
    ],
  };

  return (
    <Box>
      <PageHeroBanner
        title="COMPANY"
        subtitle="K&D Energen의 연혁을 소개합니다"
        backgroundImage="/images/main/hero-image.webp"
        height="600px"
        menuType="custom"
        customMenuItems={companyMenuItems}
        animationType="zoom-in"
      />

      <PageContainer>
        <Stack>
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
                  animations.titleText
                    ? "translateY(0)"
                    : "translateY(50px)"
                }
                opacity={animations.titleText ? 1 : 0}
                style={{ transitionDelay: "0s" }}
              >
              K&D Energen
            </Text>
                          <Heading
                as="h2"
                fontSize={{ base: "24px", lg: "36px", xl: "48px" }}
                fontWeight="bold"
                mb={16}
                lineHeight="1.3"
                textAlign="center"
                transition="all 0.8s ease"
                transform={
                  animations.mainHeading
                    ? "translateY(0)"
                    : "translateY(50px)"
                }
                opacity={animations.mainHeading ? 1 : 0}
                style={{ transitionDelay: "0.2s" }}
              >
              연혁
            </Heading>

            <Box maxW="1200px" mx="auto" position="relative" _before={{
                content: '""',
                position: "absolute",
                left: "50%",
                top: "0",
                bottom: "0",
                width: "1px",
                bg: "#E2E8F0",
                transform: "translateX(-50%)"
              }}>
              {years.map((year, index) => {
                const isEven = index % 2 === 0;
                const events = historyData[year as keyof typeof historyData];
                
                return (
                  <Box 
                    key={year}
                    id={`history-item-${index}`}
                    transition="all 0.8s ease"
                    transform={animations.titleText && animations.mainHeading && animations.historyItems[index] ? "translateY(0)" : "translateY(50px)"}
                    opacity={animations.titleText && animations.mainHeading && animations.historyItems[index] ? 1 : 0}
                    style={{ transitionDelay: `${0.4 + (index * 0.2)}s` }}
                  >
                    <Box 
                      display="flex" 
                      justifyContent="center" 
                      alignItems="flex-start" 
                      position="relative"
                      mb={16}
                    >
                      {/* 왼쪽 영역 */}
                      <Box flex="1" textAlign={!isEven ? "right" : "center"}>
                        {!isEven && (
                          <>
                            <Text
                              fontSize={{ base: "24px", lg: "32px" }}
                              fontWeight="bold"
                              color="#000"
                              mb={4}
                            >
                              {year}
                            </Text>
                            <Stack gap={4}>
                              {events.map((event, eventIndex) => (
                                <Box key={eventIndex}>
                                  <Text fontWeight="bold" color="#666">{event.month}월</Text>
                                  <Text>{event.content}</Text>
                                </Box>
                              ))}
                            </Stack>
                          </>
                        )}
                      </Box>
                      
                      {/* 중앙 포인트 */}
                      <Box
                        w="16px"
                        h="16px"
                        borderRadius="full"
                        bg="#4A7CD5"
                        position="relative"
                        zIndex="1"
                        mt={2}
                        mx={8}
                      />

                      {/* 오른쪽 영역 */}
                      <Box flex="1" textAlign={isEven ? "left" : "center"}>
                        {isEven && (
                          <>
                            <Text
                              fontSize={{ base: "24px", lg: "32px" }}
                              fontWeight="bold"
                              color="#000"
                              mb={4}
                            >
                              {year}
                            </Text>
                            <Stack gap={4}>
                              {events.map((event, eventIndex) => (
                                <Box key={eventIndex}>
                                  <Text fontWeight="bold" color="#666">{event.month}월</Text>
                                  <Text>{event.content}</Text>
                                </Box>
                              ))}
                            </Stack>
                          </>
                        )}
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Stack>
      </PageContainer>
    </Box>
  );
}