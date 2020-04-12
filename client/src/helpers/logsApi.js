
export const getLogsApi = async () => {
    try {
      const result = await axios.get('http://localhost:3002/api/logs');
      return result.data;
    } catch (error) {
      return error
    }
}