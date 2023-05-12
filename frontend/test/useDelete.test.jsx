import axios from 'axios';
import useDelete from '../src/hooks/useDelete';

jest.mock('axios');

describe('useDelete', () => {
  it('should delete data successfully', async () => {
    const url = '/api/data';
    const body = { id: 1 };
    const responseData = { data: 'Delete success' };

    axios.delete.mockResolvedValueOnce({ data: responseData });

    const result = await useDelete(url, body);

    expect(axios.delete).toHaveBeenCalledWith(url, body);
    expect(result).toEqual(responseData);
  });

  it('should handle error', async () => {
    const url = '/api/data';
    const body = { id: 1 };
    const errorResponse = { response: { status: 404, data: 'Not found' } };

    axios.delete.mockRejectedValueOnce(errorResponse);

    const result = await useDelete(url, body);

    expect(axios.delete).toHaveBeenCalledWith(url, body);
    expect(result).toEqual('Not found');
  });
});
