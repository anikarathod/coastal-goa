import dns from "node:dns/promises";

try {
  const result = await dns.resolveSrv(
    "_mongodb._tcp.coastal-goa.enes2oa.mongodb.net"
  );

  console.log(result);
} catch (err) {
  console.error(err);
}