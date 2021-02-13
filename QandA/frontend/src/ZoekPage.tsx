import { FC, useState, useEffect } from 'react';
import { RouteComponentProps as RCP } from 'react-router-dom';
import { VragenLijst } from './VragenLijst';
import { zoekVragen, VraagData } from './VragenData';
import { Page } from './Page';
import { css, jsx } from '@emotion/react';

/**@jsxRuntime classic */
/**@jsx jsx */

export const ZoekPage: FC<RCP> = ({ location }) => {
  const [vragen, setVragen] = useState<VraagData[]>([]); //holds the mathced questions in the search

  const zoekParams = new URLSearchParams(location.search);
  const zoek = zoekParams.get('criteria') || '';

  //roept het zoekfucntie aan wanneer het component voor het eerst weergeeft
  //  /zoek?criteria=type
  useEffect(() => {
    const doZoek = async (criteria: string) => {
      const gevondenResultaten = await zoekVragen(criteria);
      setVragen(gevondenResultaten);
    };
    doZoek(zoek);
  }, [zoek]);

  return (
    <Page title="Zoek resultaten">
      {zoek && (
        <p
          css={css`
            font-size: 16px;
            font-style: italic;
            margin-top: 0px;
          `}
        >
          voor "{zoek}"
        </p>
      )}
      <VragenLijst data={vragen} />
    </Page>
  );
};
