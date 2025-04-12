// Generate realistic social media post data
export const generatePosts = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    author: `User${Math.floor(Math.random() * 1000)}`,
    avatar: `https://i.pravatar.cc/40?img=${index % 70}`,
    content: `This is a sample social media post #${
      index + 1
    } with some realistic content that might include hashtags #react #performance and maybe even some emojis 🚀✨. The content length varies to make it more realistic.${
      Math.random() > 0.5
        ? " Adding some extra text to make certain posts longer and more varied in size."
        : ""
    }`,
    likes: Math.floor(Math.random() * 1000),
    comments: Math.floor(Math.random() * 50),
    timestamp: new Date(
      Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
    ).toLocaleDateString(),
  }));
};

// Generate 10000 posts for the example
export const posts = generatePosts(10000);
