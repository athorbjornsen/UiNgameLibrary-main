/*const RAWG_API_KEY = 'YO5d0fe823d6594e6bbae200e76b2f0683'; //add to env / ignore before making repo public

export const fetchGames = async (searchQuery: string = 'popular'): Promise<any> => {
  try {
    const response = await fetch(`https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${searchQuery}`);
    if (!response.ok) {
      throw new Error('Error fetching games');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
};
*/