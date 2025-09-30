"use client";

import { Box, Text, Heading, Stack, Container, Image } from "@chakra-ui/react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeroBanner } from "@/components/sections/PageHeroBanner";
import { CompanyVisionCircles } from "@/components/sections/CompanyVisionCircles";
import React, { useState, useEffect } from "react";

export default function CompanyPage() {
  // 애니메이션 상태 관리
  const [animations, setAnimations] = useState({
    titleText: false,
    mainHeading: false,
    description: false,
    companyImage: false,
    visionTitle: false,
    visionHeading: false,
    visionCircles: false,
  });

  // 스크롤 이벤트 처리
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // 각 애니메이션 트리거 지점 설정
      setAnimations({
        titleText: scrollY > 100,
        mainHeading: scrollY > 200,
        description: scrollY > 300,
        companyImage: scrollY > 400,
        visionTitle: scrollY > 800,
        visionHeading: scrollY > 900,
        visionCircles: scrollY > 1000,
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 실행

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const companyMenuItems = [
    { name: "회사소개", href: "/knd/company" },
    { name: "회사개요", href: "/knd/company" },
  ];

  return (
    <Box>
      {/* 상단 배너 컴포넌트 */}
      <PageHeroBanner
        title="COMPANY"
        subtitle="K&D Energen을 소개합니다"
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
                animations.titleText ? "translateY(0)" : "translateY(50px)"
              }
              opacity={animations.titleText ? 1 : 0}
            >
              K&D Energen
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
                animations.mainHeading ? "translateY(0)" : "translateY(50px)"
              }
              opacity={animations.mainHeading ? 1 : 0}
            >
              친환경 에너지 화학기업으로서
              <br />
              지속 가능한 미래를 선도하는 <Box as="br" display={{ base: "inline", md: "none" }} />글로벌 수소 전문기업
            </Heading>
            <Text
              fontSize={{ base: "14px", lg: "20px", xl: "24px" }}
              mb={5}
              textAlign="justify"
              transition="all 0.8s ease 0.4s"
              transform={
                animations.description ? "translateY(0)" : "translateY(50px)"
              }
              opacity={animations.description ? 1 : 0}
            >
              케이앤디에너젠은 청정에너지 시대를 여는 수소 전문기업으로서,
              친환경미래선도를 위한 혁신적인 에너지 솔루션을 제공합니다.  <Box as="br" display={{ base: "none", md: "none", lg: "block" }} />
              우리는 수소의 생산부터 공급까지 전과정에서 최고의 기술력과
              안전성을 바탕으로 고객에게 신뢰받는 파트너가 되고자 합니다.
              <Box as="br" /><Box as="br" />
              케이앤디에너젠㈜은 산업용 가스 분야의 전문기업인 ㈜덕양에너젠과 특수윤활유 전문기업인 극동유화㈜가 공동으로 출자하여 2023년 2월 21일에 설립된 기업입니다.
              특히 친환경 수소 제조업에 특화된 기업으로, 시간당 최대 92,000 N㎥의 수소를 생산할 수 있는 단일 시설 기준 국내 최대 규모의 수소 생산 시설을 운영하고 있습니다.
              2023년 12월에는 울산광역시와 MOU를 체결하였으며, 2024년 2월에는 에쓰오일㈜과 Shaheen Project 수소 공급 관련 계약을 체결하였습니다.
              <Box as="br" /><Box as="br" />
              케이앤디에너젠㈜은 울산에 본사를 두고 있는 지역 향토 기업으로, 울산의 수소 경제 및 친환경 미래 선도 도시 발전에 기여하고 있습니다.
              또한 국내 최대 규모의 수소 생산 시설을 통해 에너지 전환의 선두에서 울산은 물론 대한민국의 미래 산업 기반을 새롭게 그려가고 있습니다.
              혁신과 친환경의 명확한 비전을 품고 안정성과 지속 가능성을 동시에 지향하는 케이앤디에너젠㈜은 친환경 수소 경제 시대의 새로운 이정표가 될 것입니다.
            </Text>

            {/* 회사 소개 이미지 */}
            <Box
              mt={{ base: "30px", lg: "80px", xl: "100px" }}
              display="flex"
              justifyContent="center"
              transition="all 0.8s ease 0.6s"
              transform={
                animations.companyImage ? "translateY(0)" : "translateY(50px)"
              }
              opacity={animations.companyImage ? 1 : 0}
            >
              <Image
                src="/images/sub/company_bg.webp"
                alt="케이앤디에너젠 회사 소개"
                width="1300px"
                height="500px"
                objectFit="cover"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                borderRadius="30px"
                boxShadow="lg"
              />
            </Box>
          </Box>
        </Stack>
      </PageContainer>
      <Box
      p={8}
        backgroundColor="#fafafa"
        pt={{ base: "80px", sm: "100px", md: "150px", lg: "180px" }}
        pb={{ base: "80px", sm: "100px", md: "150px", lg: "180px" }}
      >
        <Container maxW="1300px">
          <Box paddingInline="0">
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
                  transition="all 0.8s ease 0.8s"
                  transform={
                    animations.visionTitle
                      ? "translateY(0)"
                      : "translateY(50px)"
                  }
                  opacity={animations.visionTitle ? 1 : 0}
                >
                  VISION AND GOALS
                </Text>
                <Heading
                  as="h2"
                  fontSize={{ base: "24px", lg: "36px", xl: "48px" }}
                  fontWeight="bold"
                  mb={5}
                  lineHeight="1.3"
                  textAlign="center"
                  transition="all 0.8s ease 1.0s"
                  transform={
                    animations.visionHeading
                      ? "translateY(0)"
                      : "translateY(50px)"
                  }
                  opacity={animations.visionHeading ? 1 : 0}
                >
                  수소 산업 선도 기업으로의 <Box as="br" display={{ base: "inline", md: "none" }} />도약을 위한 핵심 목표
                </Heading>
                <Box
                  width="100%"
                  transition="all 0.8s ease 1.2s"
                  transform={
                    animations.visionCircles
                      ? "translateY(0)"
                      : "translateY(50px)"
                  }
                  opacity={animations.visionCircles ? 1 : 0}
                >
                  <CompanyVisionCircles />
                </Box>
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
