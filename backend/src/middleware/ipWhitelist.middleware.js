export const ipWhitelist = (allowedIps) => {
  return (req, res, next) => {
    // Determine the true client IP, especially when behind a proxy like ngrok
    let clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip;
    
    // x-forwarded-for can be a comma-separated list; the first one is the client
    if (typeof clientIp === 'string' && clientIp.includes(',')) {
      clientIp = clientIp.split(',')[0].trim();
    }
    
    // Normalize IPv6-mapped IPv4 addresses (e.g., ::ffff:13.203.39.153)
    if (typeof clientIp === 'string' && clientIp.startsWith('::ffff:')) {
      clientIp = clientIp.substring(7);
    }

    // In local development, ngrok will forward requests, but we might also test directly via localhost.
    // If testing locally without ngrok, you might see ::1 or 127.0.0.1.
    // Uncomment the following line to allow local testing if needed:
    // if (clientIp === '127.0.0.1' || clientIp === '::1') return next();

    if (!clientIp || !allowedIps.includes(clientIp)) {
      console.warn(`[Security Warning] Blocked webhook request from unauthorized IP: ${clientIp}`);
      return res.status(403).json({ success: false, message: "Access denied. IP address not whitelisted." });
    }

    next();
  };
};
