import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Users, MapPin, Building, Link as LinkIcon } from "lucide-react";
import { motion } from "framer-motion";

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

interface UserCardProps {
  user: GitHubUser;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center gap-6 p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Avatar className="h-24 w-24 ring-2 ring-primary/10">
            <AvatarImage src={user.avatar_url} alt={user.login} />
            <AvatarFallback className="text-lg">{user.login[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </motion.div>
        <div className="space-y-1">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {user.name || user.login}
          </h2>
          <a 
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer" 
            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
          >
            @{user.login}
          </a>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        {user.bio && (
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{user.bio}</p>
        )}

        <div className="grid grid-cols-3 gap-4 mb-6">
          <motion.div 
            className="text-center p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="text-2xl font-bold text-primary">{user.public_repos}</div>
            <div className="text-sm text-muted-foreground">Repositories</div>
          </motion.div>
          <motion.div 
            className="text-center p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="text-2xl font-bold text-primary">{user.followers}</div>
            <div className="text-sm text-muted-foreground">Followers</div>
          </motion.div>
          <motion.div 
            className="text-center p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="text-2xl font-bold text-primary">{user.following}</div>
            <div className="text-sm text-muted-foreground">Following</div>
          </motion.div>
        </div>

        <Separator className="my-6" />

        <div className="space-y-4">
          {user.location && (
            <motion.div 
              className="flex items-center gap-3 text-muted-foreground"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{user.location}</span>
            </motion.div>
          )}
          {user.company && (
            <motion.div 
              className="flex items-center gap-3 text-muted-foreground"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Building className="h-4 w-4" />
              <span className="text-sm">{user.company}</span>
            </motion.div>
          )}
          {user.blog && (
            <motion.div 
              className="flex items-center gap-3 text-muted-foreground"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <LinkIcon className="h-4 w-4" />
              <a 
                href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-primary transition-colors"
              >
                {user.blog}
              </a>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}