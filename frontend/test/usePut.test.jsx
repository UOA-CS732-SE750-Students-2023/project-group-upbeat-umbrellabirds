import axios from 'axios';
import usePut from '../src/hooks/usePut';

jest.mock('axios');

describe('usePut', () => {
  it('should put data successfully', async () => {
    const url = '/api/data';
    const body = { id: 1 };
    const responseData = { data: 'Put success' };

    axios.put.mockResolvedValueOnce({ data: responseData });

    const result = await usePut(url, body);

    expect(axios.put).toHaveBeenCalledWith(url, body);
    expect(result).toEqual(responseData);
  });

  it('should handle error', async () => {
    const url = '/api/data';
    const body = { id: 1 };
    const errorResponse = { response: { status: 404, data: 'Not found' } };

    axios.put.mockRejectedValueOnce(errorResponse);

    const result = await usePut(url, body);

    expect(axios.put).toHaveBeenCalledWith(url, body);
    expect(result).toEqual('Not found');
  });
});
