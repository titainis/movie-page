import { useState, useEffect } from "react";
import { Media } from "../../types/Media";
import { getPages } from "../../Utils/getPages";
import { PaginationProps } from "../../types/PaginationProps";

const Pagination = ({ 
    fetchFunction, 
    renderItem
}: PaginationProps) => {
    const [page, setPage] = useState(1);
    const [items, setItems] = useState<Media[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetchFunction(page);
                setItems(data.results);
                setTotalPages(data.total_pages);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page, fetchFunction]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    if (loading) return <div className="text-center py-8">Loading...</div>;

    return (
        <>
            <div className="d-flex flex-wrap justify-content-center gap-5 pt-3 pb-5">
                {items.map((item) => (
                    <div key={item.id}>
                        {renderItem(item)}
                    </div>
                ))}
            </div>

            <div className="d-flex flex-wrap justify-content-center align-items-center gap-2 mb-5">
                <button 
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="btn btn-primary"
                >
                    Previous
                </button>
                
                {getPages(page, totalPages).map((pageNum, index) => (
                    pageNum === '...' ? (
                        <span key={`ellipsis-${index}`} className="px-2">...</span>
                    ) : (
                        <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum as number)}
                            className={`btn ${page === pageNum ? 'btn-primary' : 'btn-outline-primary'}`}
                        >
                            {pageNum}
                        </button>
                    )
                ))}
                
                <button 
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className="btn btn-primary"
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default Pagination;
