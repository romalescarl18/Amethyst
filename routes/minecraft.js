const express = require('express');
const GameDig = require('gamedig');  // Import gamedig library
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Minecraft API
 *     description: All Minecraft server status related endpoints
 */

/**
 * @swagger
 * /api/minecraft/status:
 *   get:
 *     summary: Check the status of a Minecraft server
 *     description: Returns the current status of a Minecraft server.
 *     tags:
 *       - Minecraft API
 *     parameters:
 *       - name: server
 *         in: query
 *         description: The address of the Minecraft server
 *         required: true
 *         schema:
 *           type: string
 *           example: "mc.example.com"
 *       - name: port
 *         in: query
 *         description: The port of the Minecraft server
 *         required: false
 *         schema:
 *           type: integer
 *           example: 25565
 *     responses:
 *       200:
 *         description: Minecraft server status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 online:
 *                   type: boolean
 *                   example: true
 *                 players:
 *                   type: integer
 *                   example: 12
 *                 maxPlayers:
 *                   type: integer
 *                   example: 100
 *                 map:
 *                   type: string
 *                   example: "world"
 *                 motd:
 *                   type: string
 *                   example: "Welcome to the server!"
 *       400:
 *         description: Invalid server address or error in query
 *       500:
 *         description: Server error
 */

router.get('/status', async (req, res) => {
  const { server, port = 25565 } = req.query;  // Default port for Java is 25565

  if (!server) {
    return res.status(400).json({ message: 'Server address is required.' });
  }

  try {
    const status = await GameDig.query({
      type: 'minecraft',
      host: server,
      port: port,
    });

    res.json({
      online: status.online,
      players: status.players.length,
      maxPlayers: status.maxplayers,
      map: status.map,
      motd: status.motd,
    });
  } catch (error) {
    console.error('Error fetching Minecraft Java server status:', error);
    res.status(500).json({ message: 'Error fetching Minecraft Java server status', error: error.message });
  }
});

module.exports = router;
