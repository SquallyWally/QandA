/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { PrimaireKnop } from './Styles';
import { VragenLijst } from './VragenLijst';
import { getOpenstaandeVragen, VraagData } from './VragenData';
import { Page } from './Page';
import { useEffect, useState, FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';

/**const renderVraag = (vraag: VraagData) => <div> {vraag.title}</div>;*/

//Pagina 146

export const HomePage: FC<RouteComponentProps> = ({ history }) => {
  const [vragen, setVragen] = useState<VraagData[] | null>(null);

  const [vragenLoaden, setVragenLaden] = useState(true);

  useEffect(() => {
    const dogetOpenstaandeVragen = async () => {
      const openStaandeVragen = await getOpenstaandeVragen();
      setVragen(openStaandeVragen);
      setVragenLaden(false);
    };
    dogetOpenstaandeVragen();
  });
  //console.log('rendered donkey');

  const handleStelVraagClick = () => {
    //console.log('TODO - move to the garbage asking page plz plz yes ty');
    history.push('/vraag');
  };

  const lmaoClick = () => {
    console.log('Lmao dit is een waardeloze knop jonguh');
    history.push('/kek');
  };
  return (
    <Page>
      <div
        css={css`
          /* margin: 10px auto 20px auto;
          padding: 10px 20px;
          padding-bottom: 1px;
          max-width: 600px; */
          display: flex;
          align-items: center;
          justify-content: space-between;
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
            onClick={handleStelVraagClick}
            // css={css`
            //   margin-left: 140px;
            // `}
          >
            Stel een vraag
          </PrimaireKnop>
          <PrimaireKnop
            onClick={lmaoClick}
            // css={css`
            //   margin-left: 10;
            // `}
          >
            Waardeloze knop
          </PrimaireKnop>
        </div>{' '}
      </div>
      {vragenLoaden ? (
        <div
          css={css`
            font-size: 16px;
            font-style: italic;
          `}
        >
          Laden...
        </div>
      ) : (
        <VragenLijst data={vragen || []} />
      )}
    </Page>
  );
};
