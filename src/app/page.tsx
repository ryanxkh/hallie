"use client";

import { useChat } from "ai/react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";

// Extract escalation data from tool invocations
function getEscalationData(
  invocations: Array<{ toolName: string; state: string; result?: unknown }>
) {
  const escalation = invocations.find(
    (inv) => inv.toolName === "escalateToHuman"
  );
  if (!escalation) return null;
  if (escalation.state !== "result") return { pending: true as const };
  return escalation.result as {
    priority: "standard" | "urgent";
    contextPackage: {
      reason: string;
      conversationSummary: string;
      priority: string;
      timestamp: string;
    };
    escalationId: string;
  };
}

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      maxSteps: 5,
      onError: (err) => {
        console.error("Chat error:", err);
      },
    });

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white px-6 py-4">
        <h1 className="text-lg font-semibold text-zinc-900">
          Halide Supply Co.
        </h1>
        <p className="text-sm text-zinc-500">Chat with Hallie</p>
      </header>

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col p-6">
        <div className="flex-1 space-y-4 overflow-y-auto pb-4">
          {messages.length === 0 && (
            <div className="py-12 text-center text-zinc-400">
              <p className="text-lg">Hey there. How can I help you today?</p>
            </div>
          )}

          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              Error: {error.message}
            </div>
          )}

          {messages.map((message) => {
            const toolCalls = message.toolInvocations ?? [];
            const hasToolCalls = toolCalls.length > 0;
            const hasContent =
              message.content && message.content.trim().length > 0;
            const escalationData = hasToolCalls
              ? getEscalationData(toolCalls)
              : null;
            const isEscalation = !!escalationData;

            // Tool-only messages with no text — hide unless escalation
            if (message.role === "assistant" && hasToolCalls && !hasContent) {
              if (isEscalation) {
                return (
                  <div key={message.id} className="flex justify-start">
                    <EscalationCard data={escalationData} />
                  </div>
                );
              }
              return null;
            }

            // Messages with both text AND an escalation — show card + text
            if (message.role === "assistant" && isEscalation && hasContent) {
              return (
                <div key={message.id} className="space-y-3">
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-white text-zinc-900 border border-zinc-200">
                      <div className="prose prose-sm prose-zinc max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                        <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <EscalationCard data={escalationData} />
                  </div>
                </div>
              );
            }

            return (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-zinc-900 text-white"
                      : "bg-white text-zinc-900 border border-zinc-200"
                  }`}
                >
                  {hasContent && (
                    <div className="prose prose-sm prose-zinc max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                      <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-white border border-zinc-200 px-4 py-3">
                <p className="text-sm text-zinc-400">Hallie is thinking...</p>
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex gap-3 pt-4 border-t border-zinc-200"
        >
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask Hallie anything..."
            className="flex-1 rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="rounded-xl bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </form>
      </main>
    </div>
  );
}

// Escalation card — shows what the human agent would receive
function EscalationCard({
  data,
}: {
  data: ReturnType<typeof getEscalationData>;
}) {
  if (!data || "pending" in data) {
    return (
      <div className="rounded-xl bg-amber-50 border border-amber-300 px-4 py-3 text-sm text-amber-700">
        Connecting you with a team member...
      </div>
    );
  }

  const isUrgent = data.priority === "urgent";

  return (
    <div
      className={`w-full max-w-md rounded-xl border-2 overflow-hidden ${
        isUrgent ? "border-red-400" : "border-amber-300"
      }`}
    >
      <div
        className={`px-4 py-2 flex items-center justify-between ${
          isUrgent ? "bg-red-500 text-white" : "bg-amber-400 text-amber-950"
        }`}
      >
        <span className="text-xs font-semibold uppercase tracking-wide">
          {isUrgent ? "Urgent Escalation" : "Escalation"}
        </span>
        <span className="text-xs font-mono opacity-75">
          {data.escalationId}
        </span>
      </div>

      <div
        className={`px-4 py-3 space-y-3 text-sm ${
          isUrgent ? "bg-red-50" : "bg-amber-50"
        }`}
      >
        <div>
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1">
            Reason
          </p>
          <p className="text-zinc-800">{data.contextPackage.reason}</p>
        </div>

        <div>
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1">
            Summary
          </p>
          <p className="text-zinc-800">
            {data.contextPackage.conversationSummary}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-zinc-200">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              isUrgent
                ? "bg-red-200 text-red-800"
                : "bg-amber-200 text-amber-800"
            }`}
          >
            {isUrgent ? "Immediate callback" : "Email follow-up"}
          </span>
          <span className="text-xs text-zinc-400">
            {new Date(data.contextPackage.timestamp).toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
}
