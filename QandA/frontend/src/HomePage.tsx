/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { PrimaireKnop } from './Styles';
import { VragenLijst } from './VragenLijst';
import { getOpenstaandeVragen } from './VragenData';
export const HomePage = () => (
  <div
    css={css`
      margin: 20px auto 20px auto;
      padding: 30px 20px;
      max-width: 600px;
    `}
  >
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
      `}
    >
      <h2
        css={css`
          font-size: 15px;
          font-weight: bold;
          margin: 10px 0px 5px;
          text-align: center;
          text-transform: uppercase;
        `}
      >
        Openstaande vragen
      </h2>
      <PrimaireKnop
        css={css`
          margin-left: 140px;
        `}
      >
        Stel een vraag
      </PrimaireKnop>
      <PrimaireKnop
        css={css`
          margin-right: -0;
        `}
      >
        Waardeloze knop
      </PrimaireKnop>
    </div>
    <VragenLijst data={getOpenstaandeVragen()} />
  </div>
);
