import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogPaginationProps {
  isSearching: boolean;
  currentPage: number;
  totalPages: number;
  canGoPrev: boolean;
  canGoNext: boolean;
  onSearchPageChange: (page: number) => void;
  buildPageHref: (page: number) => string;
  onNavigate: () => void;
}

const BlogPagination: React.FC<BlogPaginationProps> = ({
  isSearching,
  currentPage,
  totalPages,
  canGoPrev,
  canGoNext,
  onSearchPageChange,
  buildPageHref,
  onNavigate,
}) => {
  if (totalPages <= 1) return null;

  const handleSearchPrev = () => {
    if (!canGoPrev) return;
    onSearchPageChange(currentPage - 1);
  };

  const handleSearchNext = () => {
    if (!canGoNext) return;
    onSearchPageChange(currentPage + 1);
  };

  const renderPageButton = (pageNumber: number, isActive: boolean) => {
    const commonClasses =
      "relative inline-flex items-center justify-center w-10 h-10 rounded-full font-inter text-sm font-medium transition-all duration-300";

    if (isSearching) {
      return (
        <motion.button
          key={pageNumber}
          onClick={() => onSearchPageChange(pageNumber)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`${commonClasses} ${
            isActive
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {isActive && (
            <motion.span
              layoutId="activePage"
              className="absolute inset-0 rounded-full bg-primary"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10">{pageNumber}</span>
        </motion.button>
      );
    }

    return (
      <motion.a
        key={pageNumber}
        href={buildPageHref(pageNumber)}
        onClick={onNavigate}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`${commonClasses} ${
          isActive
            ? "text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {isActive && (
          <motion.span
            layoutId="activePage"
            className="absolute inset-0 rounded-full bg-primary"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        <span className="relative z-10">{pageNumber}</span>
      </motion.a>
    );
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="flex items-center justify-center gap-2 mt-16"
    >
      {/* Previous */}
      {isSearching ? (
        <button
          onClick={handleSearchPrev}
          disabled={!canGoPrev}
          className={`group relative flex items-center gap-2 px-4 py-2 rounded-full font-inter text-sm transition-all duration-300 ${
            !canGoPrev
              ? "text-muted-foreground/50 cursor-not-allowed"
              : "text-foreground hover:text-primary"
          }`}
        >
          <span
            className={`absolute inset-0 rounded-full bg-primary/10 scale-0 transition-transform duration-300 ${
              canGoPrev ? "group-hover:scale-100" : ""
            }`}
          />
          <ChevronLeft className="w-4 h-4 relative z-10" />
          <span className="relative z-10 hidden sm:inline">Anterior</span>
        </button>
      ) : (
        <a
          href={canGoPrev ? buildPageHref(currentPage - 1) : "#"}
          onClick={(e) => {
            if (!canGoPrev) {
              e.preventDefault();
              return;
            }
            onNavigate();
          }}
          aria-disabled={!canGoPrev}
          className={`group relative flex items-center gap-2 px-4 py-2 rounded-full font-inter text-sm transition-all duration-300 ${
            !canGoPrev
              ? "text-muted-foreground/50 cursor-not-allowed pointer-events-none"
              : "text-foreground hover:text-primary"
          }`}
        >
          <span
            className={`absolute inset-0 rounded-full bg-primary/10 scale-0 transition-transform duration-300 ${
              canGoPrev ? "group-hover:scale-100" : ""
            }`}
          />
          <ChevronLeft className="w-4 h-4 relative z-10" />
          <span className="relative z-10 hidden sm:inline">Anterior</span>
        </a>
      )}

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {pages.map((pageNumber) => {
          const isFirst = pageNumber === 1;
          const isLast = pageNumber === totalPages;
          const isNearCurrent = Math.abs(pageNumber - currentPage) <= 1;

          const shouldShow =
            isFirst || isLast || isNearCurrent || totalPages <= 5;

          if (!shouldShow) {
            if (pageNumber === 2 && currentPage > 3 && totalPages > 5) {
              return (
                <span
                  key="ellipsis-before"
                  className="px-2 text-muted-foreground"
                >
                  •••
                </span>
              );
            }
            if (
              pageNumber === totalPages - 1 &&
              currentPage < totalPages - 2 &&
              totalPages > 5
            ) {
              return (
                <span
                  key="ellipsis-after"
                  className="px-2 text-muted-foreground"
                >
                  •••
                </span>
              );
            }
            return null;
          }

          const isActive = currentPage === pageNumber;
          return renderPageButton(pageNumber, isActive);
        })}
      </div>

      {/* Next */}
      {isSearching ? (
        <button
          onClick={handleSearchNext}
          disabled={!canGoNext}
          className={`group relative flex items-center gap-2 px-4 py-2 rounded-full font-inter text-sm transition-all duration-300 ${
            !canGoNext
              ? "text-muted-foreground/50 cursor-not-allowed"
              : "text-foreground hover:text-primary"
          }`}
        >
          <span
            className={`absolute inset-0 rounded-full bg-primary/10 scale-0 transition-transform duration-300 ${
              canGoNext ? "group-hover:scale-100" : ""
            }`}
          />
          <span className="relative z-10 hidden sm:inline">Siguiente</span>
          <ChevronRight className="w-4 h-4 relative z-10" />
        </button>
      ) : (
        <a
          href={canGoNext ? buildPageHref(currentPage + 1) : "#"}
          onClick={(e) => {
            if (!canGoNext) {
              e.preventDefault();
              return;
            }
            onNavigate();
          }}
          aria-disabled={!canGoNext}
          className={`group relative flex items-center gap-2 px-4 py-2 rounded-full font-inter text-sm transition-all duration-300 ${
            !canGoNext
              ? "text-muted-foreground/50 cursor-not-allowed pointer-events-none"
              : "text-foreground hover:text-primary"
          }`}
        >
          <span
            className={`absolute inset-0 rounded-full bg-primary/10 scale-0 transition-transform duration-300 ${
              canGoNext ? "group-hover:scale-100" : ""
            }`}
          />
          <span className="relative z-10 hidden sm:inline">Siguiente</span>
          <ChevronRight className="w-4 h-4 relative z-10" />
        </a>
      )}
    </motion.div>
  );
};

export default BlogPagination;
