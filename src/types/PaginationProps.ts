import { Media } from "./Media";

export interface PaginationProps {
    fetchFunction: (page: number) => Promise<{ results: Media[], total_pages: number }>;
    renderItem: (item: Media) => React.ReactNode;
}