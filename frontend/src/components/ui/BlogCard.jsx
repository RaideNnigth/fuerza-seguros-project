import { Link } from 'react-router-dom';

export default function BlogCard({ post }) {
  return (
    <Link to={`/blog/${post._id}`} className="block">
      <div style={{ fontFamily: '"Times New Roman", Times, serif' }} className="bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
        />
        <div style={{ fontFamily: '"Times New Roman", Times, serif' }} className="p-4 flex flex-col gap-2">
          <span style={{ fontFamily: '"Times New Roman", Times, serif' }} className="text-xs text-blue-500 uppercase tracking-wide">{post.category?.toLowerCase() !== 'home page' ? post.category : ''}</span>
          <h2 style={{ fontFamily: '"Times New Roman", Times, serif' }} className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
            {post.title}
          </h2>
          <div
            className="text-sm text-gray-600 line-clamp-3"
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
          />
          <span style={{ fontFamily: '"Times New Roman", Times, serif' }} className="text-xs text-gray-400 mt-auto">
            {post.author} em {post.date}
          </span>
        </div>
      </div>
    </Link>
  );
}
