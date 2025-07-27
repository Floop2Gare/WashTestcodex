const API_URL = 'https://node-js-api-graph.onrender.com/api/facebook/posts';

export async function fetchFacebookPosts() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des publications :', error);
    return [];
  }
}