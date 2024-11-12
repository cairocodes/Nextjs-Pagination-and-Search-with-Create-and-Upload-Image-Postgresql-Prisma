import PostTable from "@/components/table";
import { getDataPages } from "@/lib/data";
import Pagination from "@/components/pagination";
import Link from "next/link";
import { Suspense } from "react";
import { Spinner } from "@/components/spinner";
import Search from "@/components/search";

const Posts = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await getDataPages(query);

  console.log(searchParams);
  console.log(query);
  console.log(currentPage);

  return (
    <div className="max-w-screen-lg mx-auto py-14">
      <h1 className="text-4xl font-bold">Nextjs Pagination and Search with Create and Upload Image | Postgresql Prisma</h1>
        <Link
          href="/create"
          className="py-3 px-6 bg-green-700 hover:bg-green-800 text-white"
        >
          New Post
        </Link>
      <div className="flex items-end justify-between m-12">
        <h1 className="text-4xl font-bold">Latest Post</h1>
        <div><Search /></div>
      </div>
      <Suspense key={query + currentPage} fallback={<Spinner />}>
        <PostTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="flex justify-center mt-4">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Posts;
