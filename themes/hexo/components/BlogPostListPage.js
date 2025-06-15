import { siteConfig } from '@/lib/config';
import { useGlobal } from '@/lib/global';
import BlogPostCard from './BlogPostCard';
import BlogPostListEmpty from './BlogPostListEmpty';
import PaginationNumber from './PaginationNumber';
import Announcement from './Announcement'; // 新增导入

/**
 * 文章列表分页表格
 * @param page 当前页
 * @param posts 所有文章
 * @param tags 所有标签
 * @returns {JSX.Element}
 * @constructor
 */
const BlogPostListPage = ({ page = 1, posts = [], postCount, siteInfo }) => {
  const { NOTION_CONFIG } = useGlobal();
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG);
  const totalPage = Math.ceil(postCount / POSTS_PER_PAGE);
  const showPagination = postCount >= POSTS_PER_PAGE;

  // 获取 notice 数据（假设从 useGlobal 或 props 中获取）
  const { locale, notice } = useGlobal(); // 确保 useGlobal 返回 notice

  if (!posts || posts.length === 0 || page > totalPage) {
    return <BlogPostListEmpty />;
  } else {
    return (
      <div id='container' className='w-full'>
        {/* 添加 Announcement 在文章列表上方 */}
        <Announcement notice={notice} />
        {/* 文章列表 */}
        <div className='space-y-6 px-2'>
          {posts?.map(post => (
            <BlogPostCard
              index={posts.indexOf(post)}
              key={post.id}
              post={post}
              siteInfo={siteInfo}
            />
          ))}
        </div>
        {showPagination && (
          <PaginationNumber page={page} totalPage={totalPage} />
        )}
      </div>
    );
  }
};

export default BlogPostListPage;
