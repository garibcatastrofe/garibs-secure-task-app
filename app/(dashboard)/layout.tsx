"use client";

/* COMPONENTS */
import { Announcement } from "@/components/shared/announcement/Announcement";
import { Modal } from "@/components/shared/modal/Modal";
import { RouteTitle } from "@/components/shared/routeTitle/RouteTitle";
import { Sidebar } from "@/components/shared/sidebar/Sidebar";
import {
  selectUserById,
  verify,
} from "@/src/Users/Infrastructure/UserControlador";
import { useAuthStore } from "@/stores/authentication/autenticacionStore";
import { useAnnouncement } from "@/stores/announcement/announcementStore";

/* STORES */
import { useSidebarStore } from "@/stores/sidebar/SidebarStore";

/* LIBS */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IUserPrimitive } from "@/src/Users/Domain/Interfaces/IUserPrimitive";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { expanded } = useSidebarStore();
  const { setUser, user } = useAuthStore();
  const { setAnnouncement } = useAnnouncement();
  const [userInfo, setUserInfo] = useState<IUserPrimitive | null>(null);
  const pathname = usePathname();

  const router = useRouter();

  useEffect(() => {
    try {
      const fetchUser = async () => {
        const responseVerify = await verify();

        if (responseVerify.ok && responseVerify.id !== null) {
          setUser({ user: { id: responseVerify.id } });

          const responseUser = await selectUserById(
            user === null ? responseVerify.id : user.id,
          );

          if (responseUser.ok) {
            setUserInfo(responseUser.user);

            if (pathname === "/users") {
              if (responseUser.user.is_admin !== "SI") {
                router.push("/home");
              }
            }
          }
        } else {
          router.push("/")
        }
      };

      fetchUser();
    } catch (error) {
      console.log("Error: ", error);
      setAnnouncement({
        isActivated: true,
        isOk: false,
        message:
          "Ocurrió un error al buscar el usuario, intente nuevamente más tarde",
      });

      router.push("/");
    }
  }, [router, setAnnouncement, setUser]);

  return (
    <motion.div
      className="flex min-h-dvh overflow-y-hidden overflow-x-hidden"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Sidebar userOutside={userInfo} />
      <Announcement />
      <Modal />
      <div
        className={`flex flex-col h-dvh w-full transition-all duration-300 ${
          expanded
            ? "lg:left-64 lg:w-[calc(100%-16rem)]"
            : "lg:left-16 lg:w-[calc(100%-4rem)] z-40"
        }`}
      >
        <RouteTitle />
        <main className={`overflow-y-auto flex-1`}>{children}</main>
      </div>
    </motion.div>
  );
}
