import axios from 'axios';
import useGet from '../src/hooks/useGet';

jest.mock('axios');

describe('useGet', () => {
  it('should fetch data successfully', async () => {
    const url = '/api/data';
    const params = { id: 1 };
    const responseData = { data: 'Test data' };

    axios.get.mockResolvedValueOnce({ data: responseData });

    const result = await useGet(url, params);

    expect(axios.get).toHaveBeenCalledWith(url, params);
    expect(result).toEqual(responseData);
  });

  it('should handle error', async () => {
    const url = '/api/data';
    const params = { id: 1 };
    const errorResponse = { response: { status: 404, data: 'Not found' } };

    axios.get.mockRejectedValueOnce(errorResponse);

    const result = await useGet(url, params);

    expect(axios.get).toHaveBeenCalledWith(url, params);
    expect(result).toEqual('Not found');
  });
});
