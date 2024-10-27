
import Message from '../models/message.js';

export const sendMessage = (io) => {
  io.on('connection', (socket) => {
    socket.on('sendMessage', async (data) => {
      const message = new Message(data);
      await message.save();
      io.emit('message', data);
    });

    socket.on('disconnect', () => {
    });
  });
};

export const getMessage = async (req, res) => {
  console.log(req.params, "params")
  const { from: _from } = req.params;
  const { to: _to } = req.params;
  console.log(_from, _to, "sfhdsfghds")
  try {
    // const message = await Message.find
    const message = await Message.find({
      $or: [
        { from: _from, to: _to },
        { from: _to, to: _from }
      ]
    });
    res.status(200).json(message);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};