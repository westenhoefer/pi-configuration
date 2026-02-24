import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  pi.registerCommand("clear", {
    description: "Clear the current context by starting a new session",
    handler: async (_args, ctx) => {
      const currentSession = ctx.sessionManager.getSessionFile();
      const result = await ctx.newSession({
        parentSession: currentSession,
      });

      if (result.cancelled) {
        ctx.ui.notify("Clear cancelled", "warning");
      }
    },
  });
}
