<a
  href={post.url}
  target="_blank"
  rel="noopener noreferrer"
  className="block bg-white rounded-xl shadow-md overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-lg"
>
  <img
    src={post.imageUrl}
    alt={post.caption}
    className="w-full h-64 sm:h-72 object-cover"
    loading="lazy"
  />
  <div className="p-4">
    <div className="flex items-center mb-2 text-blue-600">
      <Facebook className="mr-2" size={20} />
      <span className="font-semibold text-sm">Facebook</span>
    </div>
    <p className="text-gray-800 text-sm mb-2 line-clamp-3">{post.caption}</p>
    <p className="text-xs text-gray-500">Publié le {post.date}</p>
  </div>
</a>
