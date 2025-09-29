"use client";

import { Suspense, useEffect, useState } from "react";
import { Box, Center, Spinner } from "@chakra-ui/react";
import { FloatingButtons } from "@/components/layout/FloatingButtons";
import Layout from "@/components/layout/view/Layout";
import { menuApi, sortMenus } from "@/lib/api/menu";
import { Menu } from "@/types/api";

export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await menuApi.getPublicMenus();
        if (response.data && response.data.success) {
          setMenus(sortMenus(response.data.data || []));
        }
      } catch (error) {
        console.error("Failed to fetch menus in layout:", error);
        // 에러 발생 시 빈 메뉴로 렌더링
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenus();
  }, []);

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box>
      <Suspense
        fallback={
          <Center h="100vh">
            <Spinner size="xl" />
          </Center>
        }
      >
        <Layout menus={menus}>{children}</Layout>
      </Suspense>
      {/* <FloatingButtons /> */}
    </Box>
  );
}
