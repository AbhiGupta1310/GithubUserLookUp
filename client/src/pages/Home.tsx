import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "@/components/SearchBar";
import UserCard from "@/components/UserCard";
import Loader from "@/components/Loader";
import ErrorMessage from "@/components/ErrorMessage";
import { SiGithub } from "react-icons/si";

export default function Home() {
  const [username, setUsername] = useState<string>("");

  const { data: user, isLoading, error, refetch } = useQuery({
    queryKey: [`https://api.github.com/users/${username}`],
    enabled: !!username
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
            <SiGithub className="h-8 w-8" />
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
                : "Failed to fetch user data"
            }
          />
        )}

        {user && !isLoading && !error && <UserCard user={user} />}
      </div>
    </div>
  );
}
