import Live2D from '@/components/Live2D';
import { siteConfig } from '@/lib/config';
import { useGlobal } from '@/lib/global';
import dynamic from 'next/dynamic';
import CONFIG from '../config';
import { AnalyticsCard } from './AnalyticsCard';
import Announcement from './Announcement';
import Card from './Card';
import Catalog from './Catalog';
import CategoryGroup from './CategoryGroup';
import { InfoCard } from './InfoCard';
import LatestPostsGroup from './LatestPostsGroup';
import TagGroups from './TagGroups';

const HexoRecentComments = dynamic(() => import('./HexoRecentComments'));
const FaceBookPage = dynamic(
  () => {
    let facebook = <></>;
    try {
      facebook = import('@/components/FacebookPage');
    } catch (err) {
      console.error(err);
    }
    return facebook;
  },
  { ssr: false }
);

/**
 * Hexo主题右侧栏
 * @param {*} props
 * @returns
 */
export default function SideRight(props) {
  const {
    post,
    currentCategory,
    categories,
    latestPosts,
    tags,
    currentTag,
    showCategory,
    showTag,
    rightAreaSlot,
    notice,
    className
  } = props;

  const { locale } = useGlobal();

  // 文章全屏处理
  if (post && post?.fullWidth) {
    return null;
  }

  return (
    <div
      id='sideRight'
      className={`lg:w-80 lg:pt-8 ${post ? 'lg:pt-0' : 'lg:pt-4'}`}>
      <div className='sticky top-8 space-y-4'>
        <Announcement post={notice} /> {/* 移动到最上面 */}

        {siteConfig('HEXO_WIDGET_LATEST_POSTS', null, CONFIG) &&
          latestPosts &&
          latestPosts.length > 0 && (
            <Card>
              <LatestPostsGroup {...props} />
            </Card>
          )}

        {siteConfig('COMMENT_WALINE_SERVER_URL') &&
          siteConfig('COMMENT_WALINE_RECENT') && <HexoRecentComments />}

        {rightAreaSlot}
        <FaceBookPage />
        <Live2D />
      </div>
    </div>
  );
}
