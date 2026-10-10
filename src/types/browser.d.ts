interface GameTool {
  name: string;
  description: string;
  annotations: { readOnlyHint: boolean };
  inputSchema: {
    type: "object";
    properties: Record<string, never>;
    additionalProperties: false;
  };
  execute: (input: Record<string, unknown>) => unknown;
}

interface Document {
  /** Optional experimental browser integration. */
  modelContext?: {
    registerTool: (
      tool: GameTool,
      options?: { signal: AbortSignal },
    ) => void | Promise<void>;
  };
}
