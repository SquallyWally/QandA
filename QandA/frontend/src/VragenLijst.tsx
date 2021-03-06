import { FC } from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { gray5, accent2 } from './Styles';
import { VraagData } from './VragenData';
import { Vraag } from './Vraag';

interface Props {
  data: VraagData[];
  renderItem?: (
    item: VraagData,
  ) => JSX.Element /**Een Function Prop vor het renderen van een vraag */;
}

/**VragenLijst component, dus we kunnen een data props toesturen wanneer die wordt gerefereerd in JSX */
export const VragenLijst: FC<Props> = ({ data, renderItem }) => {
  return (
    <ul
      css={css`
        list-style: none;
        margin: 5px 0 0 0;
        padding: 0px 20px;
        background-color: #fff;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        border-top: 3px solid ${accent2};
        box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
      `}
    >
      {data.map((vraag) => (
        <li /**Itereert door het lijst */
          key={vraag.questionId}
          css={css`
            border-top: 1px solid ${gray5};
            ::first-of-type {
              border-top: none;
            }
          `}
        >
          {renderItem ? renderItem(vraag) : <Vraag data={vraag} />}
        </li>
      ))}
    </ul>
  );
};
