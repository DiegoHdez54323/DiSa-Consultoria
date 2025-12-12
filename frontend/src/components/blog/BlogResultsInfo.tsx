interface BlogResultsInfoProps {
  currentPage: number;
  totalPosts: number;
  pageSize: number;
}

const BlogResultsInfo: React.FC<BlogResultsInfoProps> = ({
  currentPage,
  totalPosts,
  pageSize,
}) => {
  if (totalPosts === 0) return null;

  const from = (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalPosts);

  return (
    <p className="text-center text-sm text-muted-foreground mt-6 font-inter">
      Mostrando {from}-{to} de {totalPosts} artículos
    </p>
  );
};

export default BlogResultsInfo;
