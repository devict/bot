export async function getEvents() {
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
  })

  if (!resp.ok) {
    throw new Error(`meetup request failed: ${await resp.text()}`);
  }

  const respData = await resp.json();

  const events = respData.data.groupByUrlname.upcomingEvents.edges.map((e) => ({
    ...e.node,
    date: new Date(e.node.dateTime),
  }));

  const eventsThisWeek = events.filter((e) => {
    const now = new Date();
    const endOfNextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    return e.date > now && e.date < endOfNextWeek;
  });

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const weekday = (date) =>
    date.toLocaleString("en-us", {
      weekday: "long",
      timeZone: "America/Chicago",
    });
  const timeStr = (date) =>
    date.toLocaleString("en-us", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Chicago",
    });

  const eventLines = eventsThisWeek.map(({ date, title, shortUrl }) =>
    `
  :boom: *<${shortUrl}|${title}>*: ${weekday(date)} (${timeStr(date)})
`.trim()
  ).join("\r\n");

  const msg =
    `*<https://meetup.com/devict>|Events happening this week*\r\n\r\n${eventLines}`;
  const msg = `*<https://meetup.com/devict|Events happening this week>*\r\n\r\n${eventLines}`;
  //console.log(msg);

  return msg;
}
