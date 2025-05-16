export default function BlogCard({ post }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 overflow-hidden">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
      />
      <div className="p-4 flex flex-col gap-2">
        <span className="text-xs text-blue-500 uppercase tracking-wide">{post.category}</span>
        <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
          {post.title}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>
        <span className="text-xs text-gray-400 mt-auto">
          {post.author} em {post.date}
        </span>
      </div>
    </div>
  );
}
