import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const searchSchema = z.object({
  username: z.string().min(1, "Please enter a username")
});

type SearchFormData = z.infer<typeof searchSchema>;

interface SearchBarProps {
  onSearch: (username: string) => void;
  isLoading: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      username: ""
    }
  });

  const onSubmit = (data: SearchFormData) => {
    onSearch(data.username);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) {
      onSearch(""); // Clear the search when input is empty
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-3">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input 
                  placeholder="Enter GitHub username..." 
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleInputChange(e);
                  }}
                  className="bg-white shadow-sm hover:shadow transition-shadow duration-200 text-base py-6"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          disabled={isLoading}
          className="px-6 py-6 shadow-sm hover:shadow transition-shadow duration-200"
        >
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </form>
    </Form>
  );
}