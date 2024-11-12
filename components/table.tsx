import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { getPosts } from "@/lib/data";

const PostTable = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const posts = await getPosts(query, currentPage);

  return (
      <div className="grid md:grid-cols-3 gap-5 mt-10">
        {posts.map((item) => (
          <div key={item.id} className="max-w-sm border border-gray-200 rounded-md shadow">
            <div className="relative aspect-video">
              <Image
                src={`http://localhost:3000/assets/${item.image}`}
                alt={item.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-t-md object-cover"
              />
            </div>
            <div className="p-5">
              <h1 className="text-2xl font-bold text-gray-900 truncate">
                {item.title}
              </h1>
            </div>
            <div className="flex items-center justify-between">
              <div className="py-3 text-sm text-white bg-blue-700 rounded-bl-md w-full text-center">{formatDate(item.createdAt.toString())}</div>
            </div>
          </div>
        ))}
      </div>
  );
};

export default PostTable;
