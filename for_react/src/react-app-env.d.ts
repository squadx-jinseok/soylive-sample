/// <reference types="react-scripts" />

interface Window {
  SoyPlayer: SoyPlayer;
}

interface SoyPlayer {
  setup: SoyPlayerSetup;
  dispatch: SoyPlayerDispatch;
  destroy: SoyPlayerDestroy;
}

type SoyPlayerSetup = (props: {
  token?: string;
  elementId?: string;
  callback?: SoyPlayerCallback;
  id: string;
}) => void;

type SoyPlayerDispatch = (action: SoyPlayerAction, payload: any) => any;

type SoyPlayerDestroy = () => void;

type SoyPlayerCallback = {
  [key in ICallbackKey]: CallableFunction | undefined;
};

type SoyPlayerCallbackKey =
  | "CLICK_PRODUCT"
  | "CLICK_CLOSE"
  | "CLICK_PIP"
  | "CLICK_SHARE"
  | "LOGIN"
  | "RENDER"
  | "ERROR";

type SoyPlayerAction =
  | "MEDIA_PLAY"
  | "MEDIA_PAUSE"
  | "GET_MEDIA_TIME"
  | "SET_MEIDA_TIME"
  | "SET_PIP_MODE"
  | "SET_FLOATING";
