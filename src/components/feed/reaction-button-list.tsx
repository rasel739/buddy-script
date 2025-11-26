'use client';

import Icons from '@/lib/icons';
import { FC } from 'react';
import { ReactionButton } from '../ui/button';
import { ReactionType } from '@/types';
import { useAppSelector } from '@/redux/hooks';

interface ReactionButtonsProps {
  reacted: boolean;
  handleReaction: () => void;
  handleComment: () => void;
  handleShare: () => void;
}

const ReactionButtonList: FC<ReactionButtonsProps> = ({ handleReaction, handleShare }) => {
  const { like } = useAppSelector((state) => state.post);

  const buttons = [
    {
      type: 'like',
      label: like ? 'Haha' : '',
      icon: <Icons.Haha />,
      className: `_feed_inner_timeline_reaction_emoji _feed_reaction ${
        like ? '_feed_reaction_active' : ''
      }`,
      onClick: handleReaction,
    },
    {
      type: 'comment',
      label: 'Comment',
      icon: <Icons.Comment />,
      className: '_feed_inner_timeline_reaction_comment _feed_reaction',
      onClick: undefined,
    },
    {
      type: 'share',
      label: 'Share',
      icon: <Icons.Share />,
      className: '_feed_inner_timeline_reaction_share _feed_reaction',
      onClick: handleShare,
    },
  ];

  return (
    <div className='_feed_inner_timeline_reaction'>
      {buttons.map((btn) => (
        <ReactionButton
          key={btn.type}
          reactionType={btn.type as ReactionType}
          active={btn.type === 'like' && like}
          className={btn.className}
          icon={btn.icon}
          onClick={btn.onClick}
        >
          <span className='text-dark'>{btn.label}</span>
        </ReactionButton>
      ))}
    </div>
  );
};

export default ReactionButtonList;
