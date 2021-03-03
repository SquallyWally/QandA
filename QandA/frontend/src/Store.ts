import {
  Action,
  ActionCreator,
  Dispatch,
  Reducer,
  combineReducers,
  Store,
  createStore,
  applyMiddleware,
} from 'redux';
import {
  getOpenstaandeVragen,
  VraagData,
  PostVraagData,
  postVraag,
} from './VragenData';
import thunk, { ThunkAction } from 'redux-thunk';

interface VragenState {
  readonly laden: boolean;
  readonly onbeantwoord: VraagData[] | null;
  readonly verzondenResultaat?: VraagData;
}

type VragenActions =
  | GetOpenVragenAction //getting
  | OntvangenOpenVragenAction //got
  | VerzondenVraagAction; //post

interface GetOpenVragenAction extends Action<'GetOpenVragen'> {
  type: 'GetOpenVragen';
}

export interface AppState {
  readonly vragen: VragenState;
}

//When unanswered questions have been retrieved
export interface OntvangenOpenVragenAction
  extends Action<'OntvangenOpenVragen'> {
  vragen: VraagData[];
}

export interface VerzondenVraagAction extends Action<'VerzondenVraag'> {
  resultaat: VraagData | undefined;
}

export const PostOpenVragenActionCreator: ActionCreator<
  ThunkAction<Promise<void>, VraagData[], PostVraagData, VerzondenVraagAction>
> = (vraag: PostVraagData) => {
  return async (dispatch: Dispatch) => {
    const resultaat = await postVraag(vraag);
    const verzondenVraagAction: VerzondenVraagAction = {
      resultaat,
      type: 'VerzondenVraag',
    };
    dispatch(verzondenVraagAction);
  };
};

//Synchronisch omdat we alleen een verzondenVraagg actie retouneerd met een ongedefinieerde resultaat
export const leegVerzondenVraagActionCretor: ActionCreator<VerzondenVraagAction> = () => {
  const verzondenVraagAction: VerzondenVraagAction = {
    type: 'VerzondenVraag',
    resultaat: undefined,
  };

  return verzondenVraagAction;
};

export const GetOpenVragenActionCreator: ActionCreator<
  ThunkAction<Promise<void>, VraagData[], null, OntvangenOpenVragenAction>
> = () => {
  return async (dispatch: Dispatch) => {
    //TPDP = dispatch the GetOpenVragenAction action
    const krijgtOpenVragenAction: GetOpenVragenAction = {
      type: 'GetOpenVragen',
    };
    dispatch(krijgtOpenVragenAction);
    //TODO get vragen uit server
    const vragen = await getOpenstaandeVragen();

    //TODO dispatch GekregenOpenVragenAction action

    const gekregenOpenVragenAction: OntvangenOpenVragenAction = {
      vragen,
      type: 'OntvangenOpenVragen',
    };

    dispatch(gekregenOpenVragenAction);
  };
};
// Define initial stae for the store so that it has an empty array
//  of unanswered questions and does not load questions from the server
const initieleVragenState: VragenState = {
  laden: false,
  onbeantwoord: null,
};

const vragenReducer: Reducer<VragenState, VragenActions> = (
  state = initieleVragenState,
  action,
) => {
  switch (action.type) {
    //todo - handle the diff actionsa nd return new state
    case 'GetOpenVragen': {
      return {
        ...state, //Spread om de vorige state naar een nieuwe object te kopieren
        onbeantwoord: null,
        loading: true,
      };
    }
    case 'OntvangenOpenVragen': {
      return {
        ...state, //Spread om de vorige state naar een nieuwe object te kopieren
        onbeantwoord: action.vragen,
        loading: false,
      };
    }
    case 'VerzondenVraag': {
      //TODO-return state
      return {
        ...state, //Spread om de vorige state naar een nieuwe object te kopieren
        onbeantwoord: action.resultaat
          ? (state.onbeantwoord || []).concat(action.resultaat) //vragen prop wordt toegeveogd aan onbeantwoord array
          : state.onbeantwoord,
        verzondenResultaat: action.resultaat,
      };
    }
    default:
      neverReached(action);
  }
  return state;
};

const neverReached = (never: never) => {}; //geeft een lege array mee

//voeg alle recuders samen, aka vrageReducer
const rootReducer = combineReducers<AppState>({
  vragen: vragenReducer,
});

export function configStore(): Store<AppState> {
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
  return store;
}
