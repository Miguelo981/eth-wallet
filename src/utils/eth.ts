import { ETHEREUM_DEFAULT_DERIVATION_PATH } from "@/constants";

export const getEthereumDerivationPath = (index: number) =>
  `${ETHEREUM_DEFAULT_DERIVATION_PATH}${index}`