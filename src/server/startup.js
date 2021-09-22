module.exports = ({ start, start_test, startConnection }) => ({
  start: async () => {
    await start();
  },
  start_test() {
    return start_test();
  },

  getConnection() {
    return startConnection();
  },
});
