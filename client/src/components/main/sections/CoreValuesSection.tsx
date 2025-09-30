import { Box, Text, Heading, SystemStyleObject } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { RefObject } from "react";
import { useRouter } from "next/navigation";

const pulseGlow = keyframes`
  from {
    opacity: 0.3;
  }
  to {
    opacity: 0.5;
  }
`;

interface Card {
  id: number;
  title: string;
  subtitle: string;
  backgroundImage: string;
  textColor: string;
  link: string;
}

interface CoreValuesSectionProps {
  sectionRef: RefObject<HTMLDivElement>;
  isVisible: boolean;
  cards: Card[];
  cardsRef: RefObject<HTMLDivElement>;
  cardsVisible: boolean;
}

export default function CoreValuesSection({
  sectionRef,
  isVisible,
  cards,
  cardsRef,
  cardsVisible,
}: CoreValuesSectionProps) {
  const router = useRouter();

  const handleCardClick = (link: string) => {
    router.push(link);
  };
  return (
    <Box
      as="section"
      ref={sectionRef}
      w="100%"
      p="150px 0"
      position="relative"
      overflow="hidden"
    >
      <Box textAlign="center" color="black" zIndex={2} position="relative">
        <Box
          fontSize={{ base: "16px", md: "24px", lg: "24px" }}
          fontWeight="bold"
          mb="30px"
          color="#4A7CD5"
          letterSpacing="2px"
          textTransform="uppercase"
          fontFamily="Montserrat, sans-serif"
          style={{
            transform: `translate3d(0, ${(1 - (isVisible ? 1 : 0)) * 50}px, 0)`,
            opacity: isVisible ? 1 : 0,
            transition: "transform 0.4s ease-out, opacity 0.4s ease-out",
            transitionDelay: isVisible ? "0.05s" : "0s",
          }}
        >
          K&D ENERGEN
        </Box>

        <Heading
          as="h2"
          fontSize={{ base: "32px", md: "48px", lg: "64px" }}
          fontWeight="bold"
          lineHeight="1.2"
          mb="20px"
          style={{
            transform: `translate3d(0, ${(1 - (isVisible ? 1 : 0)) * 50}px, 0)`,
            opacity: isVisible ? 1 : 0,
            transition: "transform 0.4s ease-out, opacity 0.4s ease-out",
            transitionDelay: isVisible ? "0.3s" : "0s",
          }}
        >
          <Text
            as="span"
            fontFamily="Montserrat, sans-serif !important"
            fontWeight="bold"
            letterSpacing="-0.5px"
          >
            Core Values
          </Text>
        </Heading>

        <Text
          fontSize={{ base: "16px", md: "24px", lg: "24px" }}
          textAlign="center"
          mb="50px"
          style={{
            transform: `translate3d(0, ${(1 - (isVisible ? 1 : 0)) * 50}px, 0)`,
            opacity: isVisible ? 1 : 0,
            transition: "transform 0.4s ease-out, opacity 0.4s ease-out",
            transitionDelay: isVisible ? "0.5s" : "0s",
          }}
        >
          지속가능한 성장과 혁신을 통해 더 나은 미래를 만들어갑니다.
        </Text>

        <Box
          ref={cardsRef}
          display="flex"
          flexDirection={{ base: "column", md: "row", xl: "row" }}
          justifyContent="center"
          alignItems="flex-start" // Align items to the top to handle different margins
          marginTop={{ base: "0", md: "50px", xl: "50px" }}
          w={{ base: "87%", md: "90%", lg: "1000px" }}
          margin={"auto"}
        >
          {cards.map((card, index) => {
            const cardStyles: SystemStyleObject = {
              width: { base: "80%", md: "320px", lg: "360px" },
              height: { base: "200px", md: "500px" },
              marginTop: index === 1 ? { base: "0", md: "50px" } : "0",
              marginLeft: index === 1 ? { base: "auto", md: "0" } : "0",
              marginRight: index === 1 ? "0" : { base: "auto", md: "0" },
              bgImage: `url(${card.backgroundImage})`,
              color: card.textColor,
              p: 0,
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              position: "relative",
              overflow: "hidden",
              bgSize: "cover",
              backgroundPosition: "center",
              bgRepeat: "no-repeat",
              cursor: "pointer",
              transformStyle: "preserve-3d",
              willChange: cardsVisible ? "transform" : "auto",

              // Default transition and transform state
              opacity: cardsVisible ? 1 : 0,
              transform: cardsVisible
                ? "translate3d(0, 0, 0) scale(1)"
                : "translate3d(0, 30px, 0) scale(0.95)",
              transition: "transform 0.4s ease-out, opacity 0.4s ease-out",
              transitionDelay: `${index * 0.03}s`,
              boxShadow: cardsVisible
                ? "0 8px 24px rgba(0, 0, 0, 0.15)"
                : "0 4px 12px rgba(0, 0, 0, 0.1)",

              // Individual card styling
              borderTopLeftRadius:
                index === 0
                  ? { base: "20px", md: "20px" }
                  : index === 2
                    ? { base: "20px", md: "0" }
                    : "0",

              borderBottomLeftRadius:
                index === 0
                  ? { base: "20px", md: "20px" }
                  : index === 2
                    ? { base: "20px", md: "0" }
                    : "0",

              borderTopRightRadius:
                index === 2
                  ? { base: "0", md: "20px" }
                  : index === 1
                    ? { base: "20px", md: "0" }
                    : "0",

              borderBottomRightRadius:
                index === 2
                  ? { base: "0", md: "20px" }
                  : index === 1
                    ? { base: "20px", md: "0" }
                    : "0",

              // Pseudo-elements and hover effects
              _before: {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bg: "linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(0, 0, 0, 0.7) 100%)",
                opacity: 1,
                transition: "background 0.2s ease-out",
              },
              _hover: {
                transform: "translate3d(0, -4px, 0) scale(1.01)",
                zIndex: 10,
                boxShadow: "0 12px 32px rgba(0, 0, 0, 0.2)",
                transition: "all 0.15s ease-out",
                _before: {
                  bg: "linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(0, 0, 0, 0.6) 100%)",
                  transition: "background 0.15s ease-out",
                },
              },
              _after: {
                content: '""',
                position: "absolute",
                top: 0,
                left: "-1px",
                right: "-1px",
                bottom: "-1px",
                borderRadius: "inherit",
                zIndex: -1,
                opacity: cardsVisible ? 0.4 : 0,
                transition: "opacity 0.4s ease-out",
                animation: cardsVisible
                  ? `${pulseGlow} 6s ease-in-out infinite alternate`
                  : "none",
                willChange: cardsVisible ? "opacity" : "auto",
                transform: "translate3d(0, 0, 0)",
                boxShadow: "0 0 4px rgba(74, 124, 213, 0.15)",
              },
            };

            return (
              <Box
                key={card.id}
                {...cardStyles}
                onClick={() => handleCardClick(card.link)}
              >
                <Box
                  className="card-content"
                  zIndex={1}
                  position="relative"
                  padding="2rem"
                  transition="transform 0.15s ease-out"
                  transform="translate3d(0, 8px, 0)"
                  mb="10px"
                >
                  <Heading
                    className="card-title"
                    as="h3"
                    fontSize={{ base: "18px", md: "24px", xl: "36px" }}
                    fontWeight="700"
                    fontFamily="Montserrat, sans-serif !important"
                    textShadow="0 2px 4px rgba(0, 0, 0, 0.5)"
                    transition="transform 0.15s ease-out, text-shadow 0.15s ease-out"
                    color="white"
                    mb={{ md: "0", xl: "10px" }}
                  >
                    {card.title}
                  </Heading>
                  <Text
                    className="card-subtitle"
                    color="white"
                    fontSize={{ base: "14px", md: "16px", xl: "24px" }}
                    fontWeight="400"
                    marginBottom="0"
                    opacity="0.9"
                    textShadow="0 1px 2px rgba(0, 0, 0, 0.5)"
                    transition="transform 0.15s ease-out, text-shadow 0.15s ease-out"
                  >
                    {card.subtitle}
                  </Text>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
