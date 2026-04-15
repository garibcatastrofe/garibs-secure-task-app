"use client";

/* API CALLS */
import { selectUserById } from "@/src/Users/Infrastructure/UserControlador";

/* COMPONENTS */
import { SectionContainer } from "@/components/shared/sectionContainer/SectionContainer";

/* HOOKS */
import { useState, useEffect } from "react";

/* LIBS */
import { motion } from "framer-motion";

/* NAVIGATION */
import { useRouter } from "next/navigation";

/* STORES */
import { useAuthStore } from "@/stores/authentication/autenticacionStore";
import { useAnnouncement } from "@/stores/announcement/announcementStore";

/* TYPES */
import { IUserPrimitive } from "@/src/Users/Domain/Interfaces/IUserPrimitive";

/* UTILS */
import { formatDate, formatTime } from "@/utils/date";

export function HomeContent() {
  const router = useRouter();

  const { user } = useAuthStore();
  const { setAnnouncement } = useAnnouncement();

  const [userInfo, setUserInfo] = useState<IUserPrimitive | null>(null);
  const [loading, setLoading] = useState(true);

  const [dateTime, setDateTime] = useState({
    date: formatDate(new Date()),
    time: formatTime(new Date()),
  });

  useEffect(() => {
    try {
      const fetchUser = async () => {
        if (user !== null) {
          const response = await selectUserById(user.id);

          if (response.ok) {
            setUserInfo(response.user);
            setLoading(false);
          } else {
            setAnnouncement({
              isActivated: true,
              isOk: false,
              message: response.message,
            });
          }
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
  }, [router, setAnnouncement, user]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime({
        date: formatDate(new Date()),
        time: formatTime(new Date()),
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <SectionContainer>
      <motion.div
        className="flex flex-col items-center justify-center h-full px-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {loading ? (
          <div className="w-1/2 h-fit flex flex-col gap-4 items-center">
            <div className="w-5/6 py-6 rounded-2xl bg-linear-to-r from-neutral-200 via-neutral-50 to-neutral-200 bg-skeleton-gradient" />
            <div className="w-4/6 py-4 rounded-2xl bg-linear-to-r from-neutral-200 via-neutral-50 to-neutral-200 bg-skeleton-gradient" />
            <div className="w-3/6 py-2 rounded-2xl bg-linear-to-r from-neutral-200 via-neutral-50 to-neutral-200 bg-skeleton-gradient" />
          </div>
        ) : (
          userInfo !== null && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col items-center"
            >
              <p className="text-2xl font-semibold lg:text-6xl md:text-4xl text-neutral-900">
                ¡Hola,{" "}
                <span className="text-green-500">{userInfo.user_name}</span>!
              </p>
              <p className="mt-4 text-xl font-semibold lg:text-3xl md:text-2xl text-neutral-900">
                {dateTime.date}
              </p>
              <p className="mt-2 text-xl font-semibold lg:text-3xl md:text-2xl text-neutral-900">
                {dateTime.time}
              </p>
            </motion.div>
          )
        )}
      </motion.div>
    </SectionContainer>
  );
}
