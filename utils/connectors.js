import { InjectedConnector } from "@web3-react/injected-connector";

const injected = new InjectedConnector({
  supportedChainIds: [8082]
});


export const connectors = {
  injected: injected
};
