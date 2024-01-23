import fs from 'fs';
import matter from 'gray-matter';
const postsDirectory = path.join(process.cwd(), 'posts');
const URL = "https://yourwebsitedomain.com";
function generateSiteMap(posts) {
return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
<! - Add the static URLs manually →
<url>
<loc>${URL}</loc>
</url>
${posts
.map(({ id }) => {
return `
<url>
<loc>${`${URL}/posts/${id}`}</loc>
<lastmod>${new Date().toISOString()}</lastmod>
</url>
`;
})
.join("")}
</urlset>
`;
}
export function getSortedPostsData() {
// Get file names under /posts
const fileNames = fs.readdirSync(postsDirectory);
const allPostsData = fileNames.map((fileName) => {
// Remove ".md" from file name to get id
const id = fileName.replace(/\.md$/, '');
// Read markdown file as string
const fullPath = path.join(postsDirectory, fileName);
const fileContents = fs.readFileSync(fullPath, 'utf8');
// Use gray-matter to parse the post metadata section
const matterResult = matter(fileContents);
// Combine the data with the id
return {
id,
…matterResult.data,
};
});
// Filter out draft posts
const livePosts = allPostsData.filter((postData) => {
return postData.draft == false
})
// Sort posts by date
return livePosts.sort((a, b) => {
if (a.date < b.date) {
return 1;
} else {
return -1;
}
});
}
export async function getServerSideProps({ res }) {
const posts = getSortedPostsData();
// Generate the XML sitemap with the blog data
const sitemap = generateSiteMap(posts);
res.setHeader("Content-Type", "text/xml");
// Send the XML to the browser
res.write(sitemap);
res.end();
return {
props: {},
};
}
export default function SiteMap() {}