export const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJkYjY3NmRiYi1iNDhhLTQ1NjItYmUwMC03ODZmOWE1NDI3ZmUiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY4MTYxOTczOSwiZXhwIjoxNzEzMTU1NzM5fQ.7qNoJyzgzeqoDrVVBu-mXyUedNNFr0FpuNLXcOanqQU";
// API call to create meeting

export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v1/meetings`, {
    method: "POST",
    headers: {
      authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ region: "sg001" }),
  });

  const { meetingId } = await res.json();
  return meetingId;
};
