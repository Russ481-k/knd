import {
  Box,
  Text,
  Heading,
  SystemStyleObject,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  RefObject,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useRouter } from "next/navigation";

interface CompanyCard {
  id: string;
  title: string;
  description: string;
  link?: string;
}

interface CompanySectionProps {
  sectionRef: RefObject<HTMLDivElement>;
  companyCards: CompanyCard[];
  currentCardIndex: number;
  setCurrentCardIndex: Dispatch<SetStateAction<number>>;
  cardsRef: RefObject<HTMLDivElement>;
}

const CompanyCard = ({
  card,
  index,
  currentCardIndex,
  onMouseEnter,
  onMouseLeave,
}: {
  card: CompanyCard;
  index: number;
  currentCardIndex: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => {
  const router = useRouter();
  const isCurrent = index === currentCardIndex;
  const isBefore = index < currentCardIndex;
  const isAfter = index > currentCardIndex;

  const handleCardClick = () => {
    if (card.link && isCurrent) {
      router.push(card.link);
    }
  };

  let cardStyles: SystemStyleObject = {
    width: { base: "280px", md: "400px", lg: "600px" },
    height: { base: "250px", md: "300px", lg: "350px" },
    textAlign: "left",
    p: { base: "20px 25px", md: "35px 45px", lg: "50px 60px" },
    position: "relative",
    cursor: isCurrent ? "pointer" : "default",
    border: "none",
    borderRadius: { base: "15px", lg: "20px" },
    transition: "transform 0.3s ease-out, opacity 0.3s ease-out, filter 0.3s ease-out",
    willChange: "transform, opacity, filter",
    backfaceVisibility: "hidden",
    overflow: "hidden",
  };

  // 현재 활성 카드
  if (isCurrent) {
    cardStyles = {
      ...cardStyles,
      bg: "linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.95))",
      filter: "none",
      opacity: 1,
      transform: "translate3d(0, 0, 0) scale(1.05)",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(74, 124, 213, 0.2)",
      zIndex: 10,
      _hover: {
        transform: "translate3d(0, -2px, 0) scale(1.08)",
        boxShadow: "0 12px 20px rgba(0, 0, 0, 0.2), 0 0 0 2px rgba(74, 124, 213, 0.3)",
        "& .more-button": {
          opacity: 1,
          transform: "translateX(0)",
        },
        "& .more-button > p:last-of-type": {
          transform: "translateX(5px)",
        },
      },
    };
  }
  // 이전 카드들
  else if (isBefore) {
    cardStyles = {
      ...cardStyles,
      bg: "rgba(255, 255, 255, 0.98)",
      filter: "blur(2px)",
      opacity: 0.7,
      transform: "translate3d(-10px, 0, 0) scale(0.95) rotateY(8deg)",
    };
  }
  // 다음 카드들
  else if (isAfter) {
    cardStyles = {
      ...cardStyles,
      bg: "rgba(255, 255, 255, 0.98)",
      filter: "blur(2px)",
      opacity: 0.7,
      transform: "translate3d(10px, 0, 0) scale(0.95) rotateY(-8deg)",
    };
  }
  // 기본 (비활성) 카드
  else {
    cardStyles = {
      ...cardStyles,
      bg: "rgba(255, 255, 255, 0.98)",
      filter: "blur(2px)",
      opacity: 0.7,
      transform: "translate3d(0, 0, 0) scale(0.95)",
    };
  }

  // 공통 스타일 추가 (단순화)
  if (!isCurrent) {
    cardStyles = {
      ...cardStyles,
      _hover: {
        filter: "blur(3px)",
        opacity: 0.8,
        "& .more-button": {
          opacity: 0,
          transform: "translateX(0)",
        },
      },
    };
  }

  return (
    <Box
      {...cardStyles}
      onClick={handleCardClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Box
        fontSize={{ base: "18px", md: "20px", lg: "24px" }}
        fontWeight="700"
        color="#4A7CD5"
        mb={{ base: "8px", lg: "10px" }}
        fontFamily="Montserrat, sans-serif"
        opacity="0.8"
        position="relative"
        display="inline-block"
      >
        {card.id}
      </Box>
      <Heading
        as="h3"
        fontSize={{ base: "20px", md: "24px", lg: "28px" }}
        fontWeight="600"
        mb={{ base: "15px", md: "20px", lg: "30px" }}
        lineHeight="1.3"
        color="#1A1A1A"
        transition="color 0.3s ease"
      >
        {card.title}
      </Heading>
      <Text
        fontSize={{ base: "14px", md: "16px", lg: "20px" }}
        lineHeight="1.4"
        m="0"
        color="#555"
        textAlign="justify"
      >
        {card.description}
      </Text>
      <Box
        className="more-button"
        position="absolute"
        bottom={{ base: "15px", md: "20px", lg: "30px" }}
        right={{ base: "20px", md: "30px", lg: "40px" }}
        color="#4A7CD5"
        fontSize={{ base: "14px", md: "16px", lg: "18px" }}
        fontFamily="Montserrat, sans-serif"
        opacity="0"
        transform="translateX(-20px)"
        transition="all 0.3s ease"
        display="flex"
        alignItems="center"
        gap={{ base: "4px", lg: "8px" }}
        pointerEvents={isCurrent ? "auto" : "none"}
      >
        <Text
          fontSize={{ base: "14px", md: "16px", lg: "18px" }}
          fontFamily="Pretendard, sans-serif"
          textTransform="uppercase"
          fontWeight="600"
          transition="all 0.3s ease"
        >
          MORE
        </Text>
        <Text fontFamily="sans-serif" transition="transform 0.3s ease">
          →
        </Text>
      </Box>
    </Box>
  );
};

export default function CompanySection({
  sectionRef,
  companyCards,
  currentCardIndex,
  setCurrentCardIndex,
  cardsRef,
}: CompanySectionProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, index: 0 });
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // 애니메이션 상태 관리
  const [animations, setAnimations] = useState({
    titleText: false,
    mainHeading: false,
    description: false,
    cardsContainer: false,
  });

  // Intersection Observer로 애니메이션 트리거 (App.tsx와 통일)
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const ratio = entry.intersectionRatio;
            // 단계별 애니메이션 트리거
            setAnimations({
              titleText: ratio > 0.1,
              mainHeading: ratio > 0.2,
              description: ratio > 0.3,
              cardsContainer: ratio > 0.4,
            });
          } else {
            // 섹션이 벗어나면 애니메이션 리셋
            setAnimations({
              titleText: false,
              mainHeading: false,
              description: false,
              cardsContainer: false,
            });
          }
        });
      },
      {
        threshold: [0.1, 0.2, 0.3, 0.4, 0.5],
        rootMargin: "0px",
      }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // 반응형 카드 너비 계산
  const cardWidth = useBreakpointValue({ base: 280, md: 400, lg: 600 }) || 600;
  const cardSpacing = useBreakpointValue({ base: 30, md: 40, lg: 40 }) || 40; // mx 값 * 2
  const slideDistance = cardWidth + cardSpacing;

  // 자동 슬라이드 기능 (드래그 중에만 정지)
  useEffect(() => {
    if (!animations.cardsContainer || isDragging) return;

    const interval = setInterval(() => {
      setCurrentCardIndex((prev: number) => (prev + 1) % companyCards.length);
    }, 3000); // 3초마다 자동 전환

    return () => clearInterval(interval);
  }, [
    companyCards.length,
    animations.cardsContainer,
    isDragging,
    setCurrentCardIndex,
  ]);

  // 수동 컨트롤 함수
  const goToSlide = (index: number) => {
    setCurrentCardIndex(index);
  };

  // 드래그 이벤트 핸들러
  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setIsDragging(true);
    setDragStart({ x: clientX, index: currentCardIndex });
    setDragOffset(0);
  }, [currentCardIndex]);

  const handleDragMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const offset = clientX - dragStart.x;
    setDragOffset(offset);
  }, [isDragging, dragStart.x]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;

    const threshold = 80; // 드래그 임계값 (더 민감하게)

    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0 && currentCardIndex > 0) {
        // 오른쪽으로 드래그 - 이전 카드
        setCurrentCardIndex(currentCardIndex - 1);
      } else if (dragOffset < 0 && currentCardIndex < companyCards.length - 1) {
        // 왼쪽으로 드래그 - 다음 카드
        setCurrentCardIndex(currentCardIndex + 1);
      }
    }

    setIsDragging(false);
    setDragOffset(0);
  }, [isDragging, dragOffset, currentCardIndex, companyCards.length, setCurrentCardIndex]);

  // 더미 이벤트 핸들러 (기존 컴포넌트 호환성 유지)
  const handleCardMouseEnter = () => { };
  const handleCardMouseLeave = () => { };

  // transform 계산 최적화
  const transformValue = useMemo(() => {
    const baseOffset = currentCardIndex * slideDistance;
    const dragOffsetValue = isDragging ? -dragOffset : 0;
    const totalOffset = baseOffset + dragOffsetValue;
    return `translate3d(-${totalOffset}px, 0, 0)`;
  }, [currentCardIndex, slideDistance, isDragging, dragOffset]);

  const wrapperStyles: SystemStyleObject = {
    display: "flex",
    alignItems: "center",
    p: {
      base: "0 calc(50% - 155px)",
      md: "0 calc(50% - 220px)",
      lg: "0 calc(50% - 320px)",
    },
    width: "fit-content",
    minWidth: "100%",
    transition: isDragging ? "none" : "transform 0.3s ease-out",
    transform: transformValue,
    willChange: "transform",
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <Box
      as="section"
      ref={sectionRef}
      w="100%"
      p={"150px 0"}
      position="relative"
      overflow="hidden"
      backgroundImage="url('/images/main/section3.webp')"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
      <Box
        textAlign="center"
        color="black"
        zIndex={2}
        position="relative"
        w="100%"
        margin="auto"
      >
        <Box
          fontSize={{ base: "16px", md: "24px", lg: "24px" }}
          fontWeight="bold"
          mb="30px"
          color="#4A7CD5"
          letterSpacing="2px"
          textTransform="uppercase"
          fontFamily="Montserrat, sans-serif"
          transition="transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)"
          transform={
            animations.titleText ? "translateY(0)" : "translateY(50px)"
          }
          opacity={animations.titleText ? 1 : 0}
        >
          COMPANY
        </Box>

        <Heading
          as="h2"
          fontSize={{ base: "32px", md: "48px", lg: "64px" }}
          fontWeight="bold"
          lineHeight="1.2"
          mb="20px"
          transition="transform 0.8s 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.8s 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)"
          transform={
            animations.mainHeading ? "translateY(0)" : "translateY(50px)"
          }
          opacity={animations.mainHeading ? 1 : 0}
        >
          <Text
            as="span"
            fontFamily="Montserrat, sans-serif !important"
            fontWeight="bold"
            letterSpacing="-0.5px"
          >
            K&D Energen
          </Text>
        </Heading>

        <Text
          fontSize={{ base: "16px", md: "24px", lg: "24px" }}
          mb={{ base: "50px" }}
          textAlign="center"
          transition="transform 0.4s 0.2s ease-out, opacity 0.4s 0.2s ease-out"
          transform={
            animations.description ? "translateY(0)" : "translateY(50px)"
          }
          opacity={animations.description ? 1 : 0}
        >
          수소를 포함한 산업용 가스의 안정적 생산과
          <Box as="br" display={{ base: "inline", md: "none" }} />
          첨단 EPC 솔루션을 제공하는 K&D Energen 입니다.
        </Text>

        <Box
          w="100vw"
          p={{ base: "50px 0", md: "65px 0", lg: "80px 0" }}
          m="0 auto"
          position="relative"
          overflow="hidden"
          ref={cardsRef}
          transition="transform 0.6s ease-out, opacity 0.6s ease-out"
          transform={
            animations.cardsContainer ? "translate3d(0, -20px, 0)" : "translate3d(0, 0, 0)"
          }
          opacity={animations.cardsContainer ? 1 : 0}
        >
          <Box
            {...wrapperStyles}
            ref={containerRef}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            userSelect="none"
          >
            {companyCards.map((card, index) => (
              <Box
                key={card.id}
                mx={{ base: "15px", md: "20px", lg: "20px" }}
                flexShrink={0}
              >
                <CompanyCard
                  card={card}
                  index={index}
                  currentCardIndex={currentCardIndex}
                  onMouseEnter={handleCardMouseEnter}
                  onMouseLeave={handleCardMouseLeave}
                />
              </Box>
            ))}
          </Box>
        </Box>

        {/* 슬라이드 인디케이터 */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={{ base: "30px", md: "35px", lg: "40px" }}
          gap={{ base: "6px", lg: "8px" }}
        >
          {companyCards.map((_, index) => (
            <Box
              key={index}
              w={
                index === currentCardIndex
                  ? { base: "30px", lg: "40px" }
                  : { base: "10px", lg: "12px" }
              }
              h={{ base: "10px", lg: "12px" }}
              borderRadius={{ base: "5px", lg: "6px" }}
              bg={index === currentCardIndex ? "#4A7CD5" : "rgb(235, 235, 235)"}
              cursor="pointer"
              transition="all 0.4s ease"
              _hover={{
                bg: "#4A7CD5",
                transform: "scale(1.1)",
              }}
              onClick={() => goToSlide(index)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
