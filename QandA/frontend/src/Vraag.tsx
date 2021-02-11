import { FC } from 'react';
/**@jsxRuntime classic */
/**@jsx jsx */
import { css, jsx } from '@emotion/react';
import { VraagData } from './VragenData';
import { gray2, gray3 } from './Styles';
import { Link } from 'react-router-dom';

interface Props {
  data: VraagData;
  showContent?: boolean;
}

/** pagina 112*/
export const Vraag: FC<Props> = ({ data, showContent = true }) => (
  <div
    css={css`
      padding: 10px 0px;
    `}
  >
    <div
      css={css`
        padding: 10px 0px;
        font-size: 20px;
      `}
    >
      <Link
        css={css`
          text-decoration: none;
          color: ${gray2};
        `}
        to={`vragen/${data.questionId}`}
      >
        {data.title}
      </Link>
    </div>
    {showContent && (
      <div
        css={css`
          padding-bottom: 10px;
          font-size: 15px;
          color: ${gray2};
        `}
      >
        {data.content.length > 50
          ? `${data.content.substring(0, 50)}...`
          : data.content}
      </div>
    )}
    <div
      css={css`
        font-size: 12px;
        font-style: italic;
        color: ${gray3};
      `}
    >
      {`Gevraagd door ${data.userName} in ${data.created.toLocaleDateString()}
        ${data.created.toLocaleTimeString()}`}
    </div>
  </div>
);
