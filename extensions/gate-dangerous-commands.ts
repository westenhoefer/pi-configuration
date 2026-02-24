import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  const splitCommands = (command: string) =>
    command
      .split(/&&|\|\||;|\|/)
      .map((part) => part.trim())
      .filter(Boolean);

  const getCommandToken = (part: string) => {
    const tokens = part.split(/\s+/).filter(Boolean);
    if (tokens[0] === "sudo") return tokens[1];
    return tokens[0];
  };

  const isDangerous = (command: string) =>
    splitCommands(command).some((part) => {
      const tokens = part.split(/\s+/).filter(Boolean);
      const cmd = getCommandToken(part);

      if (!cmd) return false;

      if (cmd === "rm" || cmd === "rmdir") {
        return true;
      }

      if (cmd === "git" && tokens[1] === "push") {
        return tokens.some((token) => token.includes("main"));
      }

      return false;
    });

  pi.on("tool_call", async (event, ctx) => {
    if (event.toolName !== "bash") return undefined;

    const command = event.input.command as string;
    if (!isDangerous(command)) return undefined;

    if (!ctx.hasUI) {
      return {
        block: true,
        reason: "Dangerous command blocked (no UI for confirmation)",
      };
    }

    const ok = await ctx.ui.confirm(
      "Dangerous command",
      `Allow running:\n\n  ${command}`
    );

    if (!ok) {
      return { block: true, reason: "Blocked by user" };
    }

    return undefined;
  });
}
