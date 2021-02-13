import { FC } from 'react';
import { AntwoordData } from './VragenData';
/**@jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { Antwoord } from './Antwoord';
import { gray5, gray6 } from './Styles';

interface Props {
  data: AntwoordData[];
}
export const AntwoordenLijst: FC<Props> = ({ data }) => (
  <ul
    css={css`
      list-style: none;
      margin: 10px 0 0 0;
      padding: 0;
    `}
  >
    {data.map((antwoord) => (
      <li
        css={css`
          border-top: 1px solid ${gray5};
        `}
        key={antwoord.antwoordId}
      >
        <Antwoord data={antwoord} />
      </li>
    ))}
  </ul>
);
