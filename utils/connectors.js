import { InjectedConnector } from "@web3-react/injected-connector";

const injected = new InjectedConnector({
  supportedChainIds: [997]
});


export const connectors = {
  injected: injected
};
