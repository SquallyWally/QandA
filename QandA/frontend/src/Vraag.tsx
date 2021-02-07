import { FC } from 'react';
/**@jsxRuntime classic */
/**@jsx jsx */
import { css, jsx } from '@emotion/react';
import { VraagData } from './VragenData';
import { gray3 } from './Styles';

interface Props {
  data: VraagData;
}
/** pagina 108*/
export const Vraag: FC<Props> = ({ data }) => (
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
      {data.title}
    </div>
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
