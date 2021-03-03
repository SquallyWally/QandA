/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { PrimaireKnop } from './Styles';
import { VragenLijst } from './VragenLijst';
import { getOpenstaandeVragen, VraagData } from './VragenData';
import { Page } from './Page';
import { useEffect, useState, FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { GetOpenVragenActionCreator, AppState } from './Store';

//pag 231
interface Props extends RouteComponentProps {
  getOpenstaandeVragen: () => Promise<void>;
  vragen: VraagData[] | null;
  vragenLaden: boolean;
}
//Thunk returns a function instead of an action, like delaying dispatches
const HomePage: FC<Props> = ({
  history,
  vragen,
  vragenLaden,
  getOpenstaandeVragen,
}) => {
  // const [vragen, setVragen] = useState<VraagData[] | null>(null);

  // const [vragenLaden, setVragenLaden] = useState(true);

  useEffect(() => {
    // const dogetOpenstaandeVragen = async () => {
    //   const openStaandeVragen = await getOpenstaandeVragen();
    //   setVragen(openStaandeVragen);
    //   setVragenLaden(false);
    // };
    if (vragen === null) {
      getOpenstaandeVragen();
    }

    // dogetOpenstaandeVragen();
  }, [vragen, getOpenstaandeVragen]);
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
      {vragenLaden ? (
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

//Takes the store state and returns the vragen en vragenLaden props that are req
//by the component
const mapStateToProps = (store: AppState) => {
  return {
    vragen: store.vragen.onbeantwoord,
    vragenLoaden: store.vragen.laden,
  };
};

//Dispatch and maps the action creotr to get open vragen into the comp prop
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getOpenstaandeVragen: () => dispatch(GetOpenVragenActionCreator()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
