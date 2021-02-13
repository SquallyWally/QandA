import { FC } from 'react';
/**@jsxRuntime classic */
/**@jsx jsx */
import { css, jsx } from '@emotion/react';
import { AntwoordData } from './VragenData';
import { gray3 } from './Styles';

interface Props {
  data: AntwoordData;
}

export const Antwoord: FC<Props> = ({ data }) => (
  <div
    css={css`
      padding: 10px 0px;
    `}
  >
    <div
      css={css`
        padding: 10px 0px;
        font-size: 13px;
      `}
    >
      {data.content}
    </div>
    <div
      css={css`
        font-size: 12px;
        font-style: italic;
        color: ${gray3};
      `}
    >
      {`Beantwoord door ${data.userName} in ${data.created.toLocaleDateString()}
      ${data.created.toLocaleTimeString()}`}
    </div>
  </div>
);
