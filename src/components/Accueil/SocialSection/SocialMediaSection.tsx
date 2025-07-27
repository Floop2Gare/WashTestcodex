import React, { useEffect, useState } from 'react';
import { Facebook, ExternalLink } from 'lucide-react';
import { fetchFacebookPosts } from "../../../data/fetchFacebookPosts";

const FACEBOOK_URL = "https://www.facebook.com/WashAndGo";

interface FacebookPost {
  id: string;
  message: string;
  full_picture?: string;
  permalink_url: string;
  created_time: string;
}

const SocialMediaSection: React.FC = () => {
  const [posts, setPosts] = useState<FacebookPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFacebookPosts().then((data) => {
      setPosts(data.slice(0, 3)); // 3 derniers posts
      setLoading(false);
    });
  }, []);

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
          Suivez-nous sur Facebook 🚗✨
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Découvrez nos dernières publications et conseils d’entretien
        </p>

        <div className="flex items-center justify-center gap-4 mt-4">
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Facebook className="mr-1" size={20} />
            <span>Wash&Go</span>
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p>Chargement des publications...</p>
          ) : posts.length === 0 ? (
            <p>Aucune publication disponible.</p>
          ) : (
            posts.map((post) => (
              <a
                key={post.id}
                href={post.permalink_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
              >
                {post.full_picture && (
                  <img
                    src={post.full_picture}
                    alt="Facebook post"
                    className="w-full h-60 object-cover"
                  />
                )}
                <div className="p-4 text-left">
                  <p className="text-sm text-gray-800 whitespace-pre-wrap line-clamp-4">
                    {post.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Publié le {new Date(post.created_time).toLocaleDateString()}
                  </p>
                </div>
              </a>
            ))
          )}
        </div>

        <div className="mt-12">
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors"
          >
            Voir plus <ExternalLink size={18} className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaSection;
