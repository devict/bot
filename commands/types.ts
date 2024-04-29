export interface Command<TSlackEvent> {
  matcher: RegExp;
  handler: (event: TSlackEvent) => Promise<void>;
}
