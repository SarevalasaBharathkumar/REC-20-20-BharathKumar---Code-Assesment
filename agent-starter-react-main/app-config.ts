export interface AppConfig {
  companyName: string;
  pageTitle: string;
  pageDescription: string;
  supportsChatInput: boolean;
  supportsVideoInput: boolean;
  supportsScreenShare: boolean;
  isPreConnectBufferEnabled: boolean;
  logo: string;
  accent: string;
  logoDark: string;
  accentDark: string;
  startButtonText: string;
  sandboxId?: string;
  agentName?: string;
}

export const APP_CONFIG_DEFAULTS: AppConfig = {
  companyName: 'Jaggaer',
  pageTitle: 'Jaggaer Career Support Agent',
  pageDescription: 'Jaggaer Career Support Agent',

  supportsChatInput: true,
  supportsVideoInput: true,
  supportsScreenShare: true,
  isPreConnectBufferEnabled: true,

  logo: '/jaggaer.png',
  accent: '#002cf2',
  logoDark: '/jaggaer.png',
  accentDark: '#1fd5f9',
  startButtonText: 'Start call',

  // for LiveKit Cloud Sandbox
  sandboxId: undefined,
  agentName: undefined,
};