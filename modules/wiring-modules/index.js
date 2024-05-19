import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { Blog as SqliteBlog } from "./no-injection/blog";
import { Blog as AnyDbBlog } from "./dependency-injection/blog";
import { createDb } from "./dependency-injection/createDb";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  // option 1
  // const blog = new SqliteBlog();
  // option 2 (same result)
  const dbInstance = createDb(join(__dirname, "data.sqlite")); // creating instance of db using factory function
  const blog = new AnyDbBlog(dbInstance); // injecting db instance to our blog module

  await blog.initialize();

  const posts = await blog.getAllPosts();
  if (posts.length === 0) {
    console.log(
      "No post available. Run `bun import-posts.js`" +
        " to load some sample posts"
    );
  }
  for (const post of posts) {
    console.log(post.title);
    console.log("-".repeat(post.title.length));
    console.log(`Published on ${new Date(post.created_at).toISOString()}`);
    console.log(post.content);
  }
}

main().catch((err) => {
  console.error("MAIN: error occurred:", err);
});
