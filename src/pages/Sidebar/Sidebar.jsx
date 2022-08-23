import React, { useEffect, useState } from 'react';
import { youtubeParser } from '../../services/utils';
import { getReactionVideos } from '../../services/api';

import styles from './styles.module.scss';

const Sidebar = () => {
  const [reactions, setReactions] = useState(false);
  useEffect(() => {
    (async () => {
      const id = youtubeParser(window.location.href);
      const videos = await getReactionVideos(id);
      setReactions(videos.map(d => ({
        id: d.id,
        url: `https://www.youtube.com/watch?v=${d.id}`,
        title: d.title,
        thumbnail: d.thumbnail
      })));
    })()
  }, []);

  if(!reactions || !reactions.length) return null;

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarTitle}>Reactions</div>
      <div className={styles.sidebarList}>
        {
          reactions.map(d => (
            <a className={styles.video} href={d.url} target="_blank" rel="noreferrer" title={d.title} key={d.id}>
              <img className={styles.videoThumbnail} src={d.thumbnail} alt={d.title}/>
              <div className={styles.videoTitle}>{d.title}</div>
            </a>
          ))
        }
      </div>
    </div>
  );
};

export default Sidebar;
