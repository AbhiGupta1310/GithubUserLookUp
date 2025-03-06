import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

  const { data: user, isLoading, error, refetch } = useQuery<GitHubUser>({
    queryKey: [`https://api.github.com/users/${username}`],
    enabled: !!username,
    retry: false,
    staleTime: Infinity,
    onSuccess: () => {
      setShowEasterEgg(true);
      setTimeout(() => setShowEasterEgg(false), 2000);
    }
  });

  const handleSearch = async (searchUsername: string) => {
    setUsername(searchUsername);
    if (!searchUsername) {
      // Clear the query cache when search is empty
      queryClient.removeQueries({ queryKey: [`https://api.github.com/users/${username}`] });
      return;
    }
    await refetch();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container max-w-3xl mx-auto py-12 px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div
              animate={showEasterEgg ? {
                scale: [1, 1.2, 1],
                rotate: [0, 360],
                transition: { duration: 1 }
              } : undefined}
            >
              <SiGithub className="h-10 w-10 text-primary" />
            </motion.div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              GitHub User Finder
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Search for GitHub users and explore their profiles
          </p>
        </motion.div>

        <div className="mb-8">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {isLoading && <Loader />}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ErrorMessage 
              message={
                error instanceof Error 
                  ? error.message 
                  : "An error occurred while fetching the user data"
              }
            />
          </motion.div>
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