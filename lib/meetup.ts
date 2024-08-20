interface Event {
  date: Date;
  dateTime: string;
  title: string;
  shortUrl: string;
}

export async function getEventsInTheNextWeek(): Promise<Event[]> {
  const gql = `
query {
  groupByUrlname(urlname: "devICT") {
    upcomingEvents(input:{first: 10, reverse: true}) {
      edges {
        node {
          title
          dateTime
          shortUrl
        }
      }
    }
  }
}
`.trim();

  const resp = await fetch("https://api.meetup.com/gql", {
    method: "POST",
    body: JSON.stringify({ query: gql }),
  });

  if (!resp.ok) {
    throw new Error(`meetup request failed: ${await resp.text()}`);
  }

  const respData = await resp.json();

  console.log(respData.data.groupByUrlname.upcomingEvents.edges);

  const events: Event[] = respData.data.groupByUrlname.upcomingEvents.edges.map(
    (e) => ({
      ...e.node,
      date: new Date(e.node.dateTime),
    }),
  );

  console.log(events);

  const eventsInTheNextWeek = events.filter((e) => {
    const now = new Date();
    const endOfNextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    return e.date > now && e.date < endOfNextWeek;
  });

  return eventsInTheNextWeek;
}

export function convertEventsToDisplayString(events: Event[]): string {
  const weekday = (date: Date) =>
    date.toLocaleString("en-us", {
      weekday: "long",
      timeZone: "America/Chicago",
    });
  const timeStr = (date: Date) =>
    date.toLocaleString("en-us", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Chicago",
    });

  const eventLines = events.map(({ date, title, shortUrl }) =>
    `
  :boom: *<${shortUrl}|${title}>*: ${weekday(date)} (${timeStr(date)})
`.trim()
  ).join("\r\n");

  const msg =
    `*<https://meetup.com/devict|Events happening this week>*\r\n\r\n${eventLines}`;

  return msg;
}
