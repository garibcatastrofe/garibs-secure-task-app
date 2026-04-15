"use client";

/* API CALLS */
import {
  selectUserById,
  signOut,
  verify,
} from "@/src/Users/Infrastructure/UserControlador";

/* DATA */
import { links } from "@/data/links";

/* HOOKS */
import { useState, useEffect } from "react";

/* ICONS */
import { Menu, LogOut, X, Loader } from "lucide-react";
import { AppIcon } from "@/components/svg/shared/AppIcon";

/* NAVIGATION */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

/* STORES */
import { useSidebarStore } from "@/stores/sidebar/SidebarStore";
import { useAuthStore } from "@/stores/authentication/autenticacionStore";
import { useAnnouncement } from "@/stores/announcement/announcementStore";

/* TYPES */
import { IUserPrimitive } from "@/src/Users/Domain/Interfaces/IUserPrimitive";
import { Links } from "@/types/links";

/* LIBS */
import { motion } from "framer-motion";

/* UTILS */
import { getInitials } from "@/utils/getInitials";

export function Sidebar() {
  const router = useRouter();

  const { expanded, toggleSidebar } = useSidebarStore();
  const { user, setUser } = useAuthStore();
  const { setAnnouncement } = useAnnouncement();

  const [userInfo, setUserInfo] = useState<IUserPrimitive | null>(null);
  const [loading, setLoading] = useState(true);
  const [filteredLinks, setFilteredLinks] = useState<Links[] | null>(null);

  const pathname = usePathname();

  const linkClasses = (path: string) => {
    const isActive = pathname === path || pathname?.startsWith(`${path}/`);

    return `${isActive ? "bg-linear-to-br from-green-200 via-green-50 to-green-200 bg-animated-gradient text-green-800" : "text-black hover:bg-neutral-100 transition-all duration-300"}`;
  };

  const handleSignOut = async () => {
    try {
      const response = await signOut();

      if (response.ok) {
        setAnnouncement({
          isActivated: true,
          isOk: true,
          message: response.message,
        });

        setUser({ user: null });

        router.push("/");
      } else {
        setAnnouncement({
          isActivated: true,
          isOk: false,
          message: response.message,
        });
      }
    } catch (error) {
      console.log("Error: ", error);

      setAnnouncement({
        isActivated: true,
        isOk: false,
        message:
          "Ocurrió un error al cerrar sesión, intente nuevamente más tarde",
      });
    }
  };

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
            setFilteredLinks(
              links.filter((link) => {
                if (link.href === "/users") {
                  return responseUser.user.is_admin === "SI";
                }
                return true;
              }),
            );
            setLoading(false);
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
  }, [router, setAnnouncement, setUser]);

  useEffect(() => {
    try {
      const fetchUser = async () => {
        if (user !== null) {
          const response = await selectUserById(user.id);

          if (response.ok) {
            setUserInfo(response.user);
            setFilteredLinks(
              links.filter((link) => {
                if (link.href === "/users") {
                  return response.user.is_admin === "SI";
                }
                return true;
              }),
            );
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

  return (
    <>
      <aside
        className={`flex flex-col z-60 transition-all bg-white duration-300 justify-between h-dvh border-r border-r-neutral-200 absolute lg:static ${expanded ? "w-64 left-0" : "lg:w-18 w-64 -left-64"}`}
      >
        <div className="w-full h-fit flex flex-col p-4">
          <div
            className={`flex items-center mb-20 relative ${expanded ? "justify-end" : "lg:justify-center justify-end"}`}
          >
            <div
              className={`transition-all duration-300 pointer-events-none absolute ${expanded ? "w-40 lg:opacity-100 left-0" : "left-0 w-40 lg:w-0 lg:opacity-0 lg:-left-64"}`}
            >
              <AppIcon />
            </div>
            <button
              onClick={toggleSidebar}
              className={`p-1 hover:bg-green-100 hover:text-green-800 rounded transition-all duration-300 cursor-pointer`}
            >
              {expanded ? (
                <X className="size-4" />
              ) : (
                <Menu className="size-4" />
              )}
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {loading ? (
              <div className="flex flex-col truncate">
                <div className="w-full py-8 mb-1 rounded-lg bg-linear-to-r from-neutral-200 via-neutral-50 to-neutral-200 bg-skeleton-gradient" />
                <div className="w-full py-8 rounded-lg bg-linear-to-r from-neutral-200 via-neutral-50 to-neutral-200 bg-skeleton-gradient" />
              </div>
            ) : (
              filteredLinks !== null && (
                <div className="flex flex-col gap-2">
                  {filteredLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`p-2 rounded-xl relative group ${linkClasses(link.href)}`}
                    >
                      <div
                        className={`flex items-center transition-all duration-300 ${expanded ? "gap-6" : "lg:gap-0 gap-6"}`}
                      >
                        <div className="w-fit h-fit ml-1">
                          <link.Icon className="size-4" />
                        </div>
                        <span
                          className={`transition-all duration-300 ${expanded ? "w-fit opacity-100" : "lg:w-0 w-fit lg:opacity-0 opacity-100 pointer-events-none"}`}
                        >
                          {link.title}
                        </span>
                        {!expanded && (
                          <div className="absolute z-20 invisible p-2 ml-6 text-sm font-medium text-green-800 transition-all translate-x-3 bg-white shadow-md opacity-0 rounded-full left-full group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
                            {link.title}
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )
            )}
          </nav>
        </div>

        <div className="flex items-center gap-0 p-4 overflow-hidden relative border-t border-t-neutral-200">
          <div className="rounded w-9 h-9 flex justify-center items-center ml-0.5 bg-linear-to-br from-green-500 via-green-400 to-green-500 bg-animated-gradient text-white shadow-md font-semibold">
            {loading ? (
              <Loader className="size-4 animate-spin text-white" />
            ) : (
              userInfo !== null && (
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {getInitials(userInfo.user_name)}
                </motion.span>
              )
            )}
          </div>
          <div
            className={`flex items-center max-w-40 transition-all duration-300 gap-2 absolute ${expanded ? "right-4 opacity-100" : "lg:-right-64 right-4 lg:opacity-0 opacity-100 pointer-events-none"}`}
          >
            {loading ? (
              <div className="flex flex-col truncate">
                <div className="w-30 py-2 mb-1 rounded-lg bg-linear-to-r from-neutral-200 via-neutral-50 to-neutral-200 bg-skeleton-gradient" />
                <div className="w-24 py-2 rounded-lg bg-linear-to-r from-neutral-200 via-neutral-50 to-neutral-200 bg-skeleton-gradient" />
              </div>
            ) : (
              userInfo !== null && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="flex flex-col truncate"
                >
                  <span className="font-semibold truncate">
                    {userInfo.user_name}
                  </span>
                  <span className="text-xs text-neutral-400 truncate">
                    {userInfo.email}
                  </span>
                </motion.div>
              )
            )}
            <button
              onClick={handleSignOut}
              className="hover:bg-[#d9f2f9] hover:text-green-800 p-1 transition-all duration-300 rounded cursor-pointer"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </aside>
      <div
        onClick={toggleSidebar}
        className={`absolute w-full top-0 left-0 bg-black/50 h-screen transition-all duration-300 z-50 lg:hidden lg:pointer-events-none ${
          expanded ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>
    </>
  );
}
