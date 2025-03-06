import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "@/components/SearchBar";
import UserCard from "@/components/UserCard";
import Loader from "@/components/Loader";
import ErrorMessage from "@/components/ErrorMessage";
import { SiGithub } from "react-icons/si";

interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  location: string | null;
  company: string | null;
  blog: string | null;
  html_url: string;
}

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const { data: user, isLoading, error, refetch } = useQuery<GitHubUser>({
    queryKey: [`https://api.github.com/users/${username}`],
    enabled: !!username,
    retry: false,
    throwOnError: true,
    onSettled: (data) => {
      if (data) {
        setShowEasterEgg(true);
        setTimeout(() => setShowEasterEgg(false), 2000);
      }
    }
  });

  const handleSearch = async (searchUsername: string) => {
    setUsername(searchUsername);
    await refetch();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-3xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <motion.div
              animate={showEasterEgg ? {
                scale: [1, 1.2, 1],
                rotate: [0, 360],
                transition: { duration: 1 }
              } : undefined}
            >
              <SiGithub className="h-8 w-8" />
            </motion.div>
            <h1 className="text-3xl font-bold">GitHub User Finder</h1>
          </div>
          <p className="text-muted-foreground">
            Search for GitHub users and view their profile information
          </p>
        </div>

        <div className="mb-8">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {isLoading && <Loader />}

        {error && (
          <ErrorMessage 
            message={
              error instanceof Error 
                ? error.message 
                : "An error occurred while fetching the user data"
            }
          />
        )}

        <AnimatePresence mode="wait">
          {user && !isLoading && !error && username && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <UserCard user={user} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}