export type BotRisk = 'low' | 'medium' | 'high';
export type BotContract = 'rise' | 'fall';

export type BotRuntimeState = {
  running: boolean;
  stake: number;
  risk: BotRisk;
  contract: BotContract;
  symbol: string;
  status: string;
  startedAt: string | null;
  lastTickAt: string | null;
};

const defaultState: BotRuntimeState = {
  running: false,
  stake: 1,
  risk: 'medium',
  contract: 'rise',
  symbol: 'Volatility 100 (1s) Index',
  status: 'Idle',
  startedAt: null,
  lastTickAt: null,
};

let runtimeState: BotRuntimeState = { ...defaultState };

export function getBotRuntimeState(): BotRuntimeState {
  return { ...runtimeState };
}

export function startBotRuntime(input: { stake: number; risk: BotRisk; contract: BotContract }): BotRuntimeState {
  runtimeState = {
    ...runtimeState,
    running: true,
    stake: Number.isFinite(input.stake) && input.stake > 0 ? input.stake : 1,
    risk: input.risk,
    contract: input.contract,
    status: 'Running',
    startedAt: new Date().toISOString(),
    lastTickAt: new Date().toISOString(),
  };
  return { ...runtimeState };
}

export function stopBotRuntime(): BotRuntimeState {
  runtimeState = {
    ...runtimeState,
    running: false,
    status: 'Stopped',
    lastTickAt: new Date().toISOString(),
  };
  return { ...runtimeState };
}

export function setBotRuntimeStatus(status: string): BotRuntimeState {
  runtimeState = {
    ...runtimeState,
    status,
    lastTickAt: new Date().toISOString(),
  };
  return { ...runtimeState };
}
